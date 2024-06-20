import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, AccountService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { Subject, takeUntil, forkJoin } from 'rxjs';

@Component({
  selector: 'app-won-loss-tender',
  templateUrl: './won-loss-tender.component.html',
  styleUrls: ['./won-loss-tender.component.css']
})
export class WonLossTenderComponent {
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  tenderData: any = [];
  isNotFound: boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country: any;
  limits: any = [];
  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  userData: any;
  statusData: any;
  rowData: any;
  tendStatus: any = [];
  showWorkingDetails: boolean = false;
  attachmentDataShow: boolean = false;
  compattachmentDataShow: boolean = false;
  tendattachmentDataShow: boolean = false;

  showPreNotes: boolean = false;
  techDataShow: boolean = false;
  directDataShow: boolean = false;
  indirectDataShow: boolean = false;
  finDataShow: boolean = false;
  tendStatusData: any;
  data: any;
  sendForApprovalClicked: boolean = false;
  roleStatusData: any;
  statusList: any = [];
  approval: any;
  reqList: any = [];
  dataDropdownList: any;
  selectedRow: any;
  itemList: any;
  totalDirectCost: number = 0;
  overallDirectCost: number = 0;
  overallInDirectCost: number = 0;
  tenderID: any;
  attachListData: any = [];
  attachementDetailsData: any = [];
  attachementTendDetailsData: any = [];
  locationArray: any = [];
  showPreviousDetails: boolean = false;
  docArray: any = [];
  private destroy$ = new Subject<void>();
  rowIndirectCostData: any;
  rowDirectCostData: any;
  totalDirectMargin: number = 0;
  totalIndirectMargin: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private user: AccountService,
    private router: Router,
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {
    const userDataString = localStorage.getItem('gdUserData');

    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tenderstatus_id: ['', Validators.required],
      working_notes: ['', Validators.required],
      audit_trail: [null],
    });

    this.getTenderData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  getBOQItemList(data: any) {
    this.totalDirectCost = 0;
    this.itemList = [];
    this.itemList = data;
    this.itemList?.items.map((item: any) => this.totalDirectCost += item?.total_basic_value);
  }
  getDetails(data: any) {
    console.log(data);
    if (data) {
      this.router.navigate(['/presales/presales-biding/data-capture', data]);
    } else {
      this.router.navigate(['/presales/presales-biding/data-capture']);
    }
    this.button = 'Update';
    this.update = true;
  }
  getFormattedRemarks(): string {
    return (this.rowData?.remarks && Array.isArray(this.rowData.remarks))
      ? this.rowData.remarks.map((remark: any, index: any) => `${index + 1}. ${remark}`).join('<br>')
      : '';
  }
  getFormattedAuditTrail(): string {
    return (this.rowData?.audit_trail && Array.isArray(this.rowData.audit_trail)) ? this.rowData.audit_trail.map((audit_trail: any, index: any) => `${index + 1}. ${audit_trail}`).join('<br>')
      : '';
  }

  rowLocation(rowData: any): void {
    this.masterService.openModal(rowData?.tender_id);
  }



  attachmentDetails() {
    this.attachListData = this.rowData.tender_id;
    this.apiService.getAttachmentDetails(this.attachListData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.attachementDetailsData = res.myComapanyDocuments;
        this.attachementTendDetailsData = res.tenderDocuments;
        console.log(this.attachementDetailsData);
        console.log(this.attachementTendDetailsData);


      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    });
  }

  handleCheckboxChange(event: any, data: any) {
    // Initialize docArray if not already done
    if (!this.docArray) {
      this.docArray = [];
    }

    if (event.target.checked) {
      this.docArray.push(data);
    } else {
      const index = this.docArray.findIndex((group: any) =>
        group.DocType === data.DocType
      );

      if (index !== -1) {
        this.docArray.splice(index, 1);  // Use splice to remove the item at the found index
      }
    }
    console.log(this.docArray);
  }


  get f() { return this.form.controls; }

  // costing start here
  rowListData(row: any) {
    debugger
    this.rowData = row;
    this.tenderID = row.tender_id;
    this.rowDirectCostData = [];
    this.rowIndirectCostData = [];

    this.overallDirectCost = 0;
    this.overallInDirectCost = 0;
    this.totalDirectMargin = 0;
    this.totalIndirectMargin = 0;

    const directCostObservable = this.apiService.getData(`/boq/api/v1/getBoqListForCosting?tender_id=${row.tender_id}`);
    const indirectCostObservable = this.apiService.getData(`/costing/api/v1/getTenderIndirectCostList?tender_id=${row.tender_id}`);

    forkJoin([directCostObservable, indirectCostObservable]).subscribe(
      ([directRes, indirectRes]: [any, any]) => {
        if (directRes?.result?.length > 0) {
          this.rowDirectCostData = directRes;
        } else {
          this.alertService.warning("Direct Cost List Not Found!");
        }

        if (indirectRes.status === 200) {
          this.rowIndirectCostData = indirectRes;
        } else {
          this.alertService.warning("Indirect Cost List Not Found!");
        }

        if (this.rowDirectCostData?.result?.length > 0 && this.rowIndirectCostData?.result?.length > 0) {
          this.rowDirectCostData?.result?.[0]?.boq?.forEach((el: any) => {
            let boqMarginTotal = 0;
            let boqAfterMarginTotal = 0;
            let boqTargetTotal = 0;
            let boqTargetWQtyTotal = 0;

            el?.items?.forEach((data: any) => {
              data.marginAmt = +data?.totalWithFreightWithGST * (data?.margin_direct / 100);
              data.afterMarginAmt = +data?.totalWithFreightWithGST + +data?.margin_direct;
              boqMarginTotal += +data?.marginAmt;
              boqAfterMarginTotal += +data?.afterMarginAmt;

              data.targetUnitPrice = +data?.unit_price * (1 - (data?.target_direct / 100));
              data.targetTotalPrice = +data?.targetUnitPrice * +data.qty;
              boqTargetTotal += +data?.targetUnitPrice;
              boqTargetWQtyTotal += +data?.targetTotalPrice;

              data?.childItemList?.forEach((child: any) => {
                child.marginAmt = +child?.totalWithFreightWithGST * (child?.margin_direct / 100);
                child.afterMarginAmt = +child?.totalWithFreightWithGST + +child?.margin_direct;
                boqMarginTotal += +child?.marginAmt;
                boqAfterMarginTotal += +child?.afterMarginAmt;

                child.targetUnitPrice = +child?.unit_price * (1 - (child?.target_direct / 100));
                child.targetTotalPrice = +child?.targetUnitPrice * +child.qty;
                boqTargetTotal += +child?.targetUnitPrice;
                boqTargetWQtyTotal += +child?.targetTotalPrice;
              });

            });

            el.totalMargin = boqMarginTotal;
            el.afterTotalMargin = boqAfterMarginTotal;
            el.totalTarget = boqTargetTotal;
            el.totalTargetWQty = boqTargetWQtyTotal;
            this.overallDirectCost += +el?.totalPurchaseAmount;
            this.totalDirectMargin += +el?.totalMargin;
          });

          this.rowIndirectCostData?.result?.[0]?.indirectCost?.forEach((el: any) => {
            let marginTotal = 0;
            let postMarginTotal = 0;

            el?.records?.forEach((data: any) => {
              data.marginAmt = +data?.total * (data?.margin_indirect / 100);
              data.afterMarginAmt = +data?.total + +data?.marginAmt;
              marginTotal += +data?.marginAmt;
              postMarginTotal += +data?.afterMarginAmt;
            });

            el.totalMargin = marginTotal;
            el.totalAfterMarginAmt = postMarginTotal;
            this.overallInDirectCost += +el?.all_total;
            this.totalIndirectMargin += +el?.totalMargin;
          });
        }

        this.reqList = this.rowData.requestStatus;
        var roleD = this.roleStatusData.filter((res: any) => {
          return res.tender_id == this.rowData.tender_id;
        })
        this.statusList = roleD[0].roleStatus;
      },
      (error: any) => {
        this.alertService.error("Error: Unknown Error!");
      }
    );
  }
  // costing end here

  getTenderData() {
    this.tenderData = [];
    this.tenderType = [];
    this.tendStatus = [];
    this.isNotFound = false;

    this.apiService.getTenderList().subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderData = res.result;
        this.roleStatusData = this.tenderData.filter((data: any) => data.roleStatus);
        this.statusData = res.counts;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.tenderData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.tenderData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });

    this.apiService.getTenderType().subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderType = res.bidtype;
        // this.tendStatus = res.roleStatus;
      } else {
        this.tenderType = undefined;
        // this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.tenderType = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
      this.sendApproval();
    }

  }


  sendApproval() {
    if (this.userData.rolename == 'PreSales' || this.userData.rolename == 'Manager') {
      var reqTend = {
        working_notes: this.form.value.working_notes,
        tenderstatus_id: this.form.value.tenderstatus_id,
        tender_id: this.tenderID,
      }
      this.apiService.createApproval(reqTend).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: (res: any) => {
            let response: any = res;
            document.getElementById('cancel')?.click();
            this.isSubmitted = false;
            if (response.status == 200) {
              this.form.reset();
              this.getTenderData();
              this.alertService.success(response.message);
            } else {
              this.alertService.warning(response.message);
            }
          }, error: (error: any) => {
            this.isNotFound = false;
            this.alertService.error("Error: Unknown Error!")
          }
        })

    }
    else {
      this.form.value.tenderstatus_id = this.reqList[0].tenderstatus_id;
      this.form.value.tender_id = this.tenderID;
      this.apiService.createApproval(this.form.value).subscribe((res: any) => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.userData.rolename === 'Manager' && this.sendForApprovalClicked == true;
          this.form.reset();
          this.getTenderData();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error: any) => {
        this.isNotFound = false;
        this.alertService.error("Error: Unknown Error!")
      })

    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

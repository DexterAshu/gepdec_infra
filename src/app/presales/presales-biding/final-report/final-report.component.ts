import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, AccountService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})
export class FinalReportComponent {
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
  attachmentDataShow: boolean =false;
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
  marginPer: number = 0;
  overallDirectCost: number = 0;
  overallInDirectCost: number = 0;
  totalMargin: number = 0;
  totalProjectCost: number = 0;
  totalProjectCostWithMargin: number = 0;
  totalProfit: number = 0;
  profitPer: number = 0;
  tenderID: any;
  attachListData: any = [];
  attachementDetailsData: any = [];
  attachementTendDetailsData:any = [];
  locationArray: any = [];
  showPreviousDetails: boolean = false;
  docArray:any = [];
  private destroy$ = new Subject<void>();

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
      // tenderstatus_id: ['', Validators.required],
      working_notes: ['', Validators.required],
      submitted_on: ['', Validators.required],
      audit_trail: [null],
    });

    this.getTenderData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  validateInput() {
    if (this.marginPer === null || this.marginPer === undefined) {
      this.marginPer = 0;
    }  else if(this.marginPer < 0) {
      this.marginPer = 0;
    } else if(this.marginPer > 100) {
      this.marginPer = 100;
    }

    this.totalProjectCost = this.overallDirectCost + this.overallInDirectCost;
    this.totalMargin = (this.totalProjectCost * this.marginPer) / 100;
    this.totalProjectCostWithMargin = this.totalProjectCost + this.totalMargin;
    this.totalProfit = +this.rowData?.ecv - this.totalProjectCostWithMargin;
    this.profitPer = (this.totalProfit / +this.rowData?.ecv) * 100;
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
        ? this.rowData.remarks.map((remark:any, index:any) => `${index + 1}. ${remark}`).join('<br>') 
        : '';
}
  getFormattedAuditTrail(): string {
    return (this.rowData?.audit_trail && Array.isArray(this.rowData.audit_trail)) ? this.rowData.audit_trail.map((audit_trail:any, index:any) => `${index + 1}. ${audit_trail}`).join('<br>') 
    : '';
  }

  rowLocation(row:any) {
    this.locationArray = row.tender_location;
  }

  rowListData(row: any) {
    this.rowData = row;
    this.tenderID = row.tender_id;
    if (this.rowData.directCost.length > 0 && this.rowData?.indirectCost.length > 0) {
      this.rowData.directCost[0]?.items?.map((el: any) => {
        this.overallDirectCost += +el?.total_freight_with_GST_value;
      });
  
      this.rowData.indirectCost?.map((el: any) => {
        this.overallInDirectCost += +el?.all_total;
      });
    }

    this.reqList = this.rowData.requestStatus;
    console.log(this.reqList);

    var roleD = this.roleStatusData.filter((res: any) => {
      return res.tender_id == this.rowData.tender_id;
    })
    this.statusList = roleD[0].roleStatus

  }

  attachmentDetails(){
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
        submitted_on: this.form.value.submitted_on,
        working_notes: this.form.value.working_notes,
        tender_id : this.tenderID,
        document: this.docArray
      }
      this.apiService.addAttachmentCod(reqTend).pipe(takeUntil(this.destroy$)).subscribe(
        {next: (res: any) => {
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
        }})

    }
  
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

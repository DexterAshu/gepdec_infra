import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, AccountService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-costing-approval',
  templateUrl: './costing-approval.component.html',
  styleUrls: ['./costing-approval.component.css']
})
export class CostingApprovalComponent {
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
  totalMargin: number = 0;
  totalProjectCost: number = 0;
  totalProjectCostWithMargin: number = 0;
  totalProfit: number = 0;
  profitPer: number = 0;
  tenderID: any;
  locationArray: any = [];
  targetDirect: number = 5;
  marginDirect: number = 12;
  marginIndirect: number = 12;
  indirectInnerBody: any = [];
  indirectClicked: boolean = false;
  directInnerBody: any = [];
  directClicked: boolean = false;
  isDirectAvl: boolean = false;
  isIndirectAvl: boolean = false;


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
      marginPer: [null],
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

  rowListData(row: any) {
    debugger
    this.directClicked = false;
    this.indirectClicked = false;
    this.rowData = row;
    this.tenderID = row.tender_id;

    if (this.rowData.directCost.length > 0 && this.rowData?.indirectCost.length > 0) {

      this.rowData.directCost[0]?.boq?.forEach((el: any) => {
        // this.overallDirectCost += +el?.total_freight_with_GST_value;
        el?.items?.forEach((data: any) => {

          if (data.margin_direct == "0.00") {
            this.isDirectAvl = false;
            data.marginDirect = this.marginDirect;
            data.marginAmt = +data?.totalWithFreightWithGST * (this.marginDirect / 100);
            data.afterMarginAmt = +data?.totalWithFreightWithGST + +data?.marginAmt;
          } else {
            this.isDirectAvl = true;
            data.marginAmt = +data?.totalWithFreightWithGST * (data?.margin_direct / 100);
            data.afterMarginAmt = +data?.totalWithFreightWithGST + +data?.margin_direct;
          }

          if (data.target_direct == "0.00") {
            data.targetDirect = this.targetDirect;
            data.targetUnitPrice = +data?.unit_price * (1 - (this.targetDirect / 100));
          } else {
            data.targetUnitPrice = +data?.unit_price * (1 - (data?.target_direct / 100));
          }
          
          data?.childItemList?.forEach((child: any) => {
            if (child.margin_direct == "0.00") {
              child.marginDirect = this.marginDirect;
              child.marginAmt = +child?.totalWithFreightWithGST * (this.marginDirect / 100);
              child.afterMarginAmt = +child?.totalWithFreightWithGST + +child?.marginAmt;
            } else {
              child.marginAmt = +child?.totalWithFreightWithGST * (child?.margin_direct / 100);
              child.afterMarginAmt = +child?.totalWithFreightWithGST + +child?.margin_direct;
            }

            if (child.target_direct == "0.00") {
              child.targetDirect = this.targetDirect;
              child.targetUnitPrice = +child?.unit_price * (1 - (this.targetDirect / 100));
            } else {
              child.targetUnitPrice = +child?.unit_price * (1 - (child?.target_direct / 100));
            }
          });

        });
      });

      this.rowData.indirectCost?.forEach((el: any) => {
        this.overallInDirectCost += +el?.all_total;
        // let tMargin = 0;
        // let tAmtWithMargin = 0;
        el?.records?.forEach((data: any) => {
          if (data.margin_indirect == "0.00") {
            this.isIndirectAvl = false;
            data.marginIndirect = this.marginIndirect;
            data.marginAmt = +data?.total * (this.marginIndirect / 100);
            data.afterMarginAmt = +data?.total + +data?.marginAmt;
          } else {
            this.isIndirectAvl = true;
            data.marginAmt = +data?.total * (data?.margin_indirect / 100);
            data.afterMarginAmt = +data?.total + +data?.margin_indirect;
          }
          // tMargin += +data?.marginAmt
          // tAmtWithMargin += +data?.afterMarginAmt
        });
        // el.totalMargin += +tMargin
        // el.totalAfterMarginAmt += +tAmtWithMargin
      });
    }

    this.reqList = this.rowData.requestStatus;
    var roleD = this.roleStatusData.filter((res: any) => {
      return res.tender_id == this.rowData.tender_id;
    })
    this.statusList = roleD[0].roleStatus

  }

  validateInput() {
    debugger
    if (this.marginIndirect === null || this.marginIndirect === undefined) {
      this.marginIndirect = 0;
    } else if (this.marginIndirect < 0) {
      this.marginIndirect = 0;
    } else if (this.marginIndirect > 100) {
      this.marginIndirect = 100;
    }

    this.rowData.indirectCost?.forEach((el: any) => {
      el?.records?.forEach((data: any) => {
        data.marginAmt = +data?.total * (this.marginIndirect / 100);
        data.afterMarginAmt = +data?.total + +data?.marginAmt;

        // el.totalMargin += +data.marginAmt
        // el.totalAfterMarginAmt += +data.afterMarginAmt
        data.marginIndirect = this.marginIndirect;
      });
    });

    // this.totalProjectCost = this.overallDirectCost + this.overallInDirectCost;
    // this.totalMargin = (this.totalProjectCost * this.marginPer) / 100;
    // this.totalProjectCostWithMargin = this.totalProjectCost + this.totalMargin;
    // this.totalProfit = +this.rowData?.ecv - this.totalProjectCostWithMargin;
    // this.profitPer = (this.totalProfit / +this.rowData?.ecv) * 100;
  }
  
  validateInputDirect(val:string) {
    debugger

    if(val == 'margin') {
      if (this.marginDirect === null || this.marginDirect === undefined) {
        this.marginDirect = 0;
      } else if (this.marginDirect < 0) {
        this.marginDirect = 0;
      } else if (this.marginDirect > 100) {
        this.marginDirect = 100;
      }
  
      this.rowData.directCost[0].boq?.forEach((el: any) => {
        el?.items?.forEach((data: any) => {
          data.marginDirect = this.marginDirect;
          data.marginAmt = +data?.totalWithFreightWithGST * (data?.marginDirect / 100);
          data.afterMarginAmt = +data?.totalWithFreightWithGST + +data?.marginAmt;
  
          data?.childItemList?.forEach((child: any) => {
            child.marginDirect = this.marginDirect;
            child.marginAmt = +child?.totalWithFreightWithGST * (child?.marginDirect / 100);
            child.afterMarginAmt = +child?.totalWithFreightWithGST + +child?.marginAmt;
          });
  
        });
      });
    } else {
      if (this.targetDirect === null || this.targetDirect === undefined) {
        this.targetDirect = 0;
      } else if (this.targetDirect < 0) {
        this.targetDirect = 0;
      } else if (this.targetDirect > 100) {
        this.targetDirect = 100;
      }
  
      this.rowData.directCost[0].boq?.forEach((el: any) => {
        el?.items?.forEach((data: any) => {
          data.targetDirect = this.targetDirect;
          data.targetUnitPrice = +data?.unit_price * (1 - (data?.targetDirect / 100));
  
          data?.childItemList?.forEach((child: any) => {
            child.targetDirect = this.targetDirect;
            child.targetUnitPrice = +child?.unit_price * (1 - (child?.targetDirect / 100));
          });
  
        });
      });
    }

    // this.totalProjectCost = this.overallDirectCost + this.overallInDirectCost;
    // this.totalMargin = (this.totalProjectCost * this.marginPer) / 100;
    // this.totalProjectCostWithMargin = this.totalProjectCost + this.totalMargin;
    // this.totalProfit = +this.rowData?.ecv - this.totalProjectCostWithMargin;
    // this.profitPer = (this.totalProfit / +this.rowData?.ecv) * 100;
  }

  recalculatePrices(item: any, val:string) {
    debugger
    if(val == 'direct') {
      if (item.marginDirect === null || item.marginDirect === undefined) {
        item.marginDirect = 0;
      } else if (item.marginDirect < 0) {
        item.marginDirect = 0;
      } else if (item.marginDirect > 100) {
        item.marginDirect = 100;
      }
      item.marginAmt = (+item.totalWithFreightWithGST * item.marginDirect) / 100;
      item.afterMarginAmt = +item.totalWithFreightWithGST + +item.marginAmt;
      item.targetUnitPrice = +item?.unit_price * (1 - (item?.targetDirect / 100));
      
    } else {
      if (item.marginIndirect === null || item.marginIndirect === undefined) {
        item.marginIndirect = 0;
      } else if (item.marginIndirect < 0) {
        item.marginIndirect = 0;
      } else if (item.marginIndirect > 100) {
        item.marginIndirect = 100;
      }
      item.marginAmt = (+item.total * item.marginIndirect) / 100;
      item.afterMarginAmt = +item.total + +item.marginAmt;
    }

  }

  saveDirectCosting() {
    debugger
    this.directInnerBody = [];
    this.directClicked = true
    this.rowData.directCost[0].boq?.forEach((el: any) => {
      el?.items?.forEach((data: any) => {

        let itemData = {
          boqitem_id: data?.boqitem_id,
          margin_direct: data?.marginDirect,
          target_direct: data?.targetDirect,
        }
        this.directInnerBody.push(itemData);
        
        data?.childItemList?.forEach((child: any) => {
          let childData = {
            boqitem_id: child?.boqitem_id,
            margin_direct: child?.marginDirect,
            target_direct: child?.targetDirect,
          }
          this.directInnerBody.push(childData);
        });

      });
    });
    
    let directBody = {
      boq_id: null,
      directCost: this.directInnerBody
    }

    let apiLink = "/boq/api/v1/updateBOQMargin";
    this.apiService.putData(apiLink, directBody).subscribe((res: any) => {
      if (res.status === 200) {
        this.getTenderData();
        this.alertService.success("Margin and Target added in Direct Costing");
      } else {
        this.alertService.error(res.message);
      }
    }, (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    });
  }
  
  saveIndirectCosting() {
    debugger
    this.indirectInnerBody = [];
    this.indirectClicked = true
    this.rowData.indirectCost?.forEach((el: any) => {
      el?.records?.forEach((data: any) => {
        let innerData = {
          indirectcost_id: data.indirectcost_id,
          margin_indirect: data.marginIndirect,
        }
        this.indirectInnerBody.push(innerData);
      });
    });
    let indirectBody = {
      tender_id: this.rowData.tender_id,
      indirectcost: this.indirectInnerBody
    }

    let apiLink = "/costing/api/v1/updateTenderIndirectCost";
    this.apiService.putData(apiLink, indirectBody).subscribe((res: any) => {
      if (res.status === 200) {
        this.getTenderData();
        this.alertService.success("Margin added in Indirect Costing");
      } else {
        this.alertService.error(res.message);
      }
    }, (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    });
  }


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

  //status-filter
  gettaball(data: any) {
    // this.dataSource = new MatTableDataSource(this.casetabledata);
    // this.setDataSourceAttributes()

  }
  getnewcase(data: any) {
    // var newCases=this.casetabledata.filter((res:any)=>{
    //   return res.status==="New"
    // })
    //       this.dataSource = new MatTableDataSource(newCases);
    //       this.setDataSourceAttributes()
  }

  getopencase(data: any) {
    // var openCases=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Open"
    // })
    //       this.dataSource = new MatTableDataSource(openCases);
    //       this.setDataSourceAttributes()
  }

  getholdcase(data: any) {
    // var holdcase=this.casetabledata.filter((res:any)=>{
    //   return res.status==="On Hold"
    // })
    // this.dataSource = new MatTableDataSource(holdcase);
    // this.setDataSourceAttributes()
  }
  getclosecase(data: any) {

    // var closed=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Closed"
    // })
    // this.dataSource = new MatTableDataSource(closed);
    // this.setDataSourceAttributes()

  }

  underreviewdata(data: any) {
    // var closed=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Closed"
    // })
    // this.dataSource = new MatTableDataSource(closed);
    // this.setDataSourceAttributes()
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      // if(this.userData.rolename == 'PreSales' || this.userData.rolename == 'Manager'){
      //   this.form.value.requeststatus_id = this.reqList.requeststatus_id;
      // }
      this.isSubmitted = true;
      this.loading = true;
      this.sendApproval();
    }

    // if (this.form.value.tenderstatus_id) {
    //   this.tendStatusData = this.tendStatus.filter((item: any) => {
    //     return item.tenderstatus_id == this.form.value.tenderstatus_id;
    //   });
    //   this.form.value.tenderstatus_id = this.tendStatusData[0]['tenderstatus_id'];
    //   console.log(this.form.value.tenderstatus_id);
    // }
  }

  sendBack() {
    // if (this.form.value.requeststatus_id = '7003') {
    //   this.form.get('working_notes')!.setValidators([Validators.required]);
    //   this.form.controls['working_notes'].reset();
    // }
    // else {
    //   this.form.controls['working_notes'].clearValidators();
    //   this.form.controls['working_notes'].reset();

    // }
    if (this.form.value.tenderstatus_id !== '') {
      this.form.value.tenderstatus_id = '';
    } else {
      this.form.value.tenderstatus_id = null;
    }
    this.approval = 'Send Back';
    this.form.value.approval = this.approval;
    var reqTend = {
      requeststatus_id: this.form.value.requeststatus_id = '7003', // Updated condition
      // requeststatus_id: (this.reqList[0].requeststatus_id == '7003') ? '7003' : '', // Updated condition
      tender_id: this.tenderID,
      working_notes: this.form.value.working_notes,
    };
    this.apiService.createApproval(reqTend).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error: any) => {
      this.isNotFound = false;
      this.alertService.error("Error: " + error.message); // Updated error message
    });
  }


  sendApproval() {

    if (this.userData.rolename == 'PreSales' || this.userData.rolename == 'Manager') {
      var reqTend = {

        working_notes: this.form.value.working_notes,
        requeststatus_id: this.form.value.tenderstatus_id,
        tender_id: this.tenderID,
      }
      this.apiService.createApproval(reqTend).subscribe((res: any) => {
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
      }, (error: any) => {
        this.isNotFound = false;
        this.alertService.error("Error: Unknown Error!")
      })

    }
    else {
      this.form.value.requeststatus_id = this.reqList[0].requeststatus_id;
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
}


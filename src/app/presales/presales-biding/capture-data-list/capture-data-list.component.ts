import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, AccountService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-data-list',
  templateUrl: './capture-data-list.component.html',
  styleUrls: ['./capture-data-list.component.css']
})
export class CaptureDataListComponent {
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
  finDataShow: boolean = false;
  tendStatusData: any;
  data: any;
  sendForApprovalClicked: boolean =false;
  roleStatusData: any;
  statusList: any = [];
  approval: any;
  reqList: any = [];
  locationArray: any = [];

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

  //  getDetails(data:any){
  //   if (data) {
  //     if (this.userData && this.userData.rolename === "Administrator") {
  //       this.router.navigate(['presales/presales-biding/management-approval',data]);
  //     } else {
  //       this.router.navigate(['/presales/presales-biding/data-capture',data]);
  //     }
  //     this.router.navigate(['/presales/presales-biding/data-capture']);
  //     this.button = 'Update';
  //     this.update = true;
  //   } else {}
  // }

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
    this.rowData = row;
    this.reqList  = this.rowData.requestStatus;
    console.log( this.reqList);
    
  var roleD = this.roleStatusData.filter((res:any)=>{
  return res.tender_id == this.rowData.tender_id;
})
this.statusList=roleD[0].roleStatus
  }

  rowLocation(row:any) {
    this.locationArray = row.tender_location;
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
        this.roleStatusData = this.tenderData.filter((data:any)=> data.roleStatus);
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
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
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
        tender_id: this.tenderData[0].tender_id,
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

    if(this.userData.rolename == 'PreSales' || this.userData.rolename == 'Manager'){
      var reqTend = {
        requeststatus_id : this.reqList[0].requeststatus_id,
        tender_id : this.tenderData[0].tender_id,
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
    else{
      this.form.value.requeststatus_id = this.reqList[0].requeststatus_id;
      this.form.value.tender_id = this.tenderData[0].tender_id;
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

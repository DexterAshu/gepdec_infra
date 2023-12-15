import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-proj-closure',
  templateUrl: './proj-closure.component.html',
  styleUrls: ['./proj-closure.component.css']
})
export class ProjClosureComponent {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  // meterPort = environment.meterPort;
  meterData:any=[];
  isNotFound:boolean = false;
  isData:boolean = false;
  isDataList:boolean = false;
  isPulling:boolean = false;
  meterDetailData:any;
  meterDataList:any;
  meterIndexData: any;
  tableHeight: any;
  filterNumber: any;
  filterData: any;
  titleData: any;
  filterType: any = 'PC';
  singleMeterData: any;
  dateForFilter: any;
  searchText:any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      companyID: ["",Validators.required],
      meterCode: ["",Validators.required],
      type: ["",Validators.required],
    });

    this.tableHeight = `${window.innerHeight * 0.65}px`;

    this.getMeterData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the table height when the window is resized
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  get f() { return this.form.controls; }

  getMeterData() {
    this.isNotFound = true;
    this.masterService.getMeterData().subscribe((res:any) => {
      this.isNotFound = false;
      this.meterData = [];
      if (res.status === true) {
        // this.meterData = res.data.filter((data:any) => data.active == 'Y');
        this.meterData = res.data;
        console.log(this.meterData);
        
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.meterData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  // meterDetail(a:any) {
  //   this.singleMeterData = a;
  //   this.isData = true;
  //   let apiLink = '/master/meterData/getMeterData';
  //   let data = {
  //     meterID: a.meterID,
  //   }
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     this.isData = false;
  //     this.meterDetailData = [];
  //     if (res.status === true) {
  //       // this.meterData = res.data.filter((data:any) => data.active == 'Y');
  //       this.meterDetailData = res.data;
  //       this.dateForFilter = this.meterDetailData;
  //       this.meterDetailFilter(this.filterType);
  //     } else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.meterDetailData = [];
  //     this.isData = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  // meterDetailFilter(type:string) {
  //   this.filterType = type;
  //   this.meterDetailData = this.dateForFilter.filter((el:any) => el.Association === type)
  // }

  // meterDetailList(a:any) {
  //   this.isDataList = true;
  //   this.meterIndexData = [];
  //   let apiLink = '/master/meterData/getMeterDataByID/' + a.id;
  //   this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //     this.isDataList = false;
  //     this.meterDataList = [];
  //     if (res.status === true) {
  //       // this.meterData = res.data.filter((data:any) => data.active == 'Y');
  //       this.meterDataList = res.data[0].meterFormateddata;
  //       this.meterIndexData = a
  //     } else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.isDataList = false;
  //     this.meterDataList = [];
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  // pullData() {
  //   this.isPulling = true;
  //   let sendData = {
  //     IP: this.singleMeterData.IPAddress, 
  //     Port: this.meterPort,
  //     Bit: this.filterType == 'PC' ? 16 : this.filterType == 'MR' ? 32 : this.filterType == 'US' ? 48 : this.filterType == 'PUSH' ? 64 : 80, 
  //   }
  //   let apiLink = '/myapp/api/subprocess/';
  //   this.alertService.info("Data start reading it will take some time to get the data.");
  //   this.apiService.postDataDiffApiUrl(apiLink, sendData).subscribe((res:any) => {
  //     this.isPulling = false;
  //     if (res.status === true) {
  //       this.alertService.success("Data Read successfully.");
  //       this.meterDetail(this.singleMeterData);
  //     } else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.isPulling = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }
  
  // filterWiseData(a:any, filter: number) {
  //   this.isDataList = true;
  //   this.filterNumber = filter.toString();
  //   let sendData = {
  //     id: filter,
  //     deviceID: a.deviceID
  //   }
  //   this.titleData = [];
  //   let apiLink = '/master/meterData/getFIlterdMeterData';
  //   this.apiService.postData(apiLink, sendData).subscribe((res:any) => {
  //     this.filterData = [];
  //     this.isDataList = false;
  //     if (res.status === true) {
  //       this.filterData = res.data[0].meterFormateddata;
  //       this.titleData = res.data;
  //     } else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.filterData = [];
  //     this.isDataList = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  onSubmit(){
    console.log(this.form);
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-indirect-costing',
  templateUrl: './indirect-costing.component.html',
  styleUrls: ['./indirect-costing.component.css']
})
export class IndirectCostingComponent {

  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  file: any;
  dataDropdownList: any;
  tenderData: any;
  tenderDetailedData: any = [];
  clientData: any;
  overHeadData: any = [];
  indexData: any = [];
  mainArray: any = [];
  itemList: any;
  indirectCostTotal: number = 0;
  deptData: any;
  userList: any;
  isShowModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private sharedService: SharedService,
    private elementRef: ElementRef 
  ) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      client_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      expenses: [null, Validators.required],
      unitCost: [null],
      multiplier: [null],
      department: [null],
    });

    this.getClientData();
    this.getDataList();
    this.getDropdownList();
  }
  
  // ngAfterViewInit() {
  //   this.sharedService.initializeTooltips(this.elementRef);
  // }

  get f() { return this.form.controls; }

  getClientData() {
    this.clientData = [];
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.clientData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    });
  }

  rowLocation(rowData: any): void {
    this.masterService.openModal(rowData?.tender_id);
  }

  getTenderData() {
    this.tenderData = [];
    this.tenderDetailedData = [];
    this.overHeadData = [];
    this.userList = [];
    this.mainArray = [];
    this.indexData = [];
    this.deptData = [];
    this.form.controls['expenses'].reset();
    this.form.controls['tender_id'].reset();
    this.form.controls['department'].reset();
    let client_Id = this.form.value.client_id;
    this.apiService.getTenderLisById(client_Id).subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderData = res.result;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getDetailedData(tender_id: any) {
    this.tenderDetailedData = [];
    this.overHeadData = [];
    this.userList = [];
    this.mainArray = [];
    this.indexData = [];
    this.deptData = [];
    this.form.controls['expenses'].reset();
    this.form.controls['department'].reset();
    this.tenderDetailedData = this.tenderData.filter((x: any) => x.tender_id == tender_id);
  }
  
  getDropdownList() {
    this.dataDropdownList = [];
    let apiLink = "/costing/api/v1/getCostingDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.dataDropdownList = res;
      } else {
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.dataDropdownList = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  overHeadDetails(data: any) {
    this.overHeadData = [];
    this.userList = [];
    this.mainArray = [];
    this.indexData = [];
    this.deptData = [];
    this.form.controls['department'].reset();
    if(!(data == '2038' || data == '2039')) {
      this.isShowModal = false;
      let apiLink = "/costing/api/v1/getCostingByCostType/" + data;
      this.apiService.getData(apiLink).subscribe((res:any) => {
        if (res.status === 200) {
          this.overHeadData = res.result;
        } else {
          this.overHeadData = undefined;
          this.alertService.warning("Looks like no data available!");
        }
      }, (error: any) => {
        this.overHeadData = undefined;
        this.alertService.error("Error: Unknown Error!");
      });
    } else {
      this.getDepartmentData();
      this.isShowModal = true;
    }
  }

  getDepartmentData() {
    this.deptData = [];
    this.mainArray = [];
    this.indexData = [];
    this.masterService.getUserMaster().subscribe((res: any) => {
      if(res.status == 200) {
        this.deptData = res.department;
      } else {
        this.alertService.warning('Looks like no data available in list.');
      }
    });
  }

  getUserList(dept: any) {
    this.userList = [];
    this.mainArray = [];
    this.indexData = [];
    this.masterService.userByDepartment(dept).subscribe((res: any) => {
      if(res.status == 200) {
        if(res.result.length > 0) {
          this.userList = res.result;
        } else {
          this.userList = undefined;
          this.alertService.warning('Looks like no data available in list.');
        }
      } else {
        this.alertService.warning('Looks like no data available in list.');
      }
    });
  }

  selectRec(data:any, e:any, index:number) {
    debugger
    if(e.target.checked == true) {
      if(!data.multiplier && data.multiplier == null) {
        e.target.checked = false;
        this.alertService.warning("Please fill fields properly then click on checkbox.");  
      } else {
        this.indexData.push(index);
        var totalVal = data?.involvement == undefined ? (data.unitcost * data.multiplier) : ((data.sallary * data.multiplier * data.involvement) / 100);
        let finalData =  { 
          costdetail_id: data.costdetail_id == undefined ? null : data.costdetail_id, 
          unit_id: data?.involvement != undefined ? "9011" : data.unit_id, 
          unitcost: data?.unitcost != undefined ? data?.unitcost : data?.sallary,
          multiplier: data.multiplier, 
          days: null, 
          person: null, 
          total: totalVal,
          employee_id: data.user_id == undefined ? null : data.user_id,
          percentage_involvment: data.involvement == undefined ? null : data.involvement,
        }
        this.mainArray.push(finalData);
      }
    } else {
      this.indexData = this.indexData.filter((el:any) => el != index);
      this.mainArray = this.mainArray.filter((el:any) => el.costdetail_id != data.costdetail_id);
      e.target.checked = false;
    }
  }
  
  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/costing/api/v1/getTenderIndirectCostList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.dataList = res.result;
      } else {
        this.isNotFound = true;
        this.dataList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.dataList = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  rowListData(row:any) {
    this.indirectCostTotal = 0;
    this.itemList = [];
    this.itemList = row;
    this.itemList?.indirectCost.filter((el:any) => { this.indirectCostTotal += +el?.all_total; } )
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        tender_id: this.form.value.tender_id,
        cost: this.mainArray,
      }
      
      let apiLink = '/costing/api/v1/addTenderIndirectCost';
      this.apiService.postData(apiLink, data).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.getDataList();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.form.reset();
          this.mainArray = [];
          this.indexData = [];
          this.tenderDetailedData = [];
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: Unknown Error!");;
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

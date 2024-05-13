import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
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
  rowData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      client_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      expenses: [null, Validators.required],
      unitCost: [null],
      multiplier: [null],
    });

    this.getClientData();
    this.getDataList();
    this.getDropdownList()
  } 

  get f() { return this.form.controls; }

  getClientData() {
    this.clientData = [];
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.clientData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getTenderData() {
    this.tenderData = [];
    this.tenderDetailedData = [];
    this.overHeadData = [];
    this.mainArray = [];
    this.indexData = [];
    this.form.controls['expenses'].reset();
    this.form.controls['tender_id'].reset();
    let client_Id = this.form.value.client_id;
    this.apiService.getTenderLisById(client_Id).subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderData = res.result;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getDetailedData(tender_id: any) {
    this.tenderDetailedData = [];
    this.overHeadData = [];
    this.mainArray = [];
    this.indexData = [];
    this.form.controls['expenses'].reset();
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
    }, error => {
      this.dataDropdownList = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  overHeadDetails(data: any) {
    this.overHeadData = [];
    this.mainArray = [];
    this.indexData = [];
    let apiLink = "/costing/api/v1/getCostingByCostType/" + data;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.overHeadData = res.result;
      } else {
        this.overHeadData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.overHeadData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  selectRec(data:any, e:any, index:number) {
    if(e.target.checked == true) {
      if(!data.multiplier || data.multiplier == null || data.unitcost == null) {
        e.target.checked = false;
        this.alertService.warning("Please fill fields properly then click on checkbox.");  
      } else {
        this.indexData.push(index);
        var totalVal = data.unitcost * data.multiplier;
        let finalData =  { 
          costdetail_id: data.costdetail_id, 
          unit_id: data.unit_id, 
          unitcost: data.unitcost, 
          multiplier: data.multiplier, 
          days: null, 
          person: null, 
          total: totalVal,
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
    }, error => {
      this.isNotFound = true;
      this.dataList = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
    console.log(this.rowData)
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

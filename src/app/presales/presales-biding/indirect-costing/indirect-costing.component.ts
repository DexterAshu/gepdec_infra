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

    });

    this.getClientData();
    this.getDataList();
    this.getDropdownList()
  } 

  get f() { return this.form.controls; }

  getClientData() {
    this.clientData = [];
    this.tenderData = [];
    this.tenderDetailedData = [];
    this.form.controls['tender_id'].reset();
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.clientData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    });
  }

  getTenderData() {
    this.tenderData = [];
    this.tenderDetailedData = [];
    let client_Id = this.form.value.client_id;
    this.apiService.getTenderLisById(client_Id).subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderData = res.result;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    });
  }

  getDetailedData(tender_id: any) {
    this.tenderDetailedData = [];
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
      this.alertService.error(`Some technical issue: ${error.message}`)
    });
  }

  overHeadDetails(data: any) {
    this.overHeadData = [];
    let apiLink = "/costing/api/v1/getCostingByCostType/" + data;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.overHeadData = res;
      } else {
        this.overHeadData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.overHeadData = undefined;
      this.alertService.error(`Some technical issue: ${error.message}`)
    });
  }
  
  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "";
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
      this.alertService.error(`Some technical issue: ${error.message}`)
    });
  }

  onSubmit() {
    // if (this.form.valid) {
    //   this.isSubmitted = true;

    //   let data = {
    //     unit_id: this.form.value.itemUOM,
    //     description: this.form.value.description,
    //     parameter: this.form.value.parameter,
    //     itemcategory_id: this.form.value.itemCategory,
    //     cost: this.form.value.cost,
    //     gst: this.form.value.gst,
    //     parentitem: this.form.value.parentItem,
    //     parentitem_id: this.form.value.parentItem_id,
    //     precurementuom_id: this.form.value.procurementUOM,
    //     materialclass_id: this.form.value.class,
    //     tolerance_id: this.form.value.itemTolerance,
    //     subcategory_id: this.form.value.itemSubCategory,
    //   } 

    //   let apiLink = '/Item/api/v1/addItem';
    //   this.apiService.postData(apiLink, data).subscribe(res => {
    //     let response: any = res;
    //     document.getElementById('cancel')?.click();
    //     this.getDataList();
    //     this.isSubmitted = false;
    //     if (response.status == 200) {
    //       this.form.reset();
    //       this.alertService.success(response.message);
    //     } else {
    //       this.alertService.warning(response.message);
    //     }
    //   }, (error) => {
    //       this.isSubmitted = false;
    //       document.getElementById('cancel')?.click();
    //       this.alertService.error(`Some technical issue: ${error.message}`);
    //     })
    // } else {
    //   this.alertService.warning("Form is invalid, Please fill the form correctly.");
    // }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  dataDropdownList: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      // itemCode: [null, Validators.required],
      description: [null, Validators.required],
      specification: [null, Validators.required],
      parameter: [null],
      // itemType: [null, Validators.required],
      itemCategory: [null, Validators.required],
      itemSubCategory: [null, Validators.required],
      itemUOM: [null, Validators.required],
      procurementUOM: [null, Validators.required],
      cost: [null, Validators.required],
      gst: [null, Validators.required],
      parentItem: [null, Validators.required],
      parentItem_id: [null],
      itemClass: [null, Validators.required],
      itemTolerance: [null, Validators.required],
    });

    this.getDataList();
    this.getDropdownList()
  } 

  get f() { return this.form.controls; }

  getDropdownList() {
    this.dataDropdownList = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.dataDropdownList = res;
      } else {
        this.isNotFound = true;
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.dataDropdownList = undefined;
      this.alertService.error("Error: " + error.statusText)
    });
  }
  
  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemList";
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
      this.alertService.error("Error: " + error.statusText)
    });
  }

  isParent(val:any) {
    debugger
    if (val == 'Yes') {
      this.form.get('parentItem_id')!.setValidators([Validators.required]);
      this.form.controls['parentItem_id'].reset();
    } else {
      this.form.controls['parentItem_id'].clearValidators();
      this.form.controls['parentItem_id'].reset();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        unit_id: this.form.value.itemUOM,
        description: this.form.value.description,
        // itemcode: this.form.value.itemCode.toUpperCase(),
        specification: this.form.value.specification,
        parameter: this.form.value.parameter,
        itemcategory_id: this.form.value.itemCategory,
        // itemtype_id: this.form.value.itemType,
        cost: this.form.value.cost,
        gst: this.form.value.gst,
        parentitem: this.form.value.parentItem,
        parentitem_id: this.form.value.parentItem_id,
        precurementuom_id: this.form.value.procurementUOM,
        materialclass_id: this.form.value.class,
        tolerance_id: this.form.value.itemTolerance,
        subcategory_id: this.form.value.itemSubCategory,
      } 

      let apiLink = '/Item/api/v1/addItem';
      this.apiService.postData(apiLink, data).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.getDataList();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

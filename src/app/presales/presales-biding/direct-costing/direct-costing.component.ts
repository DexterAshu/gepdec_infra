import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ApiService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-direct-costing',
  templateUrl: './direct-costing.component.html',
  styleUrls: ['./direct-costing.component.css']
})
export class DirectCostingComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  file: any;
  dataDropdownList: any;
  selectedRow: any;
  itemList: any;
  totalDirectCost: number = 0;
  totalWithGST: number = 0;
  totalWithFreight: number = 0;
  totalWithFreightWithGST: number = 0;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private apiService: ApiService, private sharedService:SharedService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
      parameter: [null],
      itemCategory: [null, Validators.required],
      itemSubCategory: [null, Validators.required],
      itemUOM: [null, Validators.required],
      // procurementUOM: [null, Validators.required],
      cost: [null],
      hsnCode: [null],
      gst: [null],
      parentItem: [null, Validators.required],
      parentItem_id: [null],
      itemClass: [null, Validators.required],
      itemTolerance: [null, Validators.required],
      // specification: [null, Validators.required],
    });

    this.getDataList();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  get f() { return this.form.controls; }


  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/boq/api/v1/getBoqListForCosting";
    this.apiService.getData(apiLink).subscribe((res: any) => {
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
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getBOQItemList(data: any) {
    this.totalDirectCost = 0;
    this.totalWithGST = 0;
    this.totalWithFreight = 0;
    this.totalWithFreightWithGST = 0;
    this.itemList = [];
    this.itemList = data;
    this.itemList?.items.forEach((item: any) => {
      this.totalDirectCost += item?.total_price_value;
      this.totalWithGST += item.total_GST_value;
      this.totalWithFreight += item.total_freight_value;
      this.totalWithFreightWithGST += item.total_freight_with_GST_value;
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
    //     hsn_code: this.form.value.hsnCode,
    //     gst: this.form.value.gst,
    //     parentitem: this.form.value.parentItem,
    //     parentitem_id: this.form.value.parentItem_id,
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
    //     this.isSubmitted = false;
    //     document.getElementById('cancel')?.click();
    //     this.alertService.error("Error: Unknown Error!");
    //   })
    // } else {
    //   this.alertService.warning("Form is invalid, Please fill the form correctly.");
    // }
  }

}

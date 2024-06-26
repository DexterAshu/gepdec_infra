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
  limit: any = environment.pageLimit;
  apiLink: any = environment.apiUrl;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound: boolean = false;
  dataList: any;
  file: any;
  dataDropdownList: any;
  selectedBOQRow: any;
  selectedRow: any;
  itemList: any;
  checkedDataList: any = [];

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
      console.error(error);
      this.isNotFound = true;
      this.dataList = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getBOQList(data: any): void {
    this.checkedDataList = [];
    this.selectedBOQRow = data;
  }

  getItemList(data: any) {
    this.itemList = [];
    this.checkedDataList = [];
    this.itemList = data;
  }

  disableRow(data: any): void {
    this.itemList.items = this.itemList?.items.map((item: any) => {
      item.isDisabled = (item.item_id == data.item_id) ? !item.isDisabled : item.isDisabled;
      return item;
    });
  }

  disableChildRow(parent: any, child: any): void {
    parent.childItemList = parent.childItemList.map((item: any) => {
      item.isDisabled = (item.item_id == child.item_id) ? !item.isDisabled : item.isDisabled;
      return item;
    });
  }

  selectAllItems(): void {
    debugger;
    this.itemList.items = this.itemList?.items.map((item: any) => {
      item.isDisabled = !item.isDisabled;
      if(item?.childItemList?.length > 0) {
        item.childItemList = item.childItemList.map((child: any) => {
          child.isDisabled = !child.isDisabled;
          return child;
        });
      }
      return item;
    });
  }

  onItemSelect(data: any): void {
    let match: any = {};
    match.boqitem_id = data.boqitem_id;
    match.boq_id = data.boq_id;
    match.item_id = data.item_id;
    match.itemcode = data.itemcode;
    match.gst = data.gst;
    match.freight_charges = data.freight_charges;
    match.unit_price = data.unit_price;
    let find = this.checkedDataList.find((item: any) => item.item_id == match.item_id);
    if (find) {
      this.checkedDataList = this.checkedDataList.filter((item: any) => item.item_id != match.item_id);
    } else {
      this.checkedDataList.push(match);
    }
    console.log(this.checkedDataList);
  }
  
  onSubmit() {
    if(this.checkedDataList.length === 0) {
      this.alertService.warning("Please select atleast one item");
      return;
    }
    console.log(JSON.stringify(this.checkedDataList));
    let apiLink = '/costing/api/v1/updatedTenderDirectCosting';
    this.apiService.postData(apiLink, this.checkedDataList).subscribe(res => {
      if (res.status == 200) {
        this.getDataList();
        this.checkedDataList = undefined;
        this.selectedBOQRow = undefined;
        this.itemList = undefined;
        this.alertService.success(res.message);
        document.getElementById('editItemCostingData')?.click();
      } else {
        this.alertService.warning(res.message);
      }
    }, (error) => {
      this.isSubmitted = false;
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    });
  }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { AlertService, ApiService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-boq-items',
  templateUrl: './boq-items.component.html',
  styleUrls: ['./boq-items.component.css']
})

export class BoqItemsComponent {
  form!: FormGroup;
  form1!: FormGroup;
  editParentItemForm!: FormGroup;
  editChildItemForm!: FormGroup;
  addParentItemForm!: FormGroup;
  addChildItemForm!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  limits: any = [];
  update: boolean = false;
  button: string = 'Create';
  loading: boolean = false;
  attachment: any = [];
  itemList: any;
  tenderDetailsData: any;
  filterTenderDetailsData: any = [];
  listOfFiles: any = [];
  boqData: any;
  companyList: any;
  dataCatList: any;
  dataSubList: any;
  childData: any;
  boqList: any;
  selectParentItemForUpdateChild: any;
  itemListData: any = [];
  errorItemList: any = [];
  selectedItemsListForUpdate: any = [];

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private apiService: ApiService, private sharedService:SharedService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.formInit();
    this.getBoqListData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  formInit() {
    this.form = this.formBuilder.group({
      childItem: this.formBuilder.array([]),
    });
    this.form1 = this.formBuilder.group({
      tender_id: ['', Validators.required],
      utility_id: ['', Validators.required],
      itemCategory: ['', Validators.required],
      itemSubCategory: ['', Validators.required],
      attachment: ['', Validators.required]
    });
    this.addParentItemForm = this.formBuilder.group({
      boq_id: [null, Validators.required],
      itemcode: [null, Validators.required],
      item_id: [null, Validators.required],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      freight_charges: [null, Validators.required],
      have_parent: [null, Validators.required],
      parent_item_id: [null, Validators.required]
    });
    this.editParentItemForm = this.formBuilder.group({
      boq_id: [null, Validators.required],
      itemcode: [null, Validators.required],
      item_id: [null, Validators.required],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      freight_charges: [null, Validators.required],
    });
    this.addChildItemForm = this.formBuilder.group({
      boq_id: [null, Validators.required],
      itemcode: [null, Validators.required],
      item_id: [null, Validators.required],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      freight_charges: [null, Validators.required],
      have_parent: [null, Validators.required],
      parent_item_id: [null, Validators.required]
    });
    this.editChildItemForm = this.formBuilder.group({
      boq_id: [null, Validators.required],
      itemcode: [null, Validators.required],
      item_id: [null, Validators.required],
      parent_item_id: [null, Validators.required],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      freight_charges: [null, Validators.required],
    });
    this.getCompanyData();
  }

  getCompanyData(): void {
    const apiLink = `/company/api/v1/getComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.companyList = res.result;
        this.getItemListData();
      } else {
        this.alertService.warning("Looks like no data available in type!");
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getDropdownList() {
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.dataCatList = res.itemcategory;
        this.dataSubList = res.subcategory;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getChildData(data: any): void {
    this.childData = data;
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    const apiLink = `/biding/api/v1/getTenderlist?company_id=${company_id}`
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status == 200){
        this.tenderDetailsData = res.result;
        this.getDropdownList();
      } else {
        this.tenderDetailsData = undefined;
        this.alertService.warning("Looks like no data available in type!");
      }
    }),
    (error: any) => {
      this.tenderDetailsData = undefined;
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  getBoqListData() {
    this.boqData = [];
    this.isNotFound = false;
    const apiLink = `/boq/api/v1/getTenderBOQData`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.boqData = res.result;
      } else {
        this.boqData = undefined;
        this.isNotFound = true;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = true;
      this.boqData = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getItemListData(): void {
    const apiLink = `/item/api/v1/getItemList`;
    this.itemListData = undefined;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.itemListData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getBOQItemList(data: any) {
    this.itemList = data;
  }

  getEditBOQList(data: any): void {
    this.itemList =  [];
    this.update = true;
    this.button = 'Update';
    this.boqList = data;
  }

  getBOQList(data: any) {
    this.itemList =  [];
    this.update = false;
    this.button = 'Create';
    this.boqList = data;
  }

  editBOQParentItemList(data: any): void {
    this.editParentItemForm = this.formBuilder.group({
      boq_id: [this.itemList.boq_id, Validators.required],
      itemcode: [data.itemcode, Validators.required],
      item_id: [data.item_id, Validators.required],
      qty: [data.qty, Validators.required],
      unit_price: [data.unit_price, Validators.required],
      freight_charges: [data.freight_charges, Validators.required],
    })
  }

  get pic() { return this.editParentItemForm.controls; }

  get addPIC() { return this.addParentItemForm.controls; }

  addParentItem(): void {
    let match: any = this.itemListData.find((x: any) => x.itemcode == this.addParentItemForm.value.itemcode);
    console.log(match);
    match.isAdded = true;
    match.isUpdate = false;
    match.qty = this.addParentItemForm.value.qty;
    match.unit_price = this.addParentItemForm.value.unit_price;
    match.freight_charges = this.addParentItemForm.value.freight_charges;
    this.itemList.items.push(match);
    this.addParentItemForm.reset();
  }

  updateParentItem(): void {
    this.itemList.items = this.itemList.items.map((item: any) => {
      if (item.item_id == this.editParentItemForm.value.item_id) {
        let match: any = item;
        match.isUpdate = true;
        match.qty = this.editParentItemForm.value.qty;
        match.unit_price = this.editParentItemForm.value.unit_price;
        match.freight_charges = this.editParentItemForm.value.freight_charges;
        return match;
      } else {
        return item;
      }
    });
    this.editParentItemForm.reset();
  }

  deleteBOQParentItemList(item: any): void {
    this.itemList.items = this.itemList.items.filter((x: any) => x.item_id != item.item_id);
  }

  addBOQChildItem(): void {
    this.itemList.items = this.itemList.items.map((item: any) => {
      if (item.item_id == this.selectParentItemForUpdateChild.item_id) {
        let match: any = this.itemListData.find((x: any) => x.itemcode == this.addChildItemForm.value.itemcode);
        console.log(match);
        match.isAdded = true;
        match.isUpdate = false;
        match.qty = this.addChildItemForm.value.qty;
        match.unit_price = this.addChildItemForm.value.unit_price;
        match.freight_charges = this.addChildItemForm.value.freight_charges;
        item.childItemList = item.childItemList ? item.childItemList : [];
        item.childItemList.push(match);
        console.log(item);
        return item;
      }
      return item;
    });
    this.addChildItemForm.reset();
    this.selectParentItemForUpdateChild = null;
  }

  selectParentForAddChildItem(data: any): void {
    this.selectParentItemForUpdateChild = data;
    console.log(this.selectParentItemForUpdateChild);
  }

  editBOQChildItemList(parentItem: any, childItem: any): void {
    this.selectParentItemForUpdateChild = parentItem;
    this.editChildItemForm = this.formBuilder.group({
      boq_id: [this.itemList.boq_id, Validators.required],
      itemcode: [childItem.itemcode, Validators.required],
      parent_item_id: [parentItem.parent_item_id ? parentItem.parent_item_id : parentItem.item_id, Validators.required],
      item_id: [childItem.item_id, Validators.required],
      qty: [childItem.qty, Validators.required],
      unit_price: [childItem.unit_price, Validators.required],
      freight_charges: [childItem.freight_charges, Validators.required]
    });
  }

  updateBOQChildItemList(): void {
    this.itemList.items = this.itemList.items.map((item: any) => {
      if (item.item_id == this.editChildItemForm.value.parent_item_id) {
        item.childItemList = item.childItemList.map((childItem: any) => {
          if (childItem.item_id == this.editChildItemForm.value.item_id) {
            let match: any = childItem;
            match.isUpdate = !this.editChildItemForm.value.isAdded;
            match.qty = this.editChildItemForm.value.qty;
            match.unit_price = this.editChildItemForm.value.unit_price;
            match.freight_charges = this.editChildItemForm.value.freight_charges;
            return match;
          } else {
            return childItem;
          }
        });
      }
      return item;
    });
    this.editChildItemForm.reset();
    this.selectParentItemForUpdateChild = null;
  }

  deleteBOQChildItemList(item: any, childItem: any): void {
    this.itemList.items = this.itemList.items.map((x: any) => {
      if (x.item_id == item.item_id) {
        x.childItemList = x.childItemList.filter((y: any) => y.item_id != childItem.item_id);
      }
      return x;
    });
  }

  get f() { return this.form.controls; }
  get fb() { return this.form1.controls; }

  onFileChanged(event: any) {
    this.listOfFiles = [];
    this.attachment = [];
    const fileList = event.target.files;
    for (let file of fileList) {
      this.listOfFiles.push(file.name);
      this.attachment.push(file);
    }
  }

  // BOQ item bulk data
  onBOQSubmit() {
    this.isSubmitted = true;
    const formData: any = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append('utility_id', this.form1.value.utility_id);
    formData.append('tender_id', this.form1.value.tender_id);
    formData.append('itemcategory_id', this.form1.value.itemCategory);
    formData.append('subcategory_id', this.form1.value.itemSubCategory);
    this.apiService.BOQbulkData(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.form1.reset();
        this.isSubmitted = false;
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
        this.ngOnInit();
      } else {
        this.isSubmitted = false;
        this.errorItemList = res.Data;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      console.error(error);
      this.isSubmitted = false;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  selectItemForUpdate(item: any): void {
    let data = this.selectedItemsListForUpdate.filter((x: any) => x.item_id == item.item_id);
    if(data.length > 0) {
      this.selectedItemsListForUpdate = this.selectedItemsListForUpdate.filter((x: any) => x.item_id != item.item_id);
    } else {
      this.selectedItemsListForUpdate.push(item);
    }
    console.log(this.selectedItemsListForUpdate);
  }

  onBOQItemSubmit(): void {
    console.log(this.selectedItemsListForUpdate);
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }
}

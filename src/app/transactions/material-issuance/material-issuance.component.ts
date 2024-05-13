import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-issuance',
  templateUrl: './material-issuance.component.html',
  styleUrls: ['./material-issuance.component.css']
})
export class MaterialIssuanceComponent {
  searchText: any;
  materialIssuanceData: any = [];
  tenderList: any = [];
  itemData: any = [];
  wareHouseData: any = [];
  itemCategories: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  searchForm!: FormGroup;
  form!: FormGroup;
  selectedRow: any;

  constructor( private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService ) { }

  ngOnInit(): void {
    this.formInit();
    this.getMaterialIssuanceData();
  }

  formInit(): void {
    this.form = this.fb.group({
      tender_id: [null, Validators.required],
      warehouse_id: [null, Validators.required],
      itemcategory_id: [null, Validators.required],
      issue_qty: [null],
      items: this.fb.array([])
    });
  }

  get f() { return this.form.controls; }

  selectItem(data: any): void {
    let dataLength = this.form.value.items.filter((x:any) => x.item_id === data.item_id && x.itemlocation_id === data.itemlocation_id);
    if(dataLength.length === 1) {
      this.form.value.items = this.form.value.items.filter((x:any) => x.item_id !== data.item_id && x.itemlocation_id !== data.itemlocation_id);
    } else {
      let match = {
        "item_id": data.item_id,
        "unit_id": data.unit_id,
        "itemlocation_id": data.itemlocation_id,
        "total_qty": data.total_itemquantity,
        "issue_qty": data?.issue_qty ? data?.issue_qty : 0,
        "remain_qty": data.issue_qty - (data?.issue_qty ? data?.issue_qty : 0)
      }
      this.form.value.items.push(match);
    }
    console.log(this.form.value);
    delete this.form.value.issue_qty;
  }

  getMaterialIssuanceData(): void {
    const apiLink = `/inventory/api/v1/getIssuanceList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.materialIssuanceData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getTenderList(): void {
    const apiLink = `/biding/api/v1/getTenderlist`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.tenderList = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getWarehouseData() {
    const apiLink = `/warehouse/api/v1/getWareHouseList?tender_id=${this.form.value.tender_id}`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
        this.getItemCategoryData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getItemCategoryData() {
    const apiLink = `/item/api/v1/getItemDropdown`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.itemCategories = res.itemcategory;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getItems(): void {
    this.itemData = [];
    let apiLink: any = `/inventory/api/v1/getInventoryList?tender_id=${this.form.value.tender_id}`;
    apiLink = this.form.value?.warehouse_id ? apiLink + `&warehouse_id=${this.form.value.warehouse_id}` : apiLink
    apiLink = this.form.value?.itemcategory_id ? apiLink + `&itemcategory_id=${this.form.value.itemcategory_id}` : apiLink
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.itemData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    }
  }

  selectRow(data: any): void {
    this.selectedRow = data;
    console.log(this.selectedRow);
    this.update = true;
    this.isNotFound = false;
    this.form.patchValue(this.selectedRow);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.apiService.createInventoryIssuance(this.form.value).subscribe((res:any) => {
      if (res.status === 200) {
        this.getMaterialIssuanceData();
        this.alertService.success(res.message);
        this.form.reset();
      } else {
        this.alertService.warning(res.message);
      }
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!")
    }
    this.isSubmitted = false;
  }

}

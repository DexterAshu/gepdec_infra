import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-label',
  templateUrl: './item-label.component.html',
  styleUrls: ['./item-label.component.css']
})
export class ItemLabelComponent {
  searchText: any;
  itemLocationLabelData: any = [];
  limit: any = environment.pageLimit;
  p: number = 1;
  isNotFound: boolean = false;
  form!: FormGroup;
  update: boolean = false;
  isSubmitted: boolean = false;
  wareHouseData: any = [];
  itemData: any = [];
  selectedWHL: any;

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      warehouse_id: [null, Validators.required],
      location_name: [null, Validators.required],
      capacity: [null, Validators.required],
      items: [null]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.form.value.items = this.form.value?.items.map((i: any) => {
        return {"item_id": i};
      });
      if (this.update) {
        console.log("update");
        this.form.value.action = "update";
        this.form.value.warehouselocation_id = this.selectedWHL.warehouselocation_id;
        this.createData(this.form.value);
      } else {
        console.log("Insert");
        this.form.value.action = "add";
        this.createData(this.form.value);
      }
    }
  }

  createData(data: any): void {
    console.log(data);
    this.masterService.warehouseLocation(data).subscribe((res:any) => {
      if (res.status === 200) {
        this.alertService.success(res.message);
        this.getData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.isSubmitted = false;
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  getWarehouseData() {
    this.masterService.getWarehouseData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  selectWHL(data: any) {
    this.selectedWHL = data;
    this.getWarehouseData();
    this.getItemData();
    this.update = Object.keys(data).length !== 0;
    if(this.update) {
      this.form.patchValue(data);
    } else {
      this.form.reset();
    }
  }

  getItemData(): void {
    this.itemData = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.itemData = res.result;
      } else {
        this.isNotFound = true;
        this.itemData = [];
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.itemData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getData() {
    this.masterService.getWHLocationData().subscribe((res:any) => {
      if (res.status === 200) {
        this.itemLocationLabelData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }
}

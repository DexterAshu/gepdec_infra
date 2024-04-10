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
      labelName: [null, Validators.required],
      capacity: [null, Validators.required],
      item_id: [null]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitted = true;
      console.log(this.form.value);
      if (this.update) {
        console.log("update");
        this.form.value.action = "update";
        // this.form.value.warehouselocation_id = this.selectedWHL.warehouselocation_id;
        // this.updateData(this.form.value);
      } else {
        console.log("Insert");
        this.form.value.action = "add";
        // this.createData(this.form.value);
      }
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

  // getData(): void {
  //   this.itemLocationLabelData = [
  //     {
  //       "labelCode": "WH001-L001",
  //       "labelName": "Location Rak 1",
  //       "capacity": 500,
  //       "WHCode": "WH001",
  //       "WHName": "Warehouse 1",
  //       "items": [
  //         {
  //           "itemCode": "ITM001",
  //           "description": "Item 1"
  //         },
  //         {
  //           "itemCode": "ITM002",
  //           "description": "Item 2"
  //         },
  //         {
  //           "itemCode": "ITM003",
  //           "description": "Item 3"
  //         }
  //       ]
  //     },
  //     {
  //       "labelCode": "WH002-L002",
  //       "labelName": "Location Rak 2",
  //       "capacity": 500,
  //       "WHCode": "WH002",
  //       "WHName": "Warehouse 2",
  //       "items": [
  //         {
  //           "itemCode": "ITM101",
  //           "description": "Item 101"
  //         },
  //         {
  //           "itemCode": "ITM102",
  //           "description": "Item 102"
  //         }
  //       ]
  //     },
  //     {
  //       "labelCode": "WH003-L003",
  //       "labelName": "Location Rak 3",
  //       "capacity": 500,
  //       "WHCode": "WH003",
  //       "WHName": "Warehouse 3",
  //       "items": [
  //         {
  //           "itemCode": "ITM201",
  //           "description": "Item 201"
  //         }
  //       ]
  //     }
  //   ];
  // }

}

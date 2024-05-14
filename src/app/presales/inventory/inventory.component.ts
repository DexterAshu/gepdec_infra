import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  searchText: any;
  limit: any = environment.pageLimit;
  p: number = 1;
  isNotFound: boolean = false;
  itemData: any = [];
  form!: FormGroup;
  wareHouseData: any = [];

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private elementRef: ElementRef, private alertService: AlertService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formInit();
    this.getData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      warehouse_id: [null, Validators.required],
      meterCode: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  getData(): void {
    this.itemData = [];
    this.isNotFound = false;
    let apiLink = "/inventory/api/v1/getInventoryList";
    this.apiService.getData(apiLink).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.itemData = res.result;
          this.isNotFound = false;
        } else {
          this.isNotFound = true;
          this.itemData = undefined;
          this.alertService.warning("Looks like no data available!");
        }
      },
      error: (error) => {
        this.isNotFound = true;
        this.itemData = undefined;
        this.alertService.error("Error: Unknown Error!");
      }
    });
  }

  get f() { return this.form.controls; }

  onCreate(): void {
    this.getWarehouseData();
  }

  getWarehouseData() {
    const apiLink = `/warehouse/api/v1/getWareHouseList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
      (error: any) => {
        this.alertService.error("Error: Unknown Error!");
      }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "Inventory_Item_List.xlsx");
  }
}

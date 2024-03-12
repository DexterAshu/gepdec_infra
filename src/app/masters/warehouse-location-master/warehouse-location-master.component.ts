import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ApiService, MasterService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-warehouse-location-master',
  templateUrl: './warehouse-location-master.component.html',
  styleUrls: ['./warehouse-location-master.component.css']
})
export class WarehouseLocationMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  wareHouseLocationData: any = [];
  isNotFound:boolean = false;
  limits: any = [];
  isExcelDownload: boolean = false;
  loading: boolean = false;
  selectedWHL: any;
  form!: FormGroup;
  update: boolean = false;
  isSubmitted: boolean = false;
  wareHouseData: any = [];

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      warehouse_id: [null, Validators.required],
      location_description: [null, Validators.required],
      capacity: [null, Validators.required]
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
        this.form.value.warehouselocation_id = this.selectedWHL.warehouselocation_id;
        this.updateData(this.form.value);
      } else {
        console.log("Insert");
        this.form.value.action = "add";
        this.createData(this.form.value);
      }
    }
  }

  createData(match: any) {
    console.log(match);
    this.masterService.warehouseLocation(match).subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseLocationData = res.result;
        this.getData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
    this.isSubmitted = false;
  }

  updateData(match: any): void {
    console.log(match);
    this.masterService.warehouseLocation(match).subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseLocationData = res.result;
        this.getData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
    this.isSubmitted = false;
  }

  selectWHL(data: any) {
    this.selectedWHL = data;
    this.getWarehouseData();
    this.update = Object.keys(data).length !== 0;
    if(this.update) {
      this.form.patchValue(data);
    } else {
      this.form.reset();
    }
  }

  getData() {
    this.masterService.getWHLocationData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseLocationData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
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

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "warehouse_location.xlsx");
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ApiService, MasterService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-warehouse-master',
  templateUrl: './warehouse-master.component.html',
  styleUrls: ['./warehouse-master.component.css']
})
export class WarehouseMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  wareHouseData: any;
  isNotFound:boolean = false;
  limits: any = [];
  isExcelDownload: boolean = false;
  loading: boolean = false;
  selectedWH: any;
  form!: FormGroup;
  countryData: any = [];
  update: boolean = false;
  districtData: any = [];
  stateData: any = [];
  isSubmitted: boolean = false;

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      warehouse_code: [null, Validators.required],
      warehouse_name: [null, Validators.required],
      contact_name: [null, Validators.required],
      contactno1: [null, Validators.required],
      contactno2: [null, Validators.required],
      email: [null, Validators.required],
      pincode: [null, Validators.required],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      address1: [null, Validators.required],
      address2: [null, Validators.required],
      warehouse_id: [null, Validators.required],
      warehousecontact_id: [null],
      warehouseaddress_id: [null]
    });
  }

  getData() {
    this.masterService.getWarehouseData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
        this.getCountryData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  getDistrictData() {
    this.districtData = [];
    let data = this.form.value.state_id;
    let dist = this.form.value.district_id;
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }

  getStateData() {
    let countryData = this.form.value.country_id;
    let stateData = null;
    this.apiService.getStateData(countryData, stateData).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }

  createData(match: any) {
    console.log(match);
    this.masterService.createWarehouse(match).subscribe((res:any) => {
      if (res.status === 200) {
        this.isSubmitted = false;
        this.getData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.isSubmitted = false;
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  updateWarehouse(match: any): void {
    console.log(match);
    this.masterService.updateWarehouse(match).subscribe((res:any) => {
      if (res.status === 200) {
        this.isSubmitted = false;
        this.getData();
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
      document.getElementById('cancel')?.click();
    }),
    (error: any) => {
      this.isSubmitted = false;
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  selectWH(data: any) {
    this.selectedWH = data;
    this.update = Object.keys(data).length !== 0;
    if(this.update) {
      this.form.patchValue(data);
    } else {
      this.form.reset();
    }
  }

  OnlyNumbersAllowed(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is ' + charCode);
      return false;
    }
    return true;
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitted = true;
      console.log(this.form.value);
      if (this.update) {
        console.log("update");
        this.updateWarehouse(this.form.value);
      } else {
        console.log("Insert");
        this.createData(this.form.value);
      }
    }
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "warehouse.xlsx");
  }
}

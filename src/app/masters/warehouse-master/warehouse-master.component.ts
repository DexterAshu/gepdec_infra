import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ApiService, MasterService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

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
  limits: any;
  isExcelDownload: boolean = false;
  loading: boolean = false;
  selectedWH: any;
  form!: FormGroup;
  update: boolean = false;

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      ContactPerson: [null, Validators.required],
      VendorName: [null, Validators.required],
    });
  }

  getData() {
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

  createData() {
    let match = {};
    this.masterService.createWarehouse(match).subscribe((res:any) => {
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

  selectWH(data: any) {
    this.selectedWH = data;
    console.log(this.selectedWH)
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
      this.loading = true;
      if (this.update) {
        console.log("update");
      } else {
        console.log("Insert");
      }
    }
  }
}

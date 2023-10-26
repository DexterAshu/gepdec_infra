import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any;
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any;
  isSubmitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      companyName: [null, Validators.required],
      companyId: [null, Validators.required],
      companyType: [null, Validators.required],
      contactNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gstNo: [null, Validators.required],
      doi: [null, Validators.required],  
      lane: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });

    this.getCompanyData();
    this.getCountryData();
    
  }

  get f() { return this.form.controls; }

  getCountryData() {
    this.countryData = [];
    let apiLink = "/master/market/getMarket"
    this.apiService.getDataList(apiLink).subscribe((res:any) => {
      if (res.status === true) {
        this.countryData = res.data;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }
  
  getStateData() {
    this.stateData = [];
    let data = {
      marketCode: this.form.value.country
    }
    let apiLink = "/master/state/getStatesByCountry"
    this.apiService.postData(apiLink, data).subscribe((res:any) => {
      if (res.status === true) {
        this.stateData = res.data;
      } else {
        this.alertService.warning(`Looks like no state available related to ${this.form.value.country}.`);
      }
    });
  }
  
  getDistrictData() {
    this.districtData = [];
    let data = {
      stateCode: this.form.value.state
    }
    let apiLink = "/master/district/getDistrictByState"
    this.apiService.postData(apiLink, data).subscribe((res:any) => {
      if (res.status === true) {
        this.districtData = res.data;
      } else {
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }
  
  getCompanyData() {
    this.isNotFound = true;
    this.masterService.getCompanyData().subscribe((res:any) => {
      this.isNotFound = false;
      this.companyData = [];
      if (res.status === true) {
        this.companyData = res.data.filter((data:any) => data.active == 'Y');
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.companyData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        companyID: this.form.value.companyId.toUpperCase(),
        companyName: this.form.value.companyName,
        companyType: this.form.value.companyType,
        contactNo: this.form.value.contactNo,
        emailID: this.form.value.email,
        gstNo: this.form.value.gstNo.toUpperCase(),
        DOI: this.form.value.doi,
        address: {
          country: this.form.value.country,
          state: this.form.value.state,
          city: this.form.value.district,
          lane: this.form.value.lane,
          pinno: this.form.value.pincode,
        }
      };
      let apiLink = '/master/company/createCompany';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getCompanyData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else { 
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

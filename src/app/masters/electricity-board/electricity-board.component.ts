import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-electricity-board',
  templateUrl: './electricity-board.component.html',
  styleUrls: ['./electricity-board.component.css']
})
export class ElectricityBoardComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  ecbData: any;
  isNotFound:boolean = false;
  isSubmitted:boolean = false;
  districtData: any;
  stateData: any;
  countryData: any;
  searchText:any;
 

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ecbName: [null, Validators.required],
      ecbCode: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      address: [null, Validators.required],
      pincode: [null, Validators.required],
    });

    this.getECBData();
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
  
  getECBData() {
    this.isNotFound = true;
    this.masterService.getECBData().subscribe((res:any) => {
      this.isNotFound = false;
      this.ecbData = [];
      if (res.status === true) {
        this.ecbData = res.data.filter((data:any) => data.active == 'Y');
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = false;
      this.ecbData = [];
      this.alertService.error("Error: " + error.statusText)
    }); 
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        code: this.form.value.ecbCode.toUpperCase(),
        name: this.form.value.ecbName,
        email: this.form.value.email,
        phone: this.form.value.contact,
        countryCode: this.form.value.country,
        stateCode: this.form.value.state,
        districtCode: this.form.value.district,
        address: this.form.value.address,
        pinCode: this.form.value.pincode,
      };
      let apiLink = '/master/ecbMaster/createEbc';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getECBData();
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

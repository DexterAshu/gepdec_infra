import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  districtData:any;
  isNotFound:boolean = false;
  stateData: any;
  countryData: any;
  isSubmitted:boolean = false
  searchText:any;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: [null, Validators.required],
      state: [null, Validators.required],
      districtName: [null, Validators.required],
      districtCode: [null, Validators.required],
    });

    this.getDistrictData();
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
    this.isNotFound = true;
    this.masterService.getDistrictData().subscribe((res:any) => {
      this.isNotFound = false;
      this.districtData = [];
      if (res.status === true) {
        this.districtData = res.data.filter((data:any) => data.active == 'Y');
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.districtData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    }); 
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        countryID: this.form.value.country,
        stateCode: this.form.value.state,
        name: this.form.value.districtName,
        code: this.form.value.districtCode.toUpperCase(),
      };
      let apiLink = '/master/district/createDistrict';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getDistrictData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          document.getElementById('cancel')?.click();
          this.isSubmitted = false;
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

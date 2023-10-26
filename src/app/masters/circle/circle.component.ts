import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  circleData: any;
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any;
  isSubmitted:boolean = false;
  searchText:any;
  ecbData: any;
  
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
      district: [null, Validators.required],
      ecb: [null, Validators.required],
      circleName: [null, Validators.required],
      circleCode: [null, Validators.required],
    });
    
    this.getCircleData();
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
    this.ecbData = [];
    let data = {
      countryCode: this.form.value.country,
      stateCode: this.form.value.state,
      districtCode: this.form.value.district,
    }
    let apiLink = "/master/ecbMaster/getECBBystateCodeDistrictCode"
    this.apiService.postData(apiLink, data).subscribe((res:any) => {
      if (res.status === true) {
        this.ecbData = res.data;
      } else {
        this.alertService.warning(`Looks like no electricity board available related to ${this.form.value.district}.`);
      }
    });
  }

  getCircleData() {
    this.isNotFound = true;
    this.masterService.getCircleData().subscribe((res:any) => {
      this.isNotFound = false;
      this.circleData = [];
      if (res.status === true) {
        // this.circleData = res.data.filter((data:any) => data.active == 'Y');
        this.circleData = res.data;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.circleData = [];
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
        districtCode: this.form.value.district,
        ecbCode: this.form.value.ecb,
        name: this.form.value.circleName,
        code: this.form.value.circleCode.toUpperCase(),
      };
      let apiLink = '/master/circleMaster/createCircle';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getCircleData();
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

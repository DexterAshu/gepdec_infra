import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  searchText:any;
  limit = environment.pageLimit;
  stateData: any;
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      stateName: [null, Validators.required],
      stateCode: [null, Validators.required],
      country: [null, Validators.required],
    });
    
    this.getStateData();
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
    this.isNotFound = true;
    this.masterService.getStateData().subscribe((res:any) => {
      this.isNotFound = false;
      this.stateData = [];
      if (res.status === true) {
        this.stateData = res.data.filter((data:any) => data.active == 'Y');
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.stateData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    }); 
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        name: this.form.value.stateName,
        code: this.form.value.stateCode.toUpperCase(),
        marketCode: this.form.value.country,
      };
      let apiLink = '/master/state/createState';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getStateData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

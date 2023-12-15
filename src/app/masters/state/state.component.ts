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
  stateData: any ;
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  stateCount: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      state_name: [null, Validators.required],
      // stateCode: [null, Validators.required],
      country_id: [null, Validators.required],
    });
    
    this.getStateData();
     this.getCountryData();
  }

  get f() { return this.form.controls; }

  getStateData() {
    this.isNotFound = true;
    this.masterService.getStateData().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.stateCount = res;
      this.stateData = res.result;
          //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.stateData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
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

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      if (this.form.value.country_id !== null) {
        var countryVal = this.countryData.filter((item: any) => {
          return item.country_id == this.form.value.country_id;
        });
        this.form.value.country_id = countryVal[0]['country_id'];
      }
      else {
        this.form.value.country_id = null;
      } 

      let params = {
        country_id: this.form.value.country_id,
        state_name: this.form.value.state_name,
        // code: this.form.value.stateCode.toUpperCase(),
      };
      // let apiLink = '/master/state/createState';
      this.apiService.createMasterState( params).subscribe((res:any) => {
        console.log(res);
        
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.getStateData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error:any) => {
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
     }
  }
}

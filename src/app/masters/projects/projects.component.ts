import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  form!: FormGroup;  
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any = [];
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country:any;
  limits: any = [];
  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      customer_name: [null, Validators.required],
      project_name: [null, Validators.required],
      project_type: [null, Validators.required],
      proj_manager: [null, [Validators.required]] ,
      priority: [null, Validators.required],
      budget:[null],
      hours: [null],  
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
     
    });

    this.getCompanyData();
    this.getCompanyType();
    this.getCountryData();
    
  }

  createForm(){
    console.clear();
    this.button = 'Create';
    
    
    this.update = false;
    this.form.reset();
  }

   getDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
     
        this.form.patchValue({
          customer_name: this.custDetails.customer_name,
          project_name: this.custDetails.project_name,
          project_type: this.custDetails.project_type,
          proj_manager: this.custDetails.proj_manager,
          priority: this.custDetails.priority,
          budget: this.custDetails.budget,
          hours: this.custDetails.hours,
          start_date: this.custDetails.start_date,
          end_date: this.custDetails.end_date,
         
          
        }); 
        this.form.controls['country_id'].setValue(this.custDetails.country_id);
        this.form.controls['state_id'].setValue(this.custDetails.state_id);
        this.form.controls['district_id'].setValue(this.custDetails.district_id);
        setTimeout(() => {
          this.getStateData();
          this.getDistrictData();
        }, 500);
  })
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
  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }
  
  getStateData() {
    let countrydata = this.form.value.country_id;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
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

  getCompanyType() {
    this.apiService.getCompData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }
  
  getCompanyData() {
    this.isNotFound = false;
    this.companyData = [];
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status === 200) {
        this.companyData = res.result;
        this.isNotFound = false;
        this.limits.push({ key: 'ALL', value: this.companyData.length });
      } else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning("Looks like no data available.");
      }
    }, error => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.warning("Error: Unknown Error!");
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
       //1-passing Country id
       if (this.form.value.country_id !== null) {
        var countryVal = this.countryData.filter((item: any) => {
          return item.country_id == this.form.value.country_id;
        });
        this.form.value.country_id = countryVal[0]['country_id'];
      }
      else {
        this.form.value.country_id = null;
      } 
    
       //2-passing State id
       if (this.form.value.state_id != '') {
        if (this.form.value.state_id) {
          var stat = this.stateData.filter((item: any) => {
            return item.state_id == this.form.value.state_id;
          });
          this.form.value.state_id = stat[0]['state_id'];
        }
      } else {
        this.form.value.state_id = null;
      }
       //3-passing District id
       if (this.form.value.district_id != '') {
        if (this.form.value.district_id) {
          var distt = this.districtData.filter((item: any) => {
            return item.district_id == this.form.value.district_id;
          });
          this.form.value.district_id = distt[0]['district_id'];
        }
      } else {
        this.form.value.district_id = null;
      }
      //4-passing Company type id
    
      if (this.form.value.company_type !== null) {
        var countryType = this.compData.filter((item: any) => {
          return item.mstcompanytype == this.form.value.company_type;
        });
        this.form.value.company_type = countryType[0]['mstcompanytype_id'];
      }
      else {
        this.form.value.company_type = null;
      } 
  
     
        this.loading = true;
    if (this.update) {  
      this.companyUpdate();
    } else {
      this.createCompany();
    }
    }
  }

  createCompany() {
    this.apiService.createCompany(this.form.value).subscribe((res: any) => {
     let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.getCompanyData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      })
  }
  companyUpdate(): void {
    // this.opac=0;
    // this.loadermsg="Updating..."
     this.form.value.company_id =  this.custDetails.company_id;
    this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
       this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('cancel')?.click();
      this.alertService.success('Company Updated Successfully');
    } else {
      this.alertService.error('Something went wrong please try again');
    }
  });
  }
}

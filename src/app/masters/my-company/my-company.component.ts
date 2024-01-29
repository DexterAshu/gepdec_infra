import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css']
})
export class MyCompanyComponent {
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
  val: any;
  country:any;
  limits: any;
  isExcelDownload: boolean = false;
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
      // companyId: [null, Validators.required],
      name: [null, Validators.required],
      company_name: [null, Validators.required],
      company_type: [null, Validators.required],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gst: [null, [Validators.required]] ,
      pan: [null, Validators.required],
      cinNo:[null, Validators.required],
      doi: [null, Validators.required],  
      area: [null, Validators.required],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      websiteUrl: [null],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });

    this.getCompanyData();
    this.getCompanyType();
    this.getCountryData();
    
  }

  createForm(){
    console.clear();
    this.button = 'Create';
    console.log( this.button);
    
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
          name: this.custDetails.name,
          company_name: this.custDetails.company_name,
          company_type: this.custDetails.company_type,
          contactno1: this.custDetails.contactno1,
          contactno2: this.custDetails.contactno2,
          email: this.custDetails.email,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          cinNo: this.custDetails.cinNo,
          doi: this.custDetails.doi,
          area: this.custDetails.area,
          websiteUrl: this.custDetails.websiteUrl,
          pincode: this.custDetails.pincode,
          
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
    this.apiService.getCompanyData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }

  // getCompanyType() {
  //   this.apiService.getCompData().subscribe((res:any) => {
  //     if (res.status === 200) {
  //       this.compData = res.result;
  //     } else {
  //       this.alertService.warning("Looks like no data available in type.");
  //     }
  //   });
  // }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
      this.limits.push({ key: 'ALL', value: this.companyData.length });
      this.isExcelDownload = true;
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
  
      //passing all values
      if (this.form.value.company_name != '') {
        this.form.value.company_name == '';
      } else {
        this.form.value.company_name = null;
      }
    
      if (this.form.value.name != '') {
        this.form.value.name == '';
      } else {
        this.form.value.name = null;
      }
      if (this.form.value.contactno1 != '') {
        this.form.value.contactno1 == '';
      } else {
        this.form.value.contactno1 = null;
      }
      if (this.form.value.contactno2 != '') {
        this.form.value.contactno2 == '';
      } else {
        this.form.value.contactno2 = null;
      }
      if (this.form.value.email != '') {
        this.form.value.email == '';
      } else {
        this.form.value.email = null;
      }
      if (this.form.value.gst != '') {
        this.form.value.gst == '';
      } else {
        this.form.value.gst = null;
      }
      if (this.form.value.pan != '') {
        this.form.value.pan == '';
      } else {
        this.form.value.pan = null;
      }
      if (this.form.value.websiteUrl != '') {
        this.form.value.websiteUrl == '';
      } else {
        this.form.value.websiteUrl = null;
      }
      if (this.form.value.cinNo != '') {
        this.form.value.cinNo == '';
      } else {
        this.form.value.cinNo = null;
      }
      if (this.form.value.doi != '') {
        this.form.value.doi == '';
      } else {
        this.form.value.doi = null;
      }
      if (this.form.value.area != '') {
        this.form.value.area == '';
      } else {
        this.form.value.area = null;
      }
      if (this.form.value.pincode != '') {
        this.form.value.pincode == '';
      } else {
        this.form.value.pincode = null;
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

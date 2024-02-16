import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-company-contacts',
  templateUrl: './company-contacts.component.html',
  styleUrls: ['./company-contacts.component.css']
})
export class CompanyContactsComponent {
  form!: FormGroup;  
  p: number = 1;
  username1:any;
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
  design: any;
  departMent: any;
  inputValue: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      module_name: [null, Validators.required],
      company_name: [null, Validators.required],
      name: [null, Validators.required],
      usdg_id:[null, Validators.required],
      usdt_id:[null, Validators.required],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    
    });

   

    this.getCompanyData();
    this.getData();
  
    
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
          module_name: this.custDetails.module_name,
          contactno1: this.custDetails.contactno1,
          contactno2: this.custDetails.contactno2,
          email: this.custDetails.email,
          usdt_id: this.custDetails.usdt_id,
          usdg_id: this.custDetails.usdg_id,
        
        }); 
 
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
 

  getData() {
    this.apiService.getCompanyData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });

    this.masterService.getUserMaster().subscribe((res:any)=>{
    console.log(res);
    this.design = res.designation;
    this.departMent = res.department;

    
    })

  }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
      this.limits.push({ key: 'ALL', value: this.companyData.length });
      this.isExcelDownload = true;
    });
 
  }

  selfFun() {
    var inputElement = this.form.value.company_type;
    if (inputElement !== null) {
      if (inputElement === "Self" || inputElement === "4002") {
        document.getElementById('selfModel')?.click();
        // if (modal !== null) {
        //   modal.click();
        // }
      } 
    }
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

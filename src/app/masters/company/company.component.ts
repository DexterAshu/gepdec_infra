import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
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
  design: any;
  departMent: any;
  inputValue: any;
  contactDetails: any;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  addressDetails: any;
  rowData: any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      name: [null],
      company_name: [null, Validators.required],
      company_type: [null, Validators.required],
      contactno1: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gst: [null] ,
      pan: [null],
      doi: [null, Validators.required],  
      area: [null, Validators.required],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      city:[null],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      usdg_id:[null],
      usdt_id:[null],
      websiteurl:[null],
      cinno:[null],
      address_line1:[null],
      address_line2:[null],
      net_worth: [null],
      financialyear_id: [null],
      annual_turnover: [null]
    
    });
    this.getCompanyData();
    this.getData();
    this.getCountryData();
  }
   get f() { return this.form.controls; }


   getDetails(data:any){
    this.rowData = [];
    this.rowData = data;
   
  }
  getPatchDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
      this.contactDetails = res.result[0].contact[0];
      this.addressDetails = res.result[0].adderss[0];
      this.form.patchValue({
          company_name: this.custDetails.company_name.toUpperCase(),
          // company_type: this.custDetails.company_type,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          doi: this.custDetails.doi,
          websiteurl: this.custDetails.websiteurl,
          cinno:this.custDetails.cinno,
          city:this.addressDetails.city,
            //address-patch-details
          area: this.addressDetails.area,
          address_line1: this.addressDetails.address_line1,
          address_line2: this.addressDetails.address_line2,
          pincode: this.addressDetails.pincode,
          //contact-path data
          name: this.contactDetails.name,
          contactno1: this.contactDetails.contactno1,
          contactno2: this.contactDetails.contactno2,
          email: this.contactDetails.email,
          usdt_id: this.contactDetails.usdt_id,
          usdg_id: this.contactDetails.usdg_id,
        }); 
        this.form.controls['company_type'].setValue(this.custDetails.mstcompanytype_id);
        this.form.controls['country_id'].setValue(this.addressDetails.country_id);
        this.form.controls['state_id'].setValue(this.addressDetails.state_id);
        this.form.controls['district_id'].setValue(this.addressDetails.district_id);
        setTimeout(() => {
          this.getStateData();
          this.getDistrictData();
        }, 500);
  })
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
  getData() {
    this.apiService.getCompanyData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
      } else {
        this.alertService.warning(res.message);
      }
    });
    this.masterService.getUserMaster().subscribe((res:any)=>{
      if (res.status === 200) {
        this.design = res.designation;
        this.departMent = res.department;
      } else {
        this.alertService.warning(res.message);
      }
    })
  }

  getCompanyData() {
    this.isNotFound = false;
    this.companyData = [];
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status == 200) {
        this.isNotFound = false;
        this.companyData = res.result;
      }else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  // selfFun() {
  //   var inputElement = this.form.value.company_type;
  //   if (inputElement !== null) {
  //     if (inputElement === "Self" || inputElement === "4002") {
  //       document.getElementById('selfModel')?.click();
  //     } 
  //   }
  // }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }
  createForm(){
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }
  onSubmit() {
    if (this.form.valid) {
        this.isSubmitted = true;
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
        this.isSubmitted = false;
        this.getCompanyData();
        if (res.status == 200) {
          document.getElementById('cancel')?.click();
          this.alertService.success(res.message);
        } else if(res.status == 201) {
          this.alertService.error(res.message);
        }else{
          this.alertService.error('Error, Something went wrong please check');
        }
      }, (error) => {
        this.isSubmitted = false;
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: Unknown Error!");
      })
  }
  companyUpdate(): void {
     this.form.value.company_id =  this.custDetails.company_id;
     this.form.value.contact_id =  this.contactDetails.contact_id;
     this.form.value.address_id =  this.addressDetails.address_id;
     this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
       this.isSubmitted = false;
       if (res.status == 200) {
         this.getCompanyData();
         document.getElementById('cancel')?.click();
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
  }, (error) => {
    this.isSubmitted = false;
    document.getElementById('cancel')?.click();
    this.alertService.error("Error: Unknown Error!");
  });
  }

}

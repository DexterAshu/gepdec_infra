import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.css']
})
export class VendorMasterComponent {
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

  vendData: any;
  approvalData: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      ContactPerson: [null, Validators.required],
      VendorName: [null, Validators.required],
      VendorType: [null, Validators.required],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gst: [null, [Validators.required]] ,
      pan: [null, Validators.required],
      PaymentTerms:[null, Validators.required],
      BankName:[null, Validators.required],
      BankIFSC:[null, Validators.required],
      BankAccountNo:[null, Validators.required],
      PaymentMethods:[null, Validators.required],
      CreditLimit :[null, Validators.required],
      CreditRating :[null, Validators.required],
      PerformanceHistory :[null, Validators.required],
      ComplianceInformation  :[null, Validators.required],
      ApprovalStatus :[null, Validators.required],
      Address: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      tc:[null,Validators.required]
    });

    this.getCompanyData();
    this.GvendorType();
  }

  createForm(){
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
          ContactPerson: this.custDetails.ContactPerson,
          VendorName: this.custDetails.VendorName,
          VendorType: this.custDetails.VendorType,
          contactno1: this.custDetails.contactno1,
          contactno2: this.custDetails.contactno2,
          email: this.custDetails.email,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          Address: this.custDetails.Address,
          pincode: this.custDetails.pincode,
          PaymentTerms:this.custDetails.PaymentTerms,
          BankName:this.custDetails.BankName,
          BankIFSC:this.custDetails.BankIFSC,
          BankAccountNo:this.custDetails.BankAccountNo,
          PaymentMethods:this.custDetails.PaymentMethods,
          CreditLimit :this.custDetails.CreditLimit ,
          CreditRating :this.custDetails.CreditRating ,
          PerformanceHistory :this.custDetails.PerformanceHistory ,
          ComplianceInformation  :this.custDetails.ComplianceInformation  ,
          ApprovalStatus :this.custDetails.ApprovalStatus ,
          tc :this.custDetails.tc ,
        
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
  GvendorType() {
    this.apiService.getVendorType().subscribe((res:any) => {
      if (res.status === 200) {
        this.vendData = res.vendortype;
        this.approvalData = res.approvalstatus;
        console.log(this.vendData);
        console.log(this.approvalData);
        
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
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.warning("Error: Unknown Error!");
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      
      //passing Vendor type id
    
      // if (this.form.value.VendorType !== null) {
      //   var countryType = this.vendData.filter((item: any) => {
      //     return item.mstcompanytype == this.form.value.VendorType;
      //   });
      //   this.form.value.VendorType = countryType[0]['mstcompanytype_id'];
      // }
      // else {
      //   this.form.value.VendorType = null;
      // } 
  
      //passing all values
      if (this.form.value.VendorName != '') {
        this.form.value.VendorName == '';
      } else {
        this.form.value.VendorName = null;
      }
     

        this.loading = true;
    if (this.update) {  
      this.vendorUpdate();
    } else {
      this.createVendor();
    }
    }
  }

  createVendor() {
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
  vendorUpdate(): void {
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

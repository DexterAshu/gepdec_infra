import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

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
  contDetails: any;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  contactData: any;
  addressDetails: any;
  countryName:any;
  rowData: any;



  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      bidder_name: [null, Validators.required],
      companytype_id: [null, Validators.required],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gst: [null, [Validators.required]] ,
      pan: [null, Validators.required],
      doi: [null, Validators.required],
      area: [null, Validators.required],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      address_line1:[null],
      address_line2:[null],
      cinno:[null],
      url: [null],

    });

    this.getCompanyData();
    this.getCompanyType();
    this.getCountryData();

  }

  getDetails(data:any){
    this.rowData = [];
    this.rowData = data;

  }

   getPatchDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.ourcompanyDetails(data.bidder_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
      this.contDetails = res.result[0].contact[0];
      this.addressDetails = res.result[0].address[0];

        this.form.patchValue({
          bidder_name: this.custDetails.bidder_name,
          companytype_id: this.custDetails.companytype_id,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          cinno: this.custDetails.cinno,
          doi: this.custDetails.doi,
          url: this.custDetails.url,
          //address-patch-details
          area: this.addressDetails.area,
          address_line1: this.addressDetails.address_line1,
          address_line2: this.addressDetails.address_line2,
          pincode: this.addressDetails.pincode,
          //contact-patch details
          contactno1: this.contDetails.contactno1,
          contactno2: this.contDetails.contactno2,
          email: this.contDetails.email,
          name: this.contDetails.name,


        });
        this.form.controls['country_id'].setValue(this.addressDetails.country_id);
        this.form.controls['state_id'].setValue(this.addressDetails.state_id);
        this.form.controls['district_id'].setValue(this.addressDetails.district_id);
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
    const apiLink = `/mycompany/api/v1/getMyComapanyDropdown`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getCompanyData() {
    this.isNotFound = false;
    this.companyData = [];
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.companyData = res.result;
        this.isNotFound = false;
        this.limits.push({ key: 'ALL', value: this.companyData.length });
      } else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.warning("Error: Unknown Error!");
    });
  }


   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  createForm(){
    console.clear();
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
    this.apiService.ourcreateCompany(this.form.value).subscribe((res: any) => {
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
      }, (error) => {
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: Unknown Error!");
      })
  }
  companyUpdate(): void {
     this.form.value.bidder_id =  this.custDetails.bidder_id;
     this.form.value.contact_id =  this.contDetails.contact_id;
     this.form.value.address_id =  this.addressDetails.address_id;
    this.apiService.ourcompanyUpdation(this.form.value).subscribe((res: any) => {
      document.getElementById('cancel')?.click();
      this.getCompanyData();
      this.isSubmitted = false;
      if (res.status == 200) {
      this.alertService.success('Company Updated Successfully');
    } else {
      this.alertService.error('Something went wrong please try again');
    }
  }, (error) => {
    document.getElementById('cancel')?.click();
    this.alertService.error("Error: Unknown Error!");
  });
  }
}

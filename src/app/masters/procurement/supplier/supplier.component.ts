import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  p: number = 1;
  limit = environment.pageLimit;
  apiUrl = environment.apiUrl;
  form!: FormGroup;
  currentDate = new Date();
  searchText: any;
  isNotFound:boolean = false;
  isSubmitted:boolean = false;
  dataList:any;
  dataDropdownList:any;
  uploadFile:any;
  countryData:any;
  stateData:any;
  districtData:any;
  rowData:any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      supplierCode: [null, Validators.required],
      supplierName: [null, Validators.required],
      companyName: [null, Validators.required],
      gstNo: [null, Validators.required],
      gstDate: [null, Validators.required],
      panNo: [null, Validators.required],
      tanNo: [null, Validators.required],
      doi: [null, Validators.required],
      doiDoc: [null, Validators.required],
      category: [null, Validators.required],
      contactNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailID: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      bankName: [null, Validators.required],
      holderName: [null, Validators.required],
      accountNo: [null, Validators.required],
      branchName: [null, Validators.required],
      ifscCode: [null, Validators.required],
      accountType: [null, Validators.required],
      bankAddress: [null, Validators.required],
    });

    this.getDataList();
    this.getCountryData();
    this.getDropdownList();
  }

  get f() { return this.form.controls; }

  getCountryData() {
    this.countryData = [];
    this.stateData = [];
    this.districtData = [];
    this.form.controls['state'].reset();
    this.form.controls['district'].reset();
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.countryData = [];
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }
  
  getStateData() {
    this.stateData = [];
    this.districtData = [];
    this.form.controls['district'].reset();
    let countrydata = this.form.value.country;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.stateData = [];
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }
  
  getDistrictData() {
    this.districtData = [];
    let data = this.form.value.state;
    let dist = this.form.value.district;
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.districtData = [];
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }

  getDropdownList() {
    this.dataDropdownList = [];
    this.isNotFound = false;
    let apiLink = "/supplier/api/v1/getSupplierDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.dataDropdownList = res;
      } else {
        this.isNotFound = true;
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.dataDropdownList = undefined;
      this.alertService.error("Error: " + error.statusText)
    });
  }
  
  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/supplier/api/v1/getSupplierList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.dataList = res.result;
      } else {
        this.isNotFound = true;
        this.dataList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.dataList = undefined;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
  }

  profileUpload(event:any) {
    this.uploadFile = [];
    let file = event.target.files;
    let type = /(\.jpg|\.jpeg|\.png)$/i;
    if (type.exec(file[0].name)) {
      this.uploadFile = file[0];
    } else {
      this.form.controls['doiDoc'].setValue('');
      this.alertService.warning("Please choose only jpg, jpeg or png file!");
    }
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      this.isSubmitted = true;
      const formData = new FormData();
      formData.append('suppliercode', this.form.value.supplierCode.toUpperCase());
      formData.append('suppliername', this.form.value.supplierName);
      formData.append('company_name', this.form.value.companyName);
      formData.append('category_id', this.form.value.category);
      formData.append('gstno', this.form.value.gstNo.toUpperCase());
      formData.append('gstdate', this.form.value.gstDate);
      formData.append('panno', this.form.value.panNo.toUpperCase());
      formData.append('tanno', this.form.value.tanNo.toUpperCase());
      formData.append('doi', this.form.value.doi);
      formData.append('contactno', this.form.value.contactNo);
      formData.append('emailid', this.form.value.emailID);
      formData.append('address', this.form.value.address);
      formData.append('country_id', this.form.value.country);
      formData.append('state_id', this.form.value.state);
      formData.append('district_id', this.form.value.district);
      formData.append('pincode', this.form.value.pincode);
      formData.append('bank_id', this.form.value.bankName);
      formData.append('account_holder_name', this.form.value.holderName);
      formData.append('bankaccountno', this.form.value.accountNo);
      formData.append('branch_name', this.form.value.branchName);
      formData.append('bankifsc', this.form.value.ifscCode.toUpperCase());
      formData.append('accounttype_id', this.form.value.accountType);
      formData.append('bank_address', this.form.value.bankAddress);

      formData.append('attachment', this.uploadFile);

      let apiLink = '/supplier/api/v1/addSupplier';
      this.apiService.postDataFD(apiLink, formData).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.getDataList();
        this.isSubmitted = false;
        if (response.status == 200) {
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

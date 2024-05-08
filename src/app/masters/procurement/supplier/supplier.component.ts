import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  cityData:any;
  factoryStateData:any;
  factoryDistrictData:any;
  factoryCityData:any;
  rowData:any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      // supplierCode: [null, Validators.required],
      supplierName: [null, Validators.required],
      category: [null, Validators.required],
      categoryNo: [null],
      // companyName: [null, Validators.required],
      gstNo: [null],
      gstDate: [null],
      panNo: [null, Validators.required],
      tanNo: [null],
      techRating: [null, Validators.required],
      doi: [null, Validators.required],
      doiDoc: [null, Validators.required],

      headAddress: [null, Validators.required],
      headCountry: [null, Validators.required],
      headState: [null, Validators.required],
      headDistrict: [null, Validators.required],
      headCity: [null, Validators.required],
      headPincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      
      factoryAddress: [null, Validators.required],
      factoryCountry: [null, Validators.required],
      factoryState: [null, Validators.required],
      factoryDistrict: [null, Validators.required],
      factoryCity: [null, Validators.required],
      factoryPincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],

      bankDetails: this.formBuilder.array([]),
      contactDetails: this.formBuilder.array([]),
      documentDetails: this.formBuilder.array([]),
    });

    this.getDataList();
    this.getCountryData();
    this.getDropdownList();
    this.addAnotherRow('bankDetails');
    this.addAnotherRow('contactDetails');
    this.addAnotherRow('documentDetails');
  }

  get f() { return this.form.controls; }

  bank() : FormArray {  
    return this.form.get("bankDetails") as FormArray  
  }

  contact() : FormArray {  
    return this.form.get("contactDetails") as FormArray  
  }
  
  document() : FormArray {  
    return this.form.get("documentDetails") as FormArray  
  }

  newBank(): FormGroup {  
    return this.formBuilder.group({  
      bank_id: [null, Validators.required],
      account_holder_name: [null, Validators.required],
      bankaccountno: [null, Validators.required],
      branch_name: [null, Validators.required],
      bankifsc: [null, Validators.required],
      accounttype_id: [null, Validators.required],
      bank_address: [null, Validators.required],
    })  
  }  
  
  newContact(): FormGroup {  
    return this.formBuilder.group({  
      contactperson: [null, Validators.required],
      usdg_id: [null, Validators.required],
      contactno: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailid: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })  
  }  
  
  newDocument(): FormGroup {  
    return this.formBuilder.group({  
      name: [null],
      date: [null],
      uploadCertificate: [null],
      attachment: [null],
      // document: this.form.value.uploadFile == null ? true : false,
      // count: this.form.value.uploadFile == null ? this.form.value.uploadFile.length : 0,
      document: [null],
      count: [null],
    })  
  }  

  addAnotherRow(type: string) { 
    if(type === 'bankDetails') {
      this.bank().push(this.newBank());  
    } else if (type === 'contactDetails') {
      this.contact().push(this.newContact());  
    } else {
      this.document().push(this.newDocument());  
    }
  } 

  removeRow(i:number, type: string) { 
    if(type === 'bankDetails') {
      this.bank().removeAt(i);
    } else if(type === 'contactDetails') {
      this.contact().removeAt(i);
    } else {
      this.document().removeAt(i);
    }
  }

  getCountryData() {
    this.countryData = [];
    this.stateData = [];
    this.districtData = [];
    this.cityData = [];
    this.form.controls['headState'].reset();
    this.form.controls['headDistrict'].reset();
    this.form.controls['headCity'].reset();
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
    this.cityData = [];
    this.form.controls['headDistrict'].reset();
    this.form.controls['headCity'].reset();
    let countrydata = this.form.value.headCountry;
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
    this.cityData = [];
    this.form.controls['headCity'].reset();
    let data = this.form.value.headState;
    let dist = this.form.value.headDistrict;
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.districtData = [];
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }
  
  getCityData() {
    this.cityData = [];
    let dist = this.form.value.headDistrict;
    this.apiService.getCityData(dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.cityData = res.result;
      } else {
        this.cityData = [];
        this.alertService.warning(`Looks like no city available related to ${this.form.value.district}.`);
      }
    });
  }

  getFactoryStateData() {
    this.factoryStateData = [];
    this.factoryDistrictData = [];
    this.factoryCityData = [];
    this.form.controls['factoryDistrict'].reset();
    this.form.controls['factoryCity'].reset();
    let countrydata = this.form.value.factoryCountry;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.factoryStateData = res.result;
      } else {
        this.factoryStateData = [];
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }
  
  getFactoryDistrictData() {
    this.factoryDistrictData = [];
    this.factoryCityData = [];
    this.form.controls['factoryCity'].reset();
    let data = this.form.value.factoryState;
    let dist = this.form.value.factoryDistrict;
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.factoryDistrictData = res.result;
      } else {
        this.factoryDistrictData = [];
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }
  
  getFactoryCityData() {
    this.factoryCityData = [];
    let dist = this.form.value.factoryDistrict;
    this.apiService.getCityData(dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.factoryCityData = res.result;
      } else {
        this.factoryCityData = [];
        this.alertService.warning(`Looks like no city available related to ${this.form.value.district}.`);
      }
    });
  }

  getDropdownList() {
    this.dataDropdownList = [];
    let apiLink = "/supplier/api/v1/getSupplierDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.dataDropdownList = res;
      } else {
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
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
    let type = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    if (type.exec(file[0].name)) {
      this.uploadFile = file;
    } else {
      this.form.controls['doiDoc'].setValue('');
      this.alertService.warning("Please choose only jpg, jpeg, png or pdf file!");
    }
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files;
    const formArray = this.form.get('documentDetails') as FormArray;
  
    if (file && formArray) {
      const formGroup = formArray.controls[index] as FormGroup;
      formGroup.get('attachment')?.setValue(file);
    }
  }

  regType() {
    let regData = this.form.value.category;
    if(regData == '6004') {
      this.form.controls['categoryNo'].clearValidators();
      this.form.controls['categoryNo'].reset();
    } else {
      this.form.get('categoryNo')!.setValidators([Validators.required]);
      this.form.controls['categoryNo'].reset();
    }
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      this.isSubmitted = true;
      const formData = new FormData();
      // formData.append('suppliercode', this.form.value.supplierCode?.toUpperCase());
      formData.append('suppliername', this.form.value.supplierName);
      formData.append('category_id', this.form.value.category);
      formData.append('category_no', this.form.value.categoryNo);
      formData.append('gstno', this.form.value.gstNo == null ? null : this.form.value.gstNotoUpperCase());
      formData.append('gstdate', this.form.value.gstDate);
      formData.append('panno', this.form.value.panNo == null ? null : this.form.value.panNotoUpperCase());
      formData.append('tanno', this.form.value.tanNo == null ? null : this.form.value.tanNotoUpperCase());
      formData.append('doi', this.form.value.doi);
      formData.append('technicalrating_id', this.form.value.techRating);

      formData.append('address[0][addresstype_id]', '301');
      formData.append('address[0][country_id]', this.form.value.headCountry);
      formData.append('address[0][state_id]', this.form.value.headState);
      formData.append('address[0][district_id]', this.form.value.headDistrict);
      formData.append('address[0][city]', this.form.value.headCity);
      formData.append('address[0][pincode]', this.form.value.headPincode);
      formData.append('address[0][address]', this.form.value.headAddress);

      formData.append('address[1][addresstype_id]', '302');
      formData.append('address[1][country_id]', this.form.value.factoryCountry);
      formData.append('address[1][state_id]', this.form.value.factoryState);
      formData.append('address[1][district_id]', this.form.value.factoryDistrict);
      formData.append('address[1][city]', this.form.value.factoryCity);
      formData.append('address[1][pincode]', this.form.value.factoryPincode);
      formData.append('address[1][address]', this.form.value.factoryAddress);
      
      formData.append('documentname', this.uploadFile != null ? this.uploadFile[0].name : null);
      formData.append('attachment', this.uploadFile != null ? this.uploadFile[0] : null);
      formData.append('count', this.uploadFile != null ? this.uploadFile?.length : 0);
      formData.append('document', this.uploadFile != null ? "true" : "false");

      // this.form.value.bankDetails.forEach((bank:any, index:any) => {
      //   formData.append(`bank_id${index + 1}`, bank.bank_id);
      //   formData.append(`account_holder_name${index + 1}`, bank.account_holder_name);
      //   formData.append(`bankaccountno${index + 1}`, bank.bankaccountno);
      //   formData.append(`branch_name${index + 1}`, bank.branch_name);
      //   formData.append(`bankifsc${index + 1}`, bank.bankifsc);
      //   formData.append(`accounttype_id${index + 1}`, bank.accounttype_id);
      //   formData.append(`bank_address${index + 1}`, bank.bank_address);
      // });

      this.form.value.bankDetails.forEach((obj: any, index: any) => {
        Object.keys(obj).forEach(key => {
          formData.append(`bank[${index}][${key}]`, obj[key]);
        });
      });

      // this.form.value.contactDetails.forEach((contact: any, index: any) => {
      //   formData.append(`contactperson${index + 1}`, contact.contactperson);
      //   formData.append(`usdg_id${index + 1}`, contact.usdg_id);
      //   formData.append(`contactno${index + 1}`, contact.contactno);
      //   formData.append(`emailid${index + 1}`, contact.emailid);
      // });

      this.form.value.contactDetails.forEach((obj: any, index: any) => {
        Object.keys(obj).forEach(key => {
          formData.append(`contact[${index}][${key}]`, obj[key]);
        });
      });

      this.form.value.documentDetails.forEach((obj:any, index:any) => {
          formData.append(`certification[${index}][mstcertification_id]`, obj.name);
          formData.append(`certification[${index}][date]`, obj.date);
          formData.append(`certification[${index}][documentname]`, obj.attachment != null ? obj.attachment[0].name : null);
          formData.append('attachment', obj.attachment != null ? obj.attachment[0] : null);
          formData.append(`certification[${index}][count]`, obj.attachment != null ? obj.attachment?.length : 0);
          formData.append(`certification[${index}][document]`, obj.attachment != null ? "true" : "false");
      });

      // this.form.value.documentDetails.forEach((obj: any, index: any) => {
      //   Object.keys(obj).forEach(key => {
      //     formData.append(`certification[${index}][${key}]`, obj[key]);
      //   });
      // });

      let apiLink = '/supplier/api/v1/addSupplier';
      // let apiLink = '';
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

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService, AlertService } from 'src/app/_services';

@Component({
  selector: 'app-process1',
  templateUrl: './process1.component.html',
  styleUrls: ['./process1.component.css']
})
export class Process1Component implements OnInit {

  form!: FormGroup;
  uploadForm!: FormGroup;

  p: number = 1;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  phoneType = {id: '1', value: false}
  customerData: any;
  countryData: any;
  stateData: any;
  districtData: any = [];
  ecbData: any;
  circleData: any;
  districtList: any;
  stateList: any;
  panelNum: number = 1;
  isFormSubmitted: boolean = false;
  isUploadSubmitted: boolean = false;
  customerID: any = null;
  addressProof: any;
  idProof: any;
  bankProof: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      ecb: [null, Validators.required],
      circle: [null, Validators.required],
      connectionType: [null, Validators.required],
      load: [null, Validators.required],
      phase: [null, Validators.required],
      salution: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      fatherName: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null,[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsAppNo: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      isWhatsAppNo: [false],
      countryCustomer: [null, Validators.required],
      stateCustomer: [null, Validators.required],
      districtCustomer: [null, Validators.required],
      pinCode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      address1: [null, Validators.required],
      address2: [null, Validators.required],
      bankName: [null, Validators.required],
      accountType: [null, Validators.required],
      ifsc: [null, Validators.required],
      accountNo: [null, Validators.required],
      branch: [null, Validators.required],
    });

    this.uploadForm = this.formBuilder.group({
      addressType: [null, Validators.required],
      addressUpload: [null, Validators.required],
      addressNo: [null, Validators.required],
      idType: [null, Validators.required],
      idUpload: [null, Validators.required],
      idNo: [null, Validators.required],
      bankType: [null, Validators.required],
      bankUpload: [null, Validators.required],
    });

    // this.getCustomerData();
    // this.getCountryData();
  }


  next() {
    if (this.panelNum < 2) this.panelNum++; else this.panelNum = 2;
  }

  prev() {
   if (this.panelNum > 1) this.panelNum--; else this.panelNum = 1;
  }

  get f() { return this.form.controls; }

  // getCountryData() {
  //   this.countryData = [];
  //   let apiLink = "/master/market/getMarket"
  //   this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.countryData = res.data;
  //     } else {
  //       this.alertService.warning("Looks like no data available in country data.");
  //     }
  //   });
  // }

  // getStateData() {
  //   this.stateData = [];
  //   this.districtData = [];
  //   this.ecbData = [];
  //   this.circleData = [];
  //   this.f['state'].setValue(null);
  //   this.f['district'].setValue(null);
  //   this.f['ecb'].setValue(null);
  //   this.f['circle'].setValue(null);
  //   let data = {
  //     marketCode: this.form.value.country
  //   }
  //   let apiLink = "/master/state/getStatesByCountry"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.stateData = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no state available related to ${this.form.value.country}.`);
  //     }
  //   });
  // }

  // getDistrictData() {
  //   this.districtData = [];
  //   this.ecbData = [];
  //   this.circleData = [];
  //   this.f['district'].setValue(null);
  //   this.f['ecb'].setValue(null);
  //   this.f['circle'].setValue(null);
  //   let data = {
  //     stateCode: this.form.value.state
  //   }
  //   let apiLink = "/master/district/getDistrictByState"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.districtData = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
  //     }
  //   });
  // }

  // getECBData() {
  //   this.ecbData = [];
  //   this.circleData = [];
  //   this.f['ecb'].setValue(null);
  //   this.f['circle'].setValue(null);
  //   let data = {
  //     countryCode: this.form.value.country,
  //     stateCode: this.form.value.state,
  //     districtCode: this.form.value.district,
  //   }
  //   let apiLink = "/master/ecbMaster/getECBBystateCodeDistrictCode"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.ecbData = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no electricity board available related to ${this.form.value.district}.`);
  //     }
  //   });
  // }

  // getCircleData() {
  //   this.circleData = [];
  //   this.f['circle'].setValue(null);
  //   let data = {
  //     stateCode: this.form.value.state,
  //     districtCode: this.form.value.district,
  //     ecbCode: this.form.value.ecb,
  //   }
  //   let apiLink = "/master/circleMaster/getCircleBystateCodeDistrictCode"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.circleData = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no electricity board available related to ${this.form.value.ecb}.`);
  //     }
  //   });
  // }

  // Method For customer details start

  // getStateList() {
  //   this.stateList = [];
  //   this.districtList = [];
  //   this.f['stateCustomer'].setValue(null);
  //   this.f['districtCustomer'].setValue(null);
  //   let data = {
  //     marketCode: this.form.value.countryCustomer
  //   }
  //   let apiLink = "/master/state/getStatesByCountry"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.stateList = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no state available related to ${this.form.value.country}.`);
  //     }
  //   });
  // }

  // getDistrictList() {
  //   this.districtList = [];
  //   this.f['districtCustomer'].setValue(null);
  //   let data = {
  //     stateCode: this.form.value.stateCustomer
  //   }
  //   let apiLink = "/master/district/getDistrictByState"
  //   this.apiService.postData(apiLink, data).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.districtList = res.data;
  //     } else {
  //       this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
  //     }
  //   });
  // }

  // Method For customer details end

  ch(e: any){
    if(e.checked){
      var phoneval = this.form.controls["contact"].value;
      this.form.controls["whatsAppNo"].setValue(phoneval);
    }
    else{
      this.form.controls["whatsAppNo"].setValue('');
    }
  }

  // getCustomerData() {
  //   this.isNotFound = true;
  //   let apiLink = "/master/customerMaster/getCustomer";
  //   this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //     this.isNotFound = false;
  //     this.customerData = [];
  //     if (res.status === true) {
  //       // this.meterData = res.data.filter((data:any) => data.active == 'Y');
  //       this.customerData = res.data.filter((data:any) => data.stage == 1);

  //     } else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.customerData = [];
  //     this.isNotFound = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  onSubmit() {
    if (this.form.valid) {
      this.isFormSubmitted = true;
      let data = {
        countryCode: this.form.value.country,
        stateCode: this.form.value.state,
        districtCode: this.form.value.district,
        ecbCode: this.form.value.ecb,
        circleCode: this.form.value.circle,
        connectionType: this.form.value.connectionType,
        loadSantion: this.form.value.load,
        phase: this.form.value.phase,
        salution: this.form.value.salution,
        fName: this.form.value.firstName,
        lName: this.form.value.lastName,
        fatherName: this.form.value.fatherName,
        DOB: this.form.value.dob,
        emailID: this.form.value.email,
        contactNo: this.form.value.contact,
        whatsappNo: this.form.value.whatsAppNo,
        stage: '1',
        address: {
          country: this.form.value.countryCustomer,
          state: this.form.value.stateCustomer,
          district: this.form.value.districtCustomer,
          pincode: this.form.value.pinCode,
          address1: this.form.value.address1,
          address2: this.form.value.address2,
        },
        bankDetails: {
          bankName: this.form.value.bankName,
          accountType: this.form.value.accountType,
          IFSC: this.form.value.ifsc.toUpperCase(),
          accountNo: this.form.value.accountNo,
          branch: this.form.value.branch,
        }
      }

      // let apiLink = "/master/customerMaster/createCustomer";
      // this.apiService.postData(apiLink, data).subscribe((res:any) => {
      //   this.isFormSubmitted = false;
      //   this.customerData = [];
      //   if (res.status === true) {
      //     this.alertService.success("Customer Data added. Please upload required documents for Kyc!");
      //     this.customerID = res.id;
      //     this.getCustomerData();
      //     this.next();
      //   } else {
      //     document.getElementById('cancel')?.click();
      //     this.alertService.warning(res.message);
      //   }
      // }, error => {
      //   this.customerData = [];
      //   this.isFormSubmitted = false;
      //   document.getElementById('cancel')?.click();
      //   this.alertService.error("Error: " + error.statusText)
      // });
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  addKycDoc(a:any) {
    this.customerID = a._id;
    this.panelNum = 2;
  }

  addressProofUpload(event:any) {

    this.addressProof = [];
    let file = event.target.files;
    let type = /(\.jpg|\.jpeg|\.png)$/i;
    if (type.exec(file[0].name)) {
      let ext = file[0].name.slice(((file[0].name.lastIndexOf(".") - 1) >>> 0) + 2)
      let name = `addressProof.${ext}`;
      let blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      this.addressProof = new File([blob], name, { type: event.target.files[0].type });
    } else {
      this.uploadForm.controls['addressUpload'].setValue('');
      this.alertService.warning("Please choose only jpg, jpeg or png file!");
    }
  }

  idProofUpload(event:any) {
    this.idProof = [];
    let file = event.target.files;
    let type = /(\.jpg|\.jpeg|\.png)$/i;
    if (type.exec(file[0].name)) {
      let ext = file[0].name.slice(((file[0].name.lastIndexOf(".") - 1) >>> 0) + 2)
      let name = `idProof.${ext}`;
      let blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      this.idProof = new File([blob], name, { type: event.target.files[0].type });
    } else {
      this.uploadForm.controls['idUpload'].setValue('');
      this.alertService.warning("Please choose only jpg, jpeg or png file!");
    }
  }

  bankProofUpload(event:any) {
    this.bankProof = [];
    let file = event.target.files;
    let type = /(\.jpg|\.jpeg|\.png)$/i;
    if (type.exec(file[0].name)) {
      let ext = file[0].name.slice(((file[0].name.lastIndexOf(".") - 1) >>> 0) + 2)
      let name = `bankProof.${ext}`;
      let blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      this.bankProof = new File([blob], name, { type: event.target.files[0].type });
    } else {
      this.uploadForm.controls['bankUpload'].setValue('');
      this.alertService.warning("Please choose only jpg, jpeg or png file!");
    }
  }

  onUpload() {

    if(this.uploadForm.valid) {
      this.isUploadSubmitted = true;
      let uploadFiles:any = [];
      uploadFiles.push(this.addressProof, this.idProof, this.bankProof);
      const formData = new FormData();
      formData.append('addressType', this.uploadForm.value.addressType);
      formData.append('addressNo', this.uploadForm.value.addressNo);
      formData.append('idType', this.uploadForm.value.idType);
      formData.append('idNo', this.uploadForm.value.idNo);
      formData.append('bankType', this.uploadForm.value.bankType);
      formData.append('stage', '2');
      // formData.append('addressUpload', this.uploadForm.value.addressUpload);
      uploadFiles.forEach((el:any) => {
        formData.append("docs", el);
      });

      let apiLink = "/master/customerMaster/createCustomerNextStep/"+ this.customerID;
      this.apiService.postDataFD(apiLink, formData).subscribe((res:any) => {
        this.isFormSubmitted = false;
        document.getElementById('cancel')?.click();
        this.customerData = [];
        if (res.status === true) {
          // this.getCustomerData();
          this.prev();
          this.customerID = [];
          this.alertService.success("Kyc document uploaded successfully and send for approval.");
        } else {
          this.alertService.warning(res.message);
        }
      }, error => {
        this.customerData = [];
        this.isFormSubmitted = false;
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: " + error.statusText)
      });
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

}

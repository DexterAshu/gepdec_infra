import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {

  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  dataDropdownList: any;
  countryData: any;
  stateData: any;
  districtData: any;
  cityData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }
  
  ngOnInit(){
    this.form = this.formBuilder.group({
      addressFor: [null, Validators.required],
      billingAddress: [null, Validators.required],
      billingDetails: [null],
      code: [null, Validators.required],
      type: [null, Validators.required],
      address: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      city: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });

    this.getDataList();
    this.getCountryData();
    // this.getDropdownList()
  }

  get f() { return this.form.controls; }

  getCountryData() {
    this.countryData = [];
    this.stateData = [];
    this.districtData = [];
    this.cityData = [];
    this.form.controls['state'].reset();
    this.form.controls['district'].reset();
    this.form.controls['city'].reset();
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
    this.form.controls['district'].reset();
    this.form.controls['city'].reset();
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
    this.cityData = [];
    this.form.controls['city'].reset();
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
  
  getCityData() {
    this.cityData = [];
    let dist = this.form.value.district;
    this.apiService.getCityData(dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.cityData = res.result;
      } else {
        this.cityData = [];
        this.alertService.warning(`Looks like no city available related to ${this.form.value.district}.`);
      }
    });
  }

  // getDropdownList() {
  //   this.dataDropdownList = [];
  //   this.isNotFound = false;
  //   let apiLink = "/item/api/v1/getItemDropdown";
  //   this.apiService.getData(apiLink).subscribe((res:any) => {
  //     if (res.status === 200) {
  //       this.isNotFound = false;
  //       this.dataDropdownList = res;
  //     } else {
  //       this.isNotFound = true;
  //       this.dataDropdownList = undefined;
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.isNotFound = true;
  //     this.dataDropdownList = undefined;
  //     this.alertService.error("Error: Unknown Error!")
  //   });
  // }

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    // let apiLink = "/item/api/v1/getItemList";
    let apiLink = "";
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
      // this.alertService.error("Error: Unknown Error!")
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        // basePrice: this.form.value.basePrice,
        // gst: this.form.value.gst,
        // freightRate: this.form.value.freightRate,
        // packingCharges: this.form.value.packingCharges,
        // otherCharges: this.form.value.otherCharges,
      } 

      // let apiLink = '/Item/api/v1/addItem';
      let apiLink = '';
      this.apiService.postData(apiLink, data).subscribe(res => {
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
          // this.alertService.error("Error: Unknown Error!");
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-price-structure',
  templateUrl: './price-structure.component.html',
  styleUrls: ['./price-structure.component.css']
})
export class PriceStructureComponent {

  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  dataDropdownList: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      vendor: [null, Validators.required],
      item: [null, Validators.required],
      basePrice: [null, Validators.required],
      gst: [null, Validators.required],
      freightRate: [null, Validators.required],
      packingCharges: [null, Validators.required],
      otherCharges: [null, Validators.required],
    });

    this.getDataList();
    // this.getDropdownList()
  }

  get f() { return this.form.controls; }

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
  //     this.alertService.error("Error: " + error.statusText)
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
      // this.alertService.error("Error: " + error.statusText)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        basePrice: this.form.value.basePrice,
        gst: this.form.value.gst,
        freightRate: this.form.value.freightRate,
        packingCharges: this.form.value.packingCharges,
        otherCharges: this.form.value.otherCharges,
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
          // this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

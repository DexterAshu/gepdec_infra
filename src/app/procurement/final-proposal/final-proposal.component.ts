import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-final-proposal',
  templateUrl: './final-proposal.component.html',
  styleUrls: ['./final-proposal.component.css']
})
export class FinalProposalComponent {

  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound:boolean = false;
  dataList: any;
  rowData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit(){
    // this.form = this.formBuilder.group({
    //   addressFor: [null, Validators.required],
    //   billingAddress: [null, Validators.required],
    //   billingDetails: [null],
    //   code: [null, Validators.required],
    //   type: [null, Validators.required],
    //   address: [null, Validators.required],
    //   country: [null, Validators.required],
    //   state: [null, Validators.required],
    //   district: [null, Validators.required],
    //   city: [null, Validators.required],
    //   pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    // });

    this.getDataList();
    // this.getDropdownList()
  }

  get f() { return this.form.controls; }

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
      // this.alertService.error("Error: Unknown Error!");
    });
  }

  rowListData() {
    this.rowData = [];
    // this.rowData = row;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-meter-price',
  templateUrl: './meter-price.component.html',
  styleUrls: ['./meter-price.component.css']
})
export class MeterPriceComponent implements OnInit {

  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  priceData: any;
  isNotFound:boolean = false;
  isSubmitted:boolean = false;
  searchText: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: [null, Validators.required],
      type: [null, Validators.required],
      load: [null, Validators.required],
      area: [null, Validators.required],
      sAmount: [null, Validators.required],
      mAmount: [null, Validators.required],
      iPrice: [null, Validators.required],
    });

    this.getPriceData();
  }

  get f() { return this.form.controls; }

  getPriceData() {
    this.isNotFound = true;
    this.masterService.getMeterPricingData().subscribe((res:any) => {
      this.isNotFound = false;
      this.priceData = [];
      if (res.status === true) {
        // this.priceData = res.data.filter((data:any) => data.active == 'Y');
        this.priceData = res.data;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.priceData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
    
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        category: this.form.value.category,
        type: this.form.value.type,
        load: this.form.value.load,
        area: this.form.value.area,
        securityAmt: this.form.value.sAmount,
        meterAmt: this.form.value.mAmount,
        installationAmt: this.form.value.iPrice,
      };
      let apiLink = '/master/meterPricing/createMeterPricing';
      this.apiService.postData(apiLink, params).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == true) {
          this.getPriceData();
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

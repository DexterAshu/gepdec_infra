import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-process4',
  templateUrl: './process4.component.html',
  styleUrls: ['./process4.component.css']
})
export class Process4Component implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  customerData: any;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData() {
    this.isNotFound = true;
    // let apiLink = "/master/customerMaster/getCustomer";
    // this.apiService.getDataList(apiLink).subscribe((res:any) => {
    //   this.isNotFound = false;
    //   this.customerData = [];
    //   if (res.status === true) {
    //     // this.meterData = res.data.filter((data:any) => data.active == 'Y');
    //     this.customerData = res.data.filter((data:any) => data.stage == 4);
    //   } else {
    //     this.alertService.warning("Looks like no data available!");
    //   }
    // }, error => {
    //   this.customerData = [];
    //   this.isNotFound = false;
    //   this.alertService.error("Error: " + error.statusText)
    // });
  }

}

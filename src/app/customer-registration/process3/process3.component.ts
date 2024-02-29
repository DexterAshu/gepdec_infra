import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-process3',
  templateUrl: './process3.component.html',
  styleUrls: ['./process3.component.css']
})
export class Process3Component implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  customerData: any;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: ["",Validators.required],
      mode: ["",Validators.required],
      instrumentNo: ["",Validators.required],
      bankBranch: ["",Validators.required],
      bankName: ["",Validators.required],
      paymentDate: ["",Validators.required],  
      remarks: ["",Validators.required],
      validatedBy: [""],
      validatedOn: [""],
    });

    this.getCustomerData();
  }
  get f() { return this.form.controls; }

  onlyNumAllowed(event: { which: any; keyCode: any; }):boolean{
    const charCode = (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    return true;
  }

  getCustomerData() {
    this.isNotFound = true;
    // let apiLink = "/master/customerMaster/getCustomer";
    // this.apiService.getDataList(apiLink).subscribe((res:any) => {
    //   this.isNotFound = false;
    //   this.customerData = [];
    //   if (res.status === true) {
    //     // this.meterData = res.data.filter((data:any) => data.active == 'Y');
    //     this.customerData = res.data.filter((data:any) => data.stage == 3);  // for payment
    //   } else {
    //     this.alertService.warning("Looks like no data available!");
    //   }
    // }, error => {
    //   this.customerData = [];
    //   this.isNotFound = false;
    //   this.alertService.error("Error: " + error.statusText)
    // });
  }

  onSubmit(){
    
  }

}

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { MasterService } from 'src/app/_services/master.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-process2',
  templateUrl: './process2.component.html',
  styleUrls: ['./process2.component.css']
})
export class Process2Component implements OnInit {
  form!: FormGroup;
  currentdate = new Date();
  p: number = 1;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  customerData:any
  modelType: number = 0;
  rowData: any;
  storedData: any;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private datePipe: DatePipe
  ) { 
    this.storedData = this.masterService.getLocalStorage();
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      validatedBy: [null, Validators.required],
      validatedOn: [null, Validators.required],
      remarks: [null, Validators.required],
    });
    this.getCustomerData();
  }

  get f() { return this.form.controls; }

  resetForm() {
    this.form.reset();
    this.f['validatedBy'].setValue(this.storedData.loginName)
    this.f['validatedOn'].setValue(this.datePipe.transform(this.currentdate, 'dd/MM/yyyy hh:mm a'))
  }

  validateModel(v:number) {
    this.modelType = v;
    this.resetForm();
  }

  getCustomerData() {
    this.isNotFound = true;
    let apiLink = "/master/customerMaster/getCustomer";
    this.apiService.getDataList(apiLink).subscribe((res:any) => {
      this.isNotFound = false;
      this.customerData = [];
      if (res.status === true) {
        // this.meterData = res.data.filter((data:any) => data.active == 'Y');
        this.customerData = res.data.filter((data:any) => data.stage == 2);  // for approve
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.customerData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  rowDetail(row:any) {
    this.rowData = row;
  }

  onSubmit(){
    
  }

}

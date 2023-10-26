import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-customer-billing-data',
  templateUrl: './customer-billing-data.component.html',
  styleUrls: ['./customer-billing-data.component.css']
})
export class CustomerBillingDataComponent implements OnInit {
  form!: FormGroup;
  dateSelectForm!: FormGroup;
  selectOptionForm!: FormGroup;
   
  meterTableData=[
    {billNo:'01234', billDate:'01-01-2023', month:'Sep-23', amt:'11296', dueDate:'10-01-2023', unit:'1412', perChange:'19.86'},
    {billNo:'04234', billDate:'05-03-2023', month:'Jul-23', amt:'9424', dueDate:'11-03-2023', unit:'1309', perChange:'-6.57'},
    {billNo:'05234', billDate:'07-06-2023', month:'Aug-23', amt:'10472', dueDate:'14-06-2023', unit:'1178', perChange:'-10.01'},
    {billNo:'07234', billDate:'09-05-2023', month:'Jun-23', amt:'11208', dueDate:'18-05-2023', unit:'1401', perChange:'38.99'},
    {billNo:'08234', billDate:'03-07-2023', month:'May-23', amt:'8064', dueDate:'20-07-2023', unit:'1401', perChange:'38.99'},
    {billNo:'06234', billDate:'08-07-2023', month:'Apr-23', amt:'7768', dueDate:'23-07-2023', unit:'1008', perChange:'3.81'},
  ]

  barChart = [
    {
      "name": "Apr-23",
      "value": 2000
    },
    {
      "name": "May-23",
      "value": 4000
    },
    {
      "name": "Jun-23",
      "value": 6000
    },
    {
      "name": "Jul-23",
      "value": 8000
    },
    {
      "name": "Aug-23",
      "value": 10000
    },
    {
      "name": "Sep-23",
      "value": 12000
    },
    {
      "name": "Oct-23",
      "value": 14000
    },
    {
      "name": "Nov-23",
      "value": 16000
    },
    {
      "name": "Dec-23",
      "value": 18000
    }
  ];
  
  lineColor:any ={
    domain: ['#315CA4', '#FFA333', '#FFCC8F']
  }
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  // xAxisLabelLine: string = 'Months';
  // yAxisLabelLine: string = 'Amount';

  isSubmitted: boolean = false;
  stateData: never[] =[];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customerName: [null, Validators.required],
      meterSlNo: [null, Validators.required],
      electBoard: [null, Validators.required],
      consumerNo: [null, Validators.required],
      billMonth: [null, Validators.required],
      circle: [null, Validators.required],
      billingAddress: [null, Validators.required],
      premiseAddress: [null, Validators.required],
      state: [null, Validators.required],
      securityAmt: [null, Validators.required],
      sanctionLoad: [null, Validators.required],
      billNo: [null, Validators.required],
      billAmt: [null, Validators.required],
      billDate: [null, Validators.required],  
      dueDate: [null, Validators.required],
      discountDate: [null, Validators.required],
      amtBeforeDueDate: [null, Validators.required],
      amtAfterDueDate: [null, Validators.required],
      amtOutstanding: [null, Validators.required],
      amt: [null, Validators.required],
      
    });

    this.dateSelectForm = this.formBuilder.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });

    this.selectOptionForm = this.formBuilder.group({
      selectVal: ["", Validators.required],
    });
    
  }
  
  get f() { return this.form.controls; }

  onSubmit(){

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-data-usage',
  templateUrl: './customer-data-usage.component.html',
  styleUrls: ['./customer-data-usage.component.css']
})
export class CustomerDataUsageComponent implements OnInit {
  dateSelectForm!: FormGroup;
  selectOptionForm!: FormGroup;
   
  meterTableData=[
    {month:'Sep-23', unit:'1412', perChange:'19.86'},
    {month:'Aug-23', unit:'1178', perChange:'-10.01'},
    {month:'Jul-23', unit:'1309', perChange:'-6.57'},
    {month:'Jun-23', unit:'1401', perChange:'38.99'},
    {month:'May-23', unit:'1401', perChange:'38.99'},
    {month:'Apr-23', unit:'1008', perChange:'3.81'},
    {month:'Mar-23', unit:'971', perChange:'3.78'},
  ]

  lineChart = [
    {
      "name": "2023",
      "series": [
        {
          "name": "Apr-23",
          "value": 400
        },
        {
          "name": "May-23",
          "value": 380
        },
        {
          "name": "Jun-23",
          "value": 650
        },
        {
          "name": "July-23",
          "value": 410
        },
        {
          "name": "Aug-23",
          "value": 530
        },
        {
          "name": "Sep-23",
          "value": 470
        },
        {
          "name": "Oct-23",
          "value": 580
        },
        {
          "name": "Nov-23",
          "value": 810
        },
      ]
    },
  ];
  lineColorScheme:any ={
    domain: ['#315CA4', '#FFA333', '#FFCC8F']
  }
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = 'Months';
  yAxisLabelLine: string = 'Amount';
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dateSelectForm = this.formBuilder.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });

    this.selectOptionForm = this.formBuilder.group({
      selectVal: ["", Validators.required],
    });
    
  }
  
}

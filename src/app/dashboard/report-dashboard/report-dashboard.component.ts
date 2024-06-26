import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, SharedService, MasterService } from 'src/app/_services';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import xrange from 'highcharts/modules/xrange';
xrange(Highcharts);

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  shoDataLabel: boolean = true;
  animations: boolean = true;
  fitContainer: boolean = false;
  view: any = [500, 250];
  showXAxis1 = true;
  showYAxis1 = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel1 = true;
  xAxisLabel = '';
  xAxisLabelProc = 'Number';
  showYAxisLabel1 = true;
  yAxisLabel = 'Number';
  yAxisLabelProc = '';
  timeline = true;
  showLabels = true;
  doughnut = true;

  //Financial graph data
  view2: any = [500, 250];
  showXAxis2 = true;
  showYAxis2 = true;
  gradient2 = false;
  showLegend2 = true;
  showXAxisLabel2 = true;
  xAxisLabel2 = '';
  showYAxisLabel2 = true;
  yAxisLabel2 = 'Data Value';

   // options
   legendf: boolean = true;
   showLabelsf: boolean = true;
   animationsf: boolean = true;
   xAxisf: boolean = true;
   yAxisf: boolean = true;
   showYAxisLabelf: boolean = true;
   showXAxisLabelf: boolean = true;
   xAxisLabelf: string = '';
   yAxisLabelf: string = 'Amount (Cr)';
  //  timelinef: boolean = true;
  


  
  financial = [
  {
  "name": "India",
  "value": 9200000
  },
  {
  "name": "Germany",
  "value": 8940000
  },
  {
  "name": "USA",
  "value": 5000000
  },
  {
  "name": "France",
  "value": 7200000
  } 
  
  
  ];
  isNotFound: boolean = false;
  finCount: any;
  financialData: any;
  
  single = [
    {
      "name": "Total",
      "value": 220
    },
    {
      "name": "Presales",
      "value": 60
    },
    {
      "name": "Design",
      "value": 40
    },
    {
      "name": "Procurement",
      "value": 20
    },
    {
      "name": "Warehouse",
      "value": 30
    },
    {
      "name": "Execution",
      "value": 20
    },
    {
      "name": "Quality",
      "value": 10
    },
    {
      "name": "Finance",
      "value": 20
    },
   
  
  ];
  projectStatus = [
    {
        "name": "Total",
        "value": 100,
        "percentage": "100%"
    },
    {
        "name": "Presales",
        "value": 60,
        "percentage": "60%"
    },
    {
        "name": "Design",
        "value": 40,
        "percentage": "40%"
    },
    {
        "name": "Procurement",
        "value": 20,
        "percentage": "20%"
    },
    {
        "name": "Warehouse",
        "value": 30,
        "percentage": "30%"
    },
    {
        "name": "Execution",
        "value": 20,
        "percentage": "20%"
    },
    {
        "name": "Quality",
        "value": 10,
        "percentage": "10%"
    },
    {
        "name": "Finance",
        "value": 20,
        "percentage": "20%"
    }
];

  
  presales = [
  {
    "name": "Total",
    "series": [
      {
        "name": "Rev",
        "value": 700
      },
      {
        "name": "Exp",
        "value": 200
      },
      {
        "name": "Profit",
        "value": 500
      },
    
     
    ]
  },
  
  {
    "name": "Q1",
    "series": [
      {
        "name": "Rev",
        "value": 900
      },
      {
        "name": "Exp",
        "value": 200
      },
      {
        "name": "Profit",
        "value": 700
      },
     
   
    ]
  },
  
  {
    "name": "Q2",
    "series": [
      {
        "name": "Rev",
        "value": 300
      },
      {
        "name": "Exp",
        "value": 100
      },
      {
        "name": "Profit",
        "value": 200
      },
     
    
    ]
  },
  {
    "name": "Q3",
    "series": [
      {
        "name": "Rev",
        "value": 600
      },
      {
        "name": "Exp",
        "value": 400
      },
      {
        "name": "Profit",
        "value": 200
      },
     
   
    ]
  },
  {
    "name": "Q4",
    "series": [
      {
        "name": "Rev",
        "value": 600
      },
      {
        "name": "Exp",
        "value": 310
      },
      {
        "name": "Profit",
        "value": 290
      },
    
    ]
  },
 
  
  ];
  Design = [
  {
    "name": "Total",
    "series": [
     
      {
        "name": "In-House",
        "value": 12
      },
      {
        "name": "3rd Party",
        "value": 8
      },
      {
        "name": "Total",
        "value": 20
      },
    ]
  },
  
  {
    "name": "Q1",
    "series": [
     
      {
        "name": "In-House",
        "value": 6
      },
      {
        "name": "3rd Party",
        "value": 14
      },
      {
        "name": "Total",
        "value": 20
      },
    ]
  },
  
  {
    "name": "Q2",
    "series": [
    
      {
        "name": "In-House",
        "value": 4
      },
      {
        "name": "3rd Party",
        "value": 7
      },
      {
        "name": "Total",
        "value": 11
      },
    
    ]
  },
  {
    "name": "Q3",
    "series": [
     
      {
        "name": "In-House",
        "value": 9
      },
      {
        "name": "3rd Party",
        "value": 13
      },
      {
        "name": "Total",
        "value": 22
      },
   
    ]
  },
  {
    "name": "Q4",
    "series": [
     
      {
        "name": "In-House",
        "value": 10
      },
      {
        "name": "3rd Party",
        "value": 15
      },
      {
        "name": "Total",
        "value": 25
      },
    
    ]
  },
 
  
  ];
 
  performancePDPEQ = [
    {
      "name": "Presales",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Completed",
          "value": 12
        },
       
      ]
    },
    
    {
      "name": "Design",
      "series": [
        {
          "name": "Total",
          "value": 12
        },
        {
          "name": "Completed",
          "value": 10
        },
     
      ]
    },
    
    {
      "name": "Proc",
      "series": [
        {
          "name": "Total",
          "value": 12
        },
        {
          "name": "Completed",
          "value": 8
        },
      
      ]
    },
    {
      "name": "Store",
      "series": [
        {
          "name": "Total",
          "value": 12
        },
        {
          "name": "Completed",
          "value": 7
        },
      ]
    },
    {
      "name": "Exec",
      "series": [
        {
          "name": "Total",
          "value": 12
        },
        {
          "name": "Completed",
          "value": 5
        },
      
      ]
    },
    {
      "name": "Quality",
      "series": [
        {
          "name": "Total",
          "value": 12
        },
        {
          "name": "Completed",
          "value": 5
        },
      
      ]
    },
   
    
    ];
  multi = [
    {
      "name": "Total",
      "series": [
        {
          "name": "Rev",
          "value": 700
        },
        {
          "name": "Exp",
          "value": 200
        },
        {
          "name": "Profit",
          "value": 500
        },
      
       
      ]
    },
    
    {
      "name": "Q1",
      "series": [
        {
          "name": "Rev",
          "value": 900
        },
        {
          "name": "Exp",
          "value": 200
        },
        {
          "name": "Profit",
          "value": 700
        },
       
     
      ]
    },
    
    {
      "name": "Q2",
      "series": [
        {
          "name": "Rev",
          "value": 300
        },
        {
          "name": "Exp",
          "value": 100
        },
        {
          "name": "Profit",
          "value": 200
        },
       
      
      ]
    },
    {
      "name": "Q3",
      "series": [
        {
          "name": "Rev",
          "value": 600
        },
        {
          "name": "Exp",
          "value": 400
        },
        {
          "name": "Profit",
          "value": 200
        },
       
     
      ]
    },
    {
      "name": "Q4",
      "series": [
        {
          "name": "Rev",
          "value": 600
        },
        {
          "name": "Exp",
          "value": 310
        },
        {
          "name": "Profit",
          "value": 290
        },
      
      ]
    },
   
    
    ];
  multi1 = [
  {
    "name": "Customer 1",
    "series": [
      {
        "name": "2022",
        "value": 7300
      },
      {
        "name": "2023",
        "value": 8940
      },
    
      {
        "name": "2025",
        "value": 10000
      },
    ]
  },
  
  {
    "name": "Customer 2",
    "series": [
      {
        "name": "2022",
        "value": 7870
      },
      {
        "name": "2023",
        "value": 8270
      },
    
      {
        "name": "2025",
        "value": 9070
      },
    ]
  },
  
  {
    "name": "Customer 3",
    "series": [
      {
        "name": "2022",
        "value": 5000
      },
      {
        "name": "2023",
        "value": 5800
      },
    
      {
        "name": "2025",
        "value": 7000
      },
    ]
  },
  
  
  ];
  
  lineChartFinance = [
  {
    "name": "Rev",
    "series": [
      {
        "name": "Total",
        "value": 1000
      },
      {
        "name": "Q1",
        "value": 490
      },
      {
        "name": "Q2",
        "value": 380
      },
      {
        "name": "Q3",
        "value": 550
      },
      {
        "name": "Q4",
        "value": 810
      },
     
    ]
  },

 
 
  {
    "name": "Exp",
    "series": [
      {
        "name": "Total",
        "value": 600
      },
     
      {
        "name": "Q1",
        "value": 390
      },
      {
        "name": "Q2",
        "value": 280
      },
      {
        "name": "Q3",
        "value": 400
      },
      {
        "name": "Q4",
        "value": 510
      },
     
    ]
  },
  {
    "name": "Profit",
    "series": [
      {
        "name": "Total",
        "value": 300
      },
     
      {
        "name": "Q1",
        "value": 190
      },
      {
        "name": "Q2",
        "value": 180
      },
      {
        "name": "Q3",
        "value": 200
      },
      {
        "name": "Q4",
        "value": 310
      },
     
    ]
  },
 
 
 
  ];
  lineChart = [
  {
    "name": "Bid",
    "series": [
      {
        "name": "Total",
        "value": 400,
      },
      {
        "name": "Q1",
        "value": 380
      },
      {
        "name": "Q2",
        "value": 350
      },
      {
        "name": "Q3",
        "value": 410
      },
      {
        "name": "Q4",
        "value": 530
      },
     
    ]
  },
  {
    "name": "Win",
    "series": [
      {
        "name": "Total",
        "value": 300
      },
      {
        "name": "Q1",
        "value": 440
      },
      {
        "name": "Q2",
        "value": 320
      },
      {
        "name": "Q3",
        "value": 510
      },
      {
        "name": "Q4",
        "value": 430
      },
    
    ]
  },
  {
    "name": "Loss",
    "series": [
      {
        "name": "Total",
        "value": 200
      },
      {
        "name": "Q1",
        "value": 340
      },
      {
        "name": "Q2",
        "value": 220
      },
      {
        "name": "Q3",
        "value": 510
      },
      {
        "name": "Q4",
        "value": 430
      },
    
    ]
  },
  ];
  
  pieData=[
  {
    "name": "0-30",
    "value": 4940
  },
  {
    "name": "31-60",
    "value": 5000
  },
  {
    "name": "61-90",
    "value": 7200
  },
  {
    "name": ">=91",
    "value": 2200
  },
  ];
  pieDataDesign=[
  
  {
    "name": "In-House",
    "value": 400
  },
  {
    "name": "3rd Party",
    "value": 300
  },
  {
    "name": "Pending",
    "value": 400
  },
 
  ];

  pieDataCust=[
  {
    "name": "Loss",
    "value": 400
  },
  {
    "name": "Bid",
    "value": 900
  },
  {
    "name": "Win",
    "value": 500
  },
  ];
  pieColorsCust:any = {
  domain: ['#660066', '#990099', '#6600FF']
  };
  lineColorScheme:any ={
  domain: ['#387df3' , '#FFBF00', '#FF7F50']
  }
  lineColorSchemeFinance:any ={
  domain: ['#2caffe' , '#544fc5', '#75efb3']
  }
  mainColorScheme:any ={
  domain: ['#43e943' ,'#fad73c','#9775dc']
  }
  total = this.performancePDPEQ.reduce((acc:any, item:any) => acc + item.value, 0);
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabelsPie: boolean = true;
  yAxisLabelBar: string = 'Number';
  xAxisLabelBar = '';
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = '';
  yAxisLabelLine: string = 'Number';
  colorSchemeOS:any ={
  domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = '';
  
  yAxisLabelBarLoad: string = 'No of Projects';
  xAxisLabelBarLoad = '';
  
  
  colorSchemeProcure:any ={
  domain: ['#43e943' ,'#fad73c','#9e3cfa']
  }
  colorSchemeLoadQuarter:any ={
  domain: ['#387df3' , '#FFBF00', '#FF7F50']
  }
  colorSchemeLoadQuarter1:any ={
  domain: ['#bca0f5' , '#b7cff9']
  }
  
  colorSchemeFin:any = {
  domain: ['#400030','#6b275a', '#ba3d5d', '#e16b5f', '#fe9085'],
  };
  
 
  colorScheme:any = {
    domain: ['#9370DB', '#87CEFA', '#5e96f7', '#FF7F50', '#90EE90', '#FA8072', '#fcbe53']
  };
 
  
  pieColorsOL:any = {
  domain: ['#6093E8', '#cf97ef', '#FFB761', '#A2D9FF']
  };
  
  pieColorsSegment:any = {
  domain: ['#008000', '#9933CC', '#FF3300']
  };
  pieColorsType:any = {
  domain: ['#9400D3', '#FF00FF', '#000080']
  };
  pieColorsAlarmType:any = {
  domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0', '#F5F559']
  };
  pieColorsProjRate:any = {
  domain: ['#57bb87', '#ed1c16']
  };


  data = [
    {'name' : "UP", 'value' : 20 },
    {'name' : "MP", 'value' : 10},
    {'name' : "Delhi", 'value' : 7},
    {'name': 'Maharashtra', 'value': 13},
    {'name': 'GOA', 'value': 8},
    {'name': 'Others', 'value': 15},

  ]

  colorSchemeState:any = {
    domain: ['#c7aaff', '#bfe4fc', '#b6cdf5', '#fac0ab', '#baffba', '#fdd099']
  };
  // #b996ff #9cd9ff #699efa #ff8c61

  bpColorScheme:any ={
    domain: ['#508df7', '#f38705','#f57445']
  }
  

   //bpDepartment wise
   bpshowXAxis = true;
   bpshowYAxis = true;
   bpshowXAxisLabel = true;
   bpshowYAxisLabel = true;
   bpshowLabelsPie: boolean = true;
   bpyAxisLabelBar: string = 'Amount (Cr)';
   bpxAxisLabelBar = '';
   bpshowXAxisLabelLine: boolean = true;
   bpshowYAxisLabelLine: boolean = true;
   bpxAxisLabelLine: string = 'Months';
   bpyAxisLabelLine: string = 'Amount';


   bpDepartment = [
    {
      "name": "Total",
      "series": [
        {
          "name": 'High',
          "value": 600,
        },
        {
          "name": 'Average',
          "value": 400,
        },
        {
          "name": 'Low',
          "value": 200,
        },
      ]
    },
    {
      "name": "Presales",
      "series": [
        {
          "name": 'High',
          "value": 100,
        },
        {
          "name": 'Average',
          "value": 50,
        },
        {
          "name": 'Low',
          "value": 50,
        },
      ]
    },
    {
      "name": "Design",
      "series": [
        {
          "name": 'High',
          "value": 200,
        },
        {
          "name": 'Average',
          "value": 150,
        },
        {
          "name": 'Low',
          "value": 50,
        },
      ]
    },
    {
      "name": "Procurement",
      "series": [
        {
          "name": 'High',
          "value": 150,
        },
        {
          "name": 'Average',
          "value": 50,
        },
        {
          "name": 'Low',
          "value": 100,
        },
      ]
    },
    {
      "name": "Store",
      "series": [
        {
          "name": 'High',
          "value": 300,
        },
        {
          "name": 'Average',
          "value": 250,
        },
        {
          "name": 'Low',
          "value": 50,
        },
      ]
    },
    {
      "name": "Execution",
      "series": [
        {
          "name": 'High',
          "value": 200,
        },
        {
          "name": 'Average',
          "value": 100,
        },
        {
          "name": 'Low',
          "value": 100,
        },
      ]
    },
    {
      "name": "Quality",
      "series": [
        {
          "name": 'High',
          "value": 400,
        },
        {
          "name": 'Average',
          "value": 260,
        },
        {
          "name": 'Low',
          "value": 140,
        },
      ]
    },
    {
      "name": "Finance",
      "series": [
        {
          "name": 'High',
          "value": 100,
        },
        {
          "name": 'Average',
          "value": 60,
        },
        {
          "name": 'Low',
          "value": 40,
        },
      ]
    },

  
  ];
  
  pieDataSegment=[
  {
    "name": "Wins",
    "value": 89400
  },
  {
    "name": "Losses",
    "value": 59000
  },
  {
    "name": "Abandoned",
    "value": 98000
  },
  ];
  pieDataType=[
  {
    "name": "Open",
    "value": 9400
  },
  {
    "name": "Close",
    "value": 5000
  },
  {
    "name": "Pending",
    "value": 6000
  },
  ];
  pieDataAlarmType=[
  {
    "name": 'New Leads',
    "value": 9400
  },
  {
    "name": 'Needs Analysis',
    "value": 9400
  },
  {
    "name": 'Deals Closed',
    "value": 5000
  },
  {
    "name": 'Qualification',
    "value": 6000
  },
  {
    "name": 'Offer Sent',
    "value": 6000
  },
  ];
  pieDataProjType=[
  {
    "name": "Completed",
    "value": 94
  },
  {
    "name": "Pending",
    "value": 6
  },
  ];

  changeData: any;
  form!: FormGroup;  
  countryData: any;
  stateData: any; 
  fiveYear: any;
  segmentData: any;
 

  
  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
  ) {
   
   }
  
  ngOnInit(): void {
    this.fiveYear = this.sharedService.lastFiveYears();
    this.getCountryData();
    this.getSegmentData();
    this.finYearData();

    this.form = this.formBuilder.group({
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
    })

  }
  
  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }
  
  StateData() {
    console.log(this.form.value.country_id);
    
    let countrydata = this.form.value.country_id;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res:any) => {
      
      
      this.isNotFound = false;
      if (res.status == 200) {
      this.finCount = res;
      this.financialData = res.result;
          //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: Unknown Error!")
    }); 
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  // onActivate(data:any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data:any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }



  
  
  getSegmentData() {
  this.segmentData = [];

  }

  Highcharts= new Chart({
    chart: {
        type: 'bar'
    },
    title: {
        text: '',
        align: 'left'
    },
 
    xAxis: {
        categories: ['Taldihi', 'Jaunpur', 'Noida Sec-45', 'Delhi', 'Noida'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
          text: ""
      },
      labels: {
          enabled: true, // Disable numeric labels on the y-axis
          overflow: 'justify'
      },
      gridLineWidth: 0,
     
  },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: 10,
      y: -10,
      floating: true,
      borderWidth: 1,
      // Ensure legend.backgroundColor is defined or use a default value
      backgroundColor: Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
     
      shadow: true
  },
    credits: {
        enabled: false
    },
    series: [{
      type: 'bar', // Specify the type of chart series
      name: 'Actual',
      
      data: [90, 80, 30, 20,70,]
    }, {
      type: 'bar', // Specify the type of chart series
      name: 'Target',
      data: [100, 100, 100, 100, 100]
    }],
    colors: [ '#f29524','#5b94f7' ] // Red, Green, Blue
   

});

//state wise data
statePie = new Chart({
  chart: {
    type: 'pie',
    width: 350, // Set the width
    height: 280, // Set the height
  },
  title: {
    text: ''
  },
  tooltip: {
    valueSuffix: '%'
  },
  credits: {
    enabled: false
},

  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: [{
        enabled: true,
        distance: 20
      } as Highcharts.DataLabelsOptions, {
        enabled: true,
        distance: -40,
        format: '{point.percentage:.0f}%',
        style: {
          fontSize: '.7em',
          textOutline: 'none',
          opacity: 0.7
        },
        filter: {
          operator: '>',
          property: 'percentage',
          value: 10
        }
      } as Highcharts.DataLabelsOptions]
    }
  },

  series: [{
    type: 'pie',
    name: 'Percentage',
    data: [
      { name: 'UP', y: 30 },
      { name: 'Bihar', y: 10 },
      { name: 'Maharashtra', y: 15 },
      { name: 'Goa', y: 10 },
      { name: 'New Delhi', y: 20},
      { name: 'Others', sliced: true, selected: true, y: 10 },
    ]
  }],
  colors: [
    '#bb9ff5',  '#b5d0ff',  
    '#ffc3ae',  '#7dabf9', '#aeddc5', '#f397ca'
],
  
});


LineChartGraph = new Chart({
  chart: {
      type: 'spline'
  },
  title: {
      text: ''
  },

  xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      accessibility: {
          description: ''
      }
  },
  yAxis: {
      title: {
          text: 'Amount (Cr)'
      },
      labels: {
          format: '{value}'
      }
  },
  tooltip: {
      // crosshairs: true,
      shared: true
  },
  plotOptions: {
      spline: {
          marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
          }
      }
  },
  credits: {
    enabled: false
},
  series: [{
      type: 'spline',
      name: 'Budget',
      marker: {
          symbol: 'square'
      },
      data: [500, 550, 600, 650, 700, 550, 600, {
          y: 600,
          
          accessibility: {
              description: ''
          }
      }, 500, 700, 300, 600]

  }, {
     type: 'spline',
      name: 'Expense',
      marker: {
          symbol: 'diamond'
      },
     
      data: [{
          y: 350,
         
          accessibility: {
              description: ''
          }
      }, 300, 400, 400, 500, 300, 200, 400, 200, 400, 200, 200]
  },
  {
    type: 'spline',
     name: 'Comparison',
     marker: {
         symbol: 'circle'
     },
    
     data: [{
         y: 150,
        
         accessibility: {
             description: ''
         }
     }, 250, 200, 250, 200, 250, 400, 200, 300, 300, 100, 400]
 }
]
});




scateredGraphPrject = new Chart({
  chart: {
      type: 'xrange'
  },
  title: {
      text: ''
  },
  accessibility: {
      point: {
          descriptionFormat: '{add index 1}. {yCategory}, {x:%A %e %B %Y}, {x2:%A %e %B %Y} to {x3:%A %e %B %Y},'
      }
  },
  credits: {
    enabled: false
},
  xAxis: {
      type: 'datetime'
  },
  yAxis: {
      title: {
          text: ''
      },
      categories: ['Taldihi', 'Jaunpur', 'Noida-sec45', 'Noida', 'Delhi'],
      reversed: true
  },
  series: [{
    type: 'xrange',
    name: 'Project',
    borderColor: '#f6f8fc',
    data: [{
            x: Date.UTC(2023, 10, 21),
            x2: Date.UTC(2024, 9, 2),
            y: 0,
            partialFill: {
                amount: 0.30,
                fill: '#07ad60'
            },
            color: '#d3e3fd' // Blue background color for this data point
        },
        {
            x: Date.UTC(2023, 11, 8),
            x2: Date.UTC(2024, 11, 15),
            y: 1,
            partialFill: {
                amount: 0.15,
                fill: '#07ad60'
            },
            color: '#d3e3fd' // Blue background color for this data point
        },
        {
            x: Date.UTC(2023, 11, 15),
            x2: Date.UTC(2024, 8, 25),
            y: 2,
            partialFill: {
                amount: 0.45,
                fill: '#07ad60'
            },
            color: '#d3e3fd' // Blue background color for this data point
        },
        {
            x: Date.UTC(2023, 11, 25),
            x2: Date.UTC(2024, 12, 5),
            y: 3,
            partialFill: {
                amount: 0.30,
                fill: '#07ad60'
            },
            color: '#d3e3fd' // Blue background color for this data point
        },
        {
            x: Date.UTC(2023, 12, 5),
            x2: Date.UTC(2024, 12, 20),
            y: 4,
            partialFill: {
                amount: 0.20,
                fill: '#07ad60'
            },
            color: '#d3e3fd', // Blue background color for this data point
        }
    ],
    dataLabels: {
        enabled: true
    }
}]


});

onChartSelect(event: any) {
  // Check the "name" property of the selected item
  const selectedName = event.series;

  // Conditionally navigate based on the selected name
  switch (selectedName) {
    case 'Presales':
      this.router.navigate(['/dashboard/presales-dashboard']);
      break;
    case 'Design':
      this.router.navigate(['/dashboard/design-dashboard']);
      break;
    case 'Proc':
      this.router.navigate(['/dashboard/procurement-dashboard']);
      break;
    case 'Store':
      this.router.navigate(['/dashboard/warehouse-dashboard']);
      break;
    case 'Exec':
      this.router.navigate(['/dashboard/execution-dashboard']);
      break;
    case 'Quality':
      this.router.navigate(['/dashboard/quality-dashboard']);
      break;
    case 'Fin':
      this.router.navigate(['/dashboard/fin-dashboard']);
      break;
    default:
      // Handle other cases if needed
      break;
  }
}

  
}

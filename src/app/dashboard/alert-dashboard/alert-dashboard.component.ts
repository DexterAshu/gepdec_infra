import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-alert-dashboard',
  templateUrl: './alert-dashboard.component.html',
  styleUrls: ['./alert-dashboard.component.css']
})
export class AlertDashboardComponent {
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
   yAxisLabelf: string = 'Value';
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
  onSelect(event:any) {
  
  }
  
  single = [
  {
    "name": "China",
    "value": 2243772
  },
  {
    "name": "USA",
    "value": 1126000
  },
  {
    "name": "Norway",
    "value": 296215
  },
  {
    "name": "Japan",
    "value": 257363
  },
  {
    "name": "Germany",
    "value": 196750
  },
  {
    "name": "France",
    "value": 204617
  }
  ];

  execution=[
  
    {
      "name": "Pending",
      "value": 8
    },
    {
      "name": "Completed",
      "value": 12
    },
   
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
  ProcurementGraph = [
  {
    "name": "Total",
    "series": [
     
      {
        "name": "PO",
        "value": 8
      },
      {
        "name": "Pending",
        "value": 4
      },
      {
        "name": "Total",
        "value": 12
      },
    ]
  },
  
  {
    "name": "Q1",
    "series": [
     
      {
        "name": "PO",
        "value": 8
      },
      {
        "name": "Pending",
        "value": 4
      },
      {
        "name": "Total",
        "value": 12
      },
    ]
  },
  
  {
    "name": "Q2",
    "series": [
    
      {
        "name": "PO",
        "value": 7
      },
      {
        "name": "Pending",
        "value": 7
      },
      {
        "name": "Total",
        "value": 14
      },
    
    ]
  },
  {
    "name": "Q3",
    "series": [
     
      {
        "name": "PO",
        "value": 12
      },
      {
        "name": "Pending",
        "value": 4
      },
      {
        "name": "Total",
        "value": 16
      },
   
    ]
  },
  {
    "name": "Q4",
    "series": [
     
      {
        "name": "PO",
        "value": 6
      },
      {
        "name": "Pending",
        "value": 6
      },
      {
        "name": "Total",
        "value": 12
      },   
    ]
  }, 
  ];

 
  Store = [
    {
      "name": "Total",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Pending",
          "value": 8
        },
        {
          "name": "Issued",
          "value": 12
        },
      ]
    },
    
    {
      "name": "Q1",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Pending",
          "value": 8
        },
        {
          "name": "Issued",
          "value": 12
        },
      ]
    },
    
    {
      "name": "Q2",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Pending",
          "value": 8
        },
        {
          "name": "Issued",
          "value": 12
        },
       
      
      ]
    },
    {
      "name": "Q3",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Pending",
          "value": 8
        },
        {
          "name": "Issued",
          "value": 12
        },
      ]
    },
    {
      "name": "Q4",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Pending",
          "value": 8
        },
        {
          "name": "Issued",
          "value": 12
        },
      
      ]
    },
   
    
    ];
    QualitySafety = [
    {
      "name": "Total",
      "series": [
        {
          "name": "Success",
          "value": 20
        },
        {
          "name": "Failure",
          "value": 14
        },
      ]
    },
    
    {
      "name": "Q1",
      "series": [
        {
          "name": "Success",
          "value": 17
        },
        {
          "name": "Failure",
          "value": 8
        },
      ]
    },
    
    {
      "name": "Q2",
      "series": [
        {
          "name": "Success",
          "value": 15
        },
        {
          "name": "Failure",
          "value": 3
        },
      ]
    },
    {
      "name": "Q3",
      "series": [
        {
          "name": "Success",
          "value": 14
        },
        {
          "name": "Failure",
          "value": 7
        },
      ]
    },
    {
      "name": "Q4",
      "series": [
        {
          "name": "Success",
          "value": 16
        },
        {
          "name": "Failure",
          "value": 7
        },
      
      ]
    },
   
    
    ];
    PerformanceData = [
    {
      "name": "Total",
      "series": [
        {
          "name": "Rev",
          "value": 20
        },
        {
          "name": "Exp",
          "value": 14
        },
      ]
    },
    
    {
      "name": "Q1",
      "series": [
        {
          "name": "Rev",
          "value": 17
        },
        {
          "name": "Exp",
          "value": 8
        },
      ]
    },
    
    {
      "name": "Q2",
      "series": [
        {
          "name": "Rev",
          "value": 15
        },
        {
          "name": "Exp",
          "value": 3
        },
      ]
    },
    {
      "name": "Q3",
      "series": [
        {
          "name": "Rev",
          "value": 14
        },
        {
          "name": "Exp",
          "value": 7
        },
      ]
    },
    {
      "name": "Q4",
      "series": [
        {
          "name": "Rev",
          "value": 16
        },
        {
          "name": "Exp",
          "value": 7
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
          "value": 10
        },
       
      ]
    },
    
    {
      "name": "Design",
      "series": [
        {
          "name": "Total",
          "value": 20
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
          "value": 20
        },
        {
          "name": "Completed",
          "value": 10
        },
      
      ]
    },
    {
      "name": "Store",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Completed",
          "value": 10
        },
      ]
    },
    {
      "name": "Exec",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Completed",
          "value": 10
        },
      
      ]
    },
    {
      "name": "Quality",
      "series": [
        {
          "name": "Total",
          "value": 20
        },
        {
          "name": "Completed",
          "value": 10
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
  pieDataProc=[
 
  {
    "name": "PO",
    "value": 12
  },
  {
    "name": "Pending",
    "value": 8
  },
  {
    "name": "Total",
    "value": 20
  },
 
  ];
  pieDataStore=[
  {
    "name": "Total",
    "value": 20
  },
  {
    "name": "Pending",
    "value": 8
  },
  {
    "name": "Issued",
    "value": 12
  },
 
  ];
  pieDataExe=[
  {
    "name": "AT Pending",
    "value": 4
  },
  {
    "name": "AT Success",
    "value": 8
  },
 
  ];
  pieDataQS=[
  {
    "name": "Success",
    "value": 20
  },
  {
    "name": "Failure",
    "value": 5
  },
 
  ];
  pieDataPerformance=[
  {
    "name": "Revenue",
    "value": 20
  },
  {
    "name": "Expenditure",
    "value": 12
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
  domain: ['#fd4747' , '#251ef7', '#069108']
  }
  lineColorSchemeFinance:any ={
  domain: ['#251ef7', '#f7f01e', '#069108']
  }
  mainColorScheme:any ={
  domain: ['#309d15' ,'#f7f01e','#251ef7']
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
  
  yAxisLabelBarLoad: string = 'Number';
  xAxisLabelBarLoad = '';
  colorSchemeStore:any ={
  domain: ['#a284e0', '#ff8d64', '#81f181']
  }
  colorSchemeQS:any ={
  domain: [ '#447f00','#fd4747']
  }
  colorSchemeProcure:any ={
  domain: ['#309d15' ,'#fad73c','#9e3cfa']
  }
  colorSchemeLoadQuarter:any ={
  domain: ['#135df0' , '#069108', '#f71616']
  }
  
  colorSchemeFin:any = {
  domain: ['#400030','#6b275a', '#ba3d5d', '#e16b5f', '#fe9085'],
  };
  
  colorSchemeExecution:any = {
  domain: ['#fad946', '#54ae3e']
  };
  colorScheme:any = {
  domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  colorSchemePerformance:any = {
  domain: ['#fd4747' , '#3f4fa9']
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
    { 'name' : "UP", 'value' : 15 },
    {'name' : "MP", 'value' : 10},
    {'name' : "Delhi", 'value' : 10},
    {'name' : "Bihar", 'value' : 16},
    {'name': 'Gujarat', 'value': 12},
    {'name': 'Goa', 'value': 18},
    {'name': 'Haryana', 'value': 12},
    {'name': 'Karnataka', 'value': 10},
    {'name': 'Maharashtra', 'value': 13},
    {'name': 'Punjab', 'value': 10},

  ]

  colorSchemeState:any = {
    domain: [ '#05d4eb','#009423', '#f7f705', '#f205c3', '#f5810c','#2216fa', '#70f205', '#9616f7', '#f74a53', '#6d7a14' ]
  };
 

  bpColorScheme:any ={
    domain: ['#069108', '#e5e500','#fd4747']
  }
  

   //bpDepartment wise
   bpshowXAxis = true;
   bpshowYAxis = true;
   bpshowXAxisLabel = true;
   bpshowYAxisLabel = true;
   bpshowLabelsPie: boolean = true;
   bpyAxisLabelBar: string = 'Value';
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
  ) { }
  
  ngOnInit(): void {
    this.fiveYear = this.sharedService.lastFiveYears();
    this.getCountryData();
    this.getSegmentData();

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
  
  
  getSegmentData() {
  this.segmentData = [];

  }}

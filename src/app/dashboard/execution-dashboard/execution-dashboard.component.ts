import { Component, OnInit } from '@angular/core';
import { AlertService, ApiService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css']
})
export class ExecutionDashboardComponent {
  fitContainer: boolean = false;
  view: any = [500, 250];
  showXAxis1 = true;
  showYAxis1 = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel1 = true;
  xAxisLabel = 'Country';
  showYAxisLabel1 = true;
  yAxisLabel = 'Sales';
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
  xAxisLabel2 = 'Country';
  showYAxisLabel2 = true;
  yAxisLabel2 = 'Data Value';
  
  colorSchemeExecution:any = {
    domain: ['#f38705', '#43e943']
    };
  
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
  
  multi = [
  {
    "name": "Product 1",
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
        "name": "2024",
        "value": 9300
      },
      {
        "name": "2025",
        "value": 10000
      },
    ]
  },
  
  {
    "name": "Product 2",
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
        "name": "2024",
        "value": 8570
      },
      {
        "name": "2025",
        "value": 9070
      },
    ]
  },
  
  {
    "name": "Product 3",
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
        "name": "2024",
        "value": 6000
      },
      {
        "name": "2025",
        "value": 7000
      },
    ]
  },
  {
    "name": "Product 4",
    "series": [
      {
        "name": "2022",
        "value": 6000
      },
      {
        "name": "2023",
        "value": 7800
      },
      {
        "name": "2024",
        "value": 9500
      },
      {
        "name": "2025",
        "value": 10000
      }
    ]
  },
  {
    "name": "Product 5",
    "series": [
      {
        "name": "2022",
        "value": 6200
      },
      {
        "name": "2023",
        "value": 7100
      },
      {
        "name": "2024",
        "value": 7900
      },
      {
        "name": "2025",
        "value": 8300
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
  
  lineChart = [
  {
    "name": "2022",
    "series": [
      {
        "name": "Jan",
        "value": 400
      },
      {
        "name": "Feb",
        "value": 380
      },
      {
        "name": "Mar",
        "value": 950
      },
      {
        "name": "Apr",
        "value": 410
      },
      {
        "name": "May",
        "value": 530
      },
      {
        "name": "Jun",
        "value": 670
      },
      {
        "name": "July",
        "value": 580
      },
      {
        "name": "Aug",
        "value": 810
      },
    ]
  },
  {
    "name": "2023",
    "series": [
      {
        "name": "Jan",
        "value": 300
      },
      {
        "name": "Feb",
        "value": 440
      },
      {
        "name": "Mar",
        "value": 620
      },
      {
        "name": "Apr",
        "value": 510
      },
      {
        "name": "May",
        "value": 430
      },
      {
        "name": "Jun",
        "value": 570
      },
      {
        "name": "July",
        "value": 610
      },
      {
        "name": "Aug",
        "value": 710
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
  pieDataCust=[
  {
    "name": "Commercial",
    "value": 89400
  },
  {
    "name": "Industrial",
    "value": 59000
  },
  {
    "name": "Residential",
    "value": 99000
  },
  ];
  pieColorsCust:any = {
  domain: ['#660066', '#990099', '#6600FF']
  };
  lineColorScheme:any ={
  domain: ['#315CA4', '#FFA333', '#FFCC8F']
  }
  mainColorScheme:any ={
  domain: ['#6093E8', '#315CA4']
  }
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabelsPie: boolean = true;
  yAxisLabelBar: string = 'Customers';
  xAxisLabelBar = 'Months';
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = 'Months';
  yAxisLabelLine: string = 'Amount';
  colorSchemeOS:any ={
  domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'Value';
  xAxisLabelBarLoad = 'Quarter Data';
  colorSchemeLoad:any ={
  domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0']
  }
  colorSchemeLoadQuarter:any ={
  domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0']
  }
  
  colorSchemeFin:any = {
  domain: ['#400030','#6b275a', '#ba3d5d', '#e16b5f', '#fe9085'],
  };
  
  colorScheme:any = {
  domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
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
  
  fiveYear: any;
  segmentData: any;
  constructor(
  private sharedService: SharedService,
  private apiService: ApiService,
  private alertService: AlertService
  ) { }
  
  ngOnInit(): void {
  this.fiveYear = this.sharedService.lastFiveYears();
  
  this.getSegmentData();
  }
  
  getSegmentData() {
  this.segmentData = [];
  // let apiLink = '/master/segmentMaster/getSegment';
  // this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //   if (res.status === true) {
  //     this.segmentData = res.data;
  //   } else {
  //     this.alertService.warning("No data available in Segment dropdown.");
  //   }
  // }, (error: any) => {
  //   console.error(error);
  //   this.segmentData = [];
  //   this.alertService.error("Error: Unknown Error!")
  // });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-design-dashboard',
  templateUrl: './design-dashboard.component.html',
  styleUrls: ['./design-dashboard.component.css']
})
export class DesignDashboardComponent {
  form!: FormGroup; 
  fitContainer: boolean = false;
  view: any = [500, 250];
  showXAxis1 = true;
  showYAxis1 = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel1 = true;
  xAxisLabel = '';
  showYAxisLabel1 = true;
  yAxisLabel = 'Value';
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
  animations :boolean =false;
  
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
  stateData: any;
  countryData: any;
  onSelect(event:any) {
  console.log(event);
  }

  pieDataDesign=[
  
    {
      "name": "Inhouse",
      "value": 30
    },
    {
      "name": "3rd Party",
      "value": 20
    },
    {
      "name": "Completed",
      "value": 15
    },
   
    {
      "name": "Pending",
      "value": 10
    },
   
    ];
  
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
  
  
  multi = [
    // {
    //   "name": "Total",
    //   "series": [
    //     {
    //       "name": "Total",
    //       "value": 50
    //     },
    //     {
    //       "name": "Participation",
    //       "value": 20
    //     },
    //     {
    //       "name": "Win",
    //       "value": 12
    //     },
    //     {
    //       "name": "Completed",
    //       "value": 8
    //     },
    //   ]
    // },
    
    {
      "name": "2021",
      "series": [
        {
          "name": "Total Drawings",
          "value": 20
        },
        {
          "name": "Inhouse",
          "value": 10
        },
        {
          "name": "3rd Party",
          "value": 5
        },
        {
          "name": "Completed",
          "value": 4
        },
      ]
    },
    
    {
      "name": "2022",
      "series": [
        {
          "name": "Total Drawings",
          "value": 10
        },
        {
          "name": "Inhouse",
          "value": 10
        },
        {
          "name": "3rd Party",
          "value": 5
        },
        {
          "name": "Completed",
          "value": 2
        },
      ]
    },
    {
      "name": "2023",
      "series": [
        {
          "name": "Total Drawings",
          "value": 10
        },
        {
          "name": "Inhouse",
          "value": 5
        },
        {
          "name": "3rd Party",
          "value": 5
        },
        {
          "name": "Completed",
          "value": 4
        },
      ]
    },
    {
      "name": "2024",
      "series": [
        {
          "name": "Total Drawings",
          "value": 10
        },
        {
          "name": "Inhouse",
          "value": 5
        },
        {
          "name": "3rd Party",
          "value": 5
        },
        {
          "name": "Completed",
          "value": 2
        },
      ]
    },
    
    ];
  multi1 = [
  {
    "name": "2020 - 2021",
    "series": [
      {
        "name": "Last Year",
        "value": 100
      },
      {
        "name": "Current Year",
        "value": 120
      },
    
     
    ]
  },
  
  {
    "name": "2021 - 2022",
    "series": [
      {
        "name": "Last Year",
        "value": 200
      },
      {
        "name": "Current Year",
        "value": 220
      },
    
    
    ]
  },
  
  {
    "name": "2022 - 2023",
    "series": [
      {
        "name": "Last Year",
        "value": 300
      },
      {
        "name": "Current Year",
        "value": 400
      },
    
     
    ]
  },
  {
    "name": "2023 - 2024",
    "series": [
      {
        "name": "Last Year",
        "value": 400
      },
      {
        "name": "Current Year",
        "value": 500
      },
    
     
    ]
  },
  
  
  ];

  Design = [
    // {
    //   "name": "Total",
    //   "series": [
       
    //     {
    //       "name": "In-House",
    //       "value": 12
    //     },
    //     {
    //       "name": "3rd Party",
    //       "value": 8
    //     },
    //     {
    //       "name": "Total",
    //       "value": 20
    //     },
    //   ]
    // },
    
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
  pieDataStateWise=[
    {
      "name": "UP",
      "value": 20
    },
    {
      "name": "Delhi",
      "value": 16
    },
   
    {
      "name": "Bihar",
      "value": 12
    },
    {
      "name": "Maharashtra",
      "value": 4
    },
    ]

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
  lineColorScheme1:any ={
    domain: ['#ff8c61' , '#699efa', '#9cd9ff' , '#b996ff']
    }
  mainColorScheme:any ={
    domain: ['#608bd7' ,'#80ccfd','#9775dc']
    }
  mainColorScheme2:any ={
    domain: ['#608bd7' ,'#80ccfd']
    }
    mainColorScheme1:any ={
      domain: ['#608bd7' ,'#80ccfd', '#3eaf3e','#9775dc']
      }

      colorSchemeLoadQuarter1:any ={
        domain: ['#9775dc' , '#7ccbfd', '#5783d0','#3eaf3e']
        }

        colorSchemeachiveTarget:any ={
          domain: ['#9775dc' , '#3eaf3e']
          }
        

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabelsPie: boolean = true;
  yAxisLabelBar: string = 'Value';
  xAxisLabelBar = '';
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = '';
  yAxisLabelLine: string = 'Value';
  colorSchemeOS:any ={
  domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'No of Drawings';
  xAxisLabelBarLoad = '';
  colorSchemeLoad:any ={
  domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0']
  }
  colorSchemeLoadQuarter:any ={
  // domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0']
  domain: ['#ff8c61', '#699efa', '#9cd9ff' , '#b996ff']
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



  targetlineChart = [
    {
      "name": "Target",
      "series": [
     
        {
          "name": "2020",
          "value": 300
        },
        {
          "name": "2021",
          "value": 250
        },
        {
          "name": "2022",
          "value": 200
        },
        {
          "name": "2023",
          "value": 450
        },
        {
          "name": "2024",
          "value": 600
        },
       
      ]
    },
   
    {
      "name": "Achievement",
      "series": [
      
        {
          "name": "2020",
          "value": 200,
        },
        {
          "name": "2021",
          "value": 230,
        },
        {
          "name": "2022",
          "value": 170,
        },
        {
          "name": "2023",
          "value": 400,
        },
        {
          "name": "2024",
          "value": 550,
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
  // let apiLink = '/master/segmentMaster/getSegment';
  // this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //   if (res.status === true) {
  //     this.segmentData = res.data;
  //   } else {
  //     this.alertService.warning("No data available in Segment dropdown.");
  //   }
  // }, error => {
  //   this.segmentData = [];
  //   this.alertService.error("Error: " + error.statusText)
  // });
  }
}

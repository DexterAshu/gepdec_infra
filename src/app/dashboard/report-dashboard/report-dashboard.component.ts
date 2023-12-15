import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  form!: FormGroup;  
  countryData: any;
  stateData: any; 
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


//tender graph data
  fitContainerT: boolean = false;
  viewTender: any;
  showXAxisT = true;
  showYAxisT = true;
  gradientT = true;
  showLegendT = true;
  showXAxisLabelT = true;
  xAxisLabelT = 'Tenders';
  showYAxisLabelT = true;
  yAxisLabelT = 'Values';
  timelineT = true;
  showLabelsT = true;
  doughnutT = true;
//performance graph data
  fitContainer: boolean = false;
    view: any ;
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
  console.log(event);
}

  tenderResult = [
    {
      "name": "All",
      "value": 2243772
    },
    {
      "name": "Participation",
      "value": 1126000
    },
    {
      "name": "Win's",
      "value": 796215
    },
    {
      "name": "Work In Progress",
      "value": 257363
    },
    {
      "name": "Completed",
      "value": 196750
    },
    {
      "name": "Losses",
      "value": 104617
    }
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

//department wise performance
  deptPerformance = [
    {
      "name": "Department Wise",
      "series": [
        {
          "name": "On-time Projects",
          "value": 19300,
          
        },
        {
          "name": "Delayed Projects",
          "value": 9940
        },
        {
          "name": "Late Projects",
          "value": 7940
        }
      ]
    },
  
   
  ];
  
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
      "name": "Warehouse",
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
    // {
    //   "name": "Performance",
    //   "series": [
    //     {
    //       "name": 'High',
    //       "value": 200,
    //     },
    //     {
    //       "name": 'Average',
    //       "value": 120,
    //     },
    //     {
    //       "name": 'Low',
    //       "value": 60,
    //     },
    //   ]
    // },
  
  ];
  multi = [
    {
      "name": "Jan",
      "series": [
        {
          "name": "2022",
          "value": 7300
        },
        {
          "name": "2023",
          "value": 8940
        }
      ]
    },
  
    {
      "name": "Feb",
      "series": [
        {
          "name": "2022",
          "value": 7870
        },
        {
          "name": "2023",
          "value": 8270
        }
      ]
    },
  
    {
      "name": "Mar",
      "series": [
        {
          "name": "2022",
          "value": 5000
        },
        {
          "name": "2023",
          "value": 5800
        }
      ]
    },
    {
      "name": "Apr",
      "series": [
        {
          "name": "2022",
          "value": 6000
        },
        {
          "name": "2023",
          "value": 7800
        }
      ]
    },
    {
      "name": "May",
      "series": [
        {
          "name": "2022",
          "value": 6200
        },
        {
          "name": "2023",
          "value": 7100
        }
      ]
    },
    {
      "name": "Jun",
      "series": [
        {
          "name": "2022",
          "value": 5800
        },
        {
          "name": "2023",
          "value": 6100
        }
      ]
    },
    {
      "name": "Aug",
      "series": [
        {
          "name": "2022",
          "value": 5300
        },
        {
          "name": "2023",
          "value": 4900
        }
      ]
    },
    {
      "name": "Sep",
      "series": [
        {
          "name": "2022",
          "value": 8900
        },
        {
          "name": "2023",
          "value": 7800
        }
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
          "value": 650
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
          "value": 470
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
  //company revenue
  pieDataRev=[
    {
      "name": "TOTAL",
      "value": 121000
    },
    {
      "name": "PBG",
      "value": 89400
    },
    {
      "name": "EMD",
      "value": 59000
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
  //company revanue
  pieColorsRevenue:any = {
    domain: ['#b3ef84', '#35b3f7', '#ba3d5d']
  };
  lineColorScheme:any ={
    domain: ['#315CA4', '#FFA333', '#FFCC8F']
  }
  //department wise projects
  departmentColorScheme:any ={
    domain: ['#58a540', '#e9ec16', '#ec1616']
  }
  mainColorScheme:any ={
    domain: ['#6093E8', '#315CA4']
  }
  bpColorScheme:any ={
    domain: ['#84c835', '#f6f66f','#fe5e5e']
  }
  //bpDepartment wise
  bpshowXAxis = true;
  bpshowYAxis = true;
  bpshowXAxisLabel = true;
  bpshowYAxisLabel = true;
  bpshowLabelsPie: boolean = true;
  bpyAxisLabelBar: string = 'Values';
  bpxAxisLabelBar = '';
  bpshowXAxisLabelLine: boolean = true;
  bpshowYAxisLabelLine: boolean = true;
  bpxAxisLabelLine: string = 'Months';
  bpyAxisLabelLine: string = 'Amount';
//data
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabelsPie: boolean = true;
  yAxisLabelBar: string = 'Values';
  xAxisLabelBar = '2023';
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = 'Months';
  yAxisLabelLine: string = 'Amount';
  colorSchemeOS:any ={
  domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'Load';
  xAxisLabelBarLoad = 'Months';
  colorSchemeLoad:any ={
    domain: ['#FFA333', '#CC66CC', '#FF3399']
  }

  colorSchemeFin:any = {
    domain: ['#400030','#6b275a', '#ba3d5d', '#e16b5f', '#fe9085'],
  };

  colorScheme:any = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //all tenders color
  colorTenderScheme:any = {
    domain: ['#9370DB', '#a7ebca', '#f5c78e', '#af8047', '#7d9c43', '#dc3545']
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
    domain: ['#9400D3', '#FFA500', '#000080']
  };
  pieColorsProjRate:any = {
    domain: ['#57bb87', '#ed1c16']
  };

  pieDataSegment=[
    {
      "name": "Completed",
      "value": 89400
    },
    {
      "name": "Inprogress",
      "value": 59000
    },
    {
      "name": "Neglected",
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
      "name": '7 days',
      "value": 9400
    },
    {
      "name": '21 days',
      "value": 5000
    },
    {
      "name": '28 days',
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
  
  onPieSliceSelect(event:any){   
    this.router.navigate(['/dashboard/procurement-dashboard'], {queryParams: {myGetParam: event.name}});
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

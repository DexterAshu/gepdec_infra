import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, SharedService } from 'src/app/_services';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-presales-dashboard',
  templateUrl: './presales-dashboard.component.html',
  styleUrls: ['./presales-dashboard.component.css']
})
export class PresalesDashboardComponent {
  form!: FormGroup; 
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
  countryData: any;
  stateData: any;
  
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
        "name": "Total",
        "value": 20
      },
      {
        "name": "Qualified",
        "value": 10
      },
      {
        "name": "Participated",
        "value": 6
      },
      {
        "name": "Win",
        "value": 4
      },
    ]
  },
  
  {
    "name": "2022",
    "series": [
      {
        "name": "Total",
        "value": 10
      },
      {
        "name": "Qualified",
        "value": 8
      },
      {
        "name": "Participated",
        "value": 6
      },
      {
        "name": "Win",
        "value": 4
      },
    ]
  },
  {
    "name": "2023",
    "series": [
      {
        "name": "Total",
        "value": 10
      },
      {
        "name": "Qualified",
        "value": 5
      },
      {
        "name": "Participated",
        "value": 2
      },
      {
        "name": "Win",
        "value": 2
      },
    ]
  },
  {
    "name": "2024",
    "series": [
      {
        "name": "Total",
        "value": 10
      },
      {
        "name": "Qualified",
        "value": 3
      },
      {
        "name": "Participated",
        "value": 2
      },
      {
        "name": "Win",
        "value": 2
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
    // {
    //   "name": "Ebitda",
    //   "series": [
       
    //     {
    //       "name": "2020",
    //       "value": 100
    //     },
    //     {
    //       "name": "2021",
    //       "value": 100
    //     },
    //     {
    //       "name": "2022",
    //       "value": 100
    //     },
    //     {
    //       "name": "2023",
    //       "value": 50
    //     },
    //     {
    //       "name": "2024",
    //       "value": 50
    //     },
      
    //   ]
    // },
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
      "name": "Participated",
      "value": 20
    },
    {
      "name": "Qualified",
      "value": 16
    },
   
    {
      "name": "Win",
      "value": 12
    },
    {
      "name": "Ebitda",
      "value": 4
    },
    ]
  pieColorsCust:any = {
  domain: ['#660066', '#990099', '#6600FF']
  };
  lineColorScheme:any ={
    domain: ['#5783d0', '#7ccbfd','#fe926a','#3eaf3e' ]
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
  xAxisLabelLine: string = '';
  yAxisLabelLine: string = 'Values (Cr)';
  colorSchemeOS:any ={
  domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'No of Projects';
  xAxisLabelBarLoad = '';
  colorSchemeLoad:any ={
  domain: ['#fd4747', '#ffc100', '#71c016' , '#476fb0']
  }
  colorSchemeLoadQuarter:any ={
    domain: ['#9775dc' , '#3eaf3e']
    }
  colorSchemeLoadQuarter1:any ={
    domain: ['#9775dc' , '#7ccbfd', '#5783d0','#fe926a']
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
  domain: ['#7ccbfd','#5783d0','#039651', '#e78d1b']
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
    "name": 'Participation',
    "value": 20
  },
  {
    "name": 'Win',
    "value": 12
  },
  {
    "name": 'Completed',
    "value": 8
  },
  {
    "name": 'Pending',
    "value": 4
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
  //   this.alertService.error("Error: Unknown Error!")
  // });
  }

  chart = new Chart({
    chart: {
      type: 'pie'
    },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '80%',
        size:'50%',
        borderWidth: 20,
        borderColor: '',
        slicedOffset: 10, // Corrected property name
        dataLabels: { // Corrected property name
          connectorWidth: 6,
        }
      }
    },
    title: 
    {
      verticalAlign: 'middle',
      floating: true,
      text: 'Presales',
    },
    series: [
      {
        type: 'pie',
        data: [
          { name: 'Qualified', y: 30, color: '#86d1ff' },
          { name: 'Participated', y: 20, color: '#628beb' },
          { name: 'Wins', y: 12, color: '#95f595' },
          { name: 'Under Participation', y: 4, color: '#ff8b60' },
          { name: 'Loss', y: 4, color: '#ff8d80' },
        ],
      }
    ],
  
    
  }); 
}

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, SharedService } from 'src/app/_services';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import xrange from 'highcharts/modules/xrange';
import { MasterService } from '../_services/master.service';
xrange(Highcharts);
// import {FilterPipe} from '../_pipes/filter.pipe';
import { environment } from 'src/environments/environment';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import { Point } from 'chart.js';

interface ProgressBarItem {
  tender_id: any;
  name: string;
  value: any; // Replace 'any' with the appropriate type, e.g., number, if known.
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  curve = shape.curveCardinal.tension(0);
  p: number = 1;
  limit = environment.pageLimit;
  p2: number = 1;
  p3: number = 1;
  limit2 = environment.pageLimit;
  shoDataLabel: boolean = true;
  animations: boolean = true;
  fitContainer: boolean = false;
  view: any = [500, 250];
  showXAxis1 = true;
  showYAxis1 = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel1 = true;
  xAxisLabel = '';
  xAxisLabelProc = 'Number';
  showYAxisLabel1 = true;

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
  // totalOccupied:any;
  helloData: any = [19, 80, 30, 20, 70, 90, 80, 30, 20, 40]
  // yAxisLabel2 = 'Data Value';
  arrayData=['Taldihi', 'Jaunpur', 'Noida Sec-45', 'SAIL', 'RECPDCL','RRVPNL Jaipur', 'BSPTCL Patna', 'PSTCL Patiala', 'UPPTCL', 'Noida']  // totalOccupied:any;



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
  categoryData: any;
  companyData: any;
  projectData: any;
  statusData: any;
  projectData2: any;
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
        // {
        //   "name": "Total",
        //   "value": 1000
        // },
        {
          "name": "2021",
          "value": 490
        },
        {
          "name": "2022",
          "value": 380
        },
        {
          "name": "2023",
          "value": 550
        },
        {
          "name": "2024",
          "value": 810
        },

      ]
    },



    {
      "name": "Exp",
      "series": [
        // {
        //   "name": "Total",
        //   "value": 600
        // },

        {
          "name": "2021",
          "value": 390
        },
        {
          "name": "2022",
          "value": 280
        },
        {
          "name": "2023",
          "value": 400
        },
        {
          "name": "2024",
          "value": 510
        },

      ]
    },
    {
      "name": "EBITDA",
      "series": [
        // {
        //   "name": "Total",
        //   "value": 300
        // },

        {
          "name": "2021",
          "value": 190
        },
        {
          "name": "2022",
          "value": 100
        },
        {
          "name": "2023",
          "value": 200
        },
        {
          "name": "2024",
          "value": 310
        },

      ]
    },
  ];
  
  totalOccupied: number = 1000;
  isPercentageSeries(seriesName: string): boolean {
    return seriesName === 'Rev' || seriesName === 'EBITDA';
  }
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

  pieData = [
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
  pieDataDesign = [

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

  pieDataCust = [
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

  lineColorScheme: any = {
    domain: ['#387df3', '#FFBF00', '#FF7F50']
  }
  lineColorSchemeFinance: any = {
    domain: ['#5e96f7', '#fcbe53', '#90EE90']
  }
  mainColorScheme: any = {
    domain: ['#43e943', '#fad73c', '#9775dc']
  }
  // total = this.performancePDPEQ.reduce((acc:any, item:any) => acc + item.value, 0);
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
  colorSchemeOS: any = {
    domain: ['#cee27d', '#63830c']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = '';

  yAxisLabelBarLoad: string = 'No of Projects';
  xAxisLabelBarLoad = '';


  colorSchemeProcure: any = {
    domain: ['#43e943', '#fad73c', '#9e3cfa']
  }
  colorSchemeLoadQuarter: any = {
    domain: ['#387df3', '#FFBF00', '#FF7F50']
  }
  colorSchemeLoadQuarter1: any = {
    domain: ['#bca0f5', '#b7cff9']
  }

  colorSchemeFin: any = {
    domain: ['#400030', '#6b275a', '#ba3d5d', '#e16b5f', '#fe9085'],
  };


  colorScheme: any = {
    domain: ['#9370DB', '#87CEFA', '#5e96f7', '#FF7F50', '#90EE90', '#FA8072', '#fcbe53']
  };


  pieColorsOL: any = {
    domain: ['#6093E8', '#cf97ef', '#FFB761', '#A2D9FF']
  };

  pieColorsSegment: any = {
    domain: ['#008000', '#9933CC', '#FF3300']
  };
  pieColorsType: any = {
    domain: ['#9400D3', '#FF00FF', '#000080']
  };
  pieColorsAlarmType: any = {
    domain: ['#fd4747', '#ffc100', '#71c016', '#476fb0', '#F5F559']
  };
  pieColorsProjRate: any = {
    domain: ['#57bb87', '#ed1c16']
  };


  data = [
    { 'name': "UP", 'value': 20 },
    { 'name': "MP", 'value': 10 },
    { 'name': "Delhi", 'value': 7 },
    { 'name': 'Maharashtra', 'value': 13 },
    { 'name': 'GOA', 'value': 8 },
    { 'name': 'Others', 'value': 15 },

  ]

  colorSchemeState: any = {
    domain: ['#c7aaff', '#bfe4fc', '#b6cdf5', '#fac0ab', '#baffba', '#fdd099']
  };
  // #b996ff #9cd9ff #699efa #ff8c61

  bpColorScheme: any = {
    domain: ['#508df7', '#f38705', '#f57445']
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

  pieDataSegment = [
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
  pieDataType = [
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
  pieDataAlarmType = [
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
  pieDataProjType = [
    {
      "name": "Completed",
      "value": 94
    },
    {
      "name": "Pending",
      "value": 6
    },
  ];

  // pie chart start
  // piecolorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  // pieColorsCust:Color = {
  //   domain: ['#4676C6', '#FFA333', '#cf97ef'],
  //   name: '',
  //   selectable: false,
  //   // group: ScaleType.Ordinal,
  // };
  pieColorsCust: any = {
    // domain: ['#660066', '#990099', '#6600FF']
    domain: [
      '#bb9ff5', '#b5d0ff',
      '#ffc3ae', '#7dabf9', '#aeddc5', '#f397ca'
    ]
  };
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';
  pieChartData = [
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
    },
    {
      "name": "UK",
      "value": 6200000
    }
  ];
  legendTitle: string = 'Location Wise Percentage'
  // pie chart end

  progressBarData = [
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
  changeData: any;
  form!: FormGroup;
  countryData: any;
  stateData: any;
  fiveYear: any;
  segmentData: any;
  projData: any;
  performanceTotal: number = 0;
  selectedDuration: number | null = null;
  selectedCategory: number | null = null;
  selectedCompany: number | null = null;
  selectedProject: number | null = null;
  dashboardData: any;
  performaceBar: any = [];
  // progressBar: any = [];
  progressBar: ProgressBarItem[] = [];
  allProgressBar: ProgressBarItem[] = [];
  pagedProgressBar: ProgressBarItem[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  yAxisLabel = 'Tender Title';
  xAxisLabel3 = '';
  yAxisLabel3 = 'Amount (Cr)';
  topFiveOrder: any[] = [];
  pieChartData2: any = [];
  loading: boolean = false;
  // lineBar chart start
  xAxis: boolean = true;
  yAxis: boolean = true;
  // showYAxisLabel: boolean = true;
  // showXAxisLabel: boolean = true;
  // xAxisLabel: string = 'Year';
  // yAxisLabel: string = 'Population';
  // timeline: boolean = true;
  budgetData = [
    {
      "name": "Budget",
      "series": [
        {
          "name": "Jan",
          "value": 700
        },
        {
          "name": "Feb",
          "value": 600
        },
        {
          "name": "Mar",
          "value": 900
        },
        {
          "name": "Apr",
          "value": 750
        },
        {
          "name": "May",
          "value": 700
        },
        {
          "name": "Jun",
          "value": 850
        },
        {
          "name": "Jul",
          "value": 800
        },
        {
          "name": "Aug",
          "value": 700
        },
        {
          "name": "Sep",
          "value": 850
        },
        {
          "name": "Oct",
          "value": 900
        },
        {
          "name": "Nov",
          "value": 950
        },
        {
          "name": "Dec",
          "value": 1000
        }
      ]
    },
    {
      "name": "Expense",
      "series": [
        {
          "name": "Jan",
          "value": 400
        },
        {
          "name": "Feb",
          "value": 900
        },
        {
          "name": "Mar",
          "value": 650
        },
        {
          "name": "Apr",
          "value": 900
        },
        {
          "name": "May",
          "value": 350
        },
        {
          "name": "Jun",
          "value": 1000
        },
        {
          "name": "Jul",
          "value": 400
        },
        {
          "name": "Aug",
          "value": 450
        },
        {
          "name": "Sep",
          "value": 950
        },
        {
          "name": "Oct",
          "value": 550
        },
        {
          "name": "Nov",
          "value": 1050
        },
        {
          "name": "Dec",
          "value": 650
        }
      ]
    }
  ];

  progressBar2: any;
  lineBarColorScheme: any = {
    // domain: ['#cee27d', '#63830c']
    // domain: ['#d6a974', '#97daa7']
    domain: ['#90EE90', '#FA8072']
  }
  // lineBar chart end
  tenderDetails: any[] = [];
  lineAreaChart: any = [];
  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.fiveYear = this.sharedService.lastFiveYears();
    this.getCountryData();
    this.getSegmentData();
    this.finYearData();
    // this.getFinancialData();
    this.getCompanyData();
    // this.getCategoryData();
    this.getCatgData();
    this.getStatusData();
    //     const defaultDuration: number | null = null;
    // const defaultCategory: number | null = null;
    // const defaultCompany: number | null = null;
    // this.getDashboardData(defaultDuration, defaultCategory, defaultCompany, null);
    this.getDashboardData(null, null, null, null, null, null);
    // this.getCompanyData();

    this.form = this.formBuilder.group({
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      duration: [null, Validators.required],
      category: [null, Validators.required],
      company: [null, Validators.required],
      project: [null, Validators.required],
    })
    this.getCountryData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  // Method to calculate completion percentage
  calculateCompletionPercentage(series: any[]): number {
    const completedValue = series.find(s => s.name === 'Completed').value;
    const totalValue = series.find(s => s.name === 'Total').value;
    return (completedValue / totalValue) * 100;
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res: any) => {
      if (res.status === 200) {
        this.countryData = res.result;
        const india = this.countryData.find((country: { name: string; }) => country.name === 'India');
        if (india) {
          this.form.patchValue({ country_id: india.country_id });
          this.StateData(); // Automatically fetch state data for India
        }
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }

  StateData() {
    console.log(this.form.value.country_id);

    let countrydata = this.form.value.country_id;
    // let statedata = null;
    this.apiService.getStateData(countrydata, null).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.financialData = res.result;
        // const currentDate = new Date();
        // const currentFinYear = this.financialData.find((f: any) => {
        //   const startDate = new Date(f.start_date);
        //   const endDate = new Date(f.end_date);
        //   return currentDate >= startDate && currentDate <= endDate;
        // });

        // if (currentFinYear) {
        //   this.form.patchValue({ duration: currentFinYear.financialyear_id });
        // }
      } else {
        this.alertService.warning("Looks like no financial year data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText);
    });
  }

  getCatgData() {
    this.isNotFound = true;
    this.masterService.getCategoryData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.categoryData = res.catagory;
      } else {
        this.alertService.warning("Looks like no category data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText);
    });
  }

  getCompanyData() {
    this.isNotFound = true;
    this.masterService.getCompData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.companyData = res.result.reverse();
        // const company = this.companyData.find((company: any) => company.bidder_name === 'Gepdec Infratech Limited');
        // if (company) {
        //   this.form.patchValue({ company: company.bidder_id });
        // }
      } else {
        this.alertService.warning("Looks like no company data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText);
    });
  }

  onDurationChange(event: any) {
    this.selectedDuration = event.target.value;
    this.callProjectApiIfReady();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.callProjectApiIfReady();
  }

  onCompanyChange(event: any) {
    this.selectedCompany = event.target.value;
    this.callProjectApiIfReady();
  }

  onProjectChange(event: any) {
    this.selectedProject = event.target.value;
    if (this.selectedProject) {
      this.getDashboardData(
        this.selectedDuration,
        this.selectedCategory,
        this.selectedCompany,
        this.selectedProject,
        this.form.value.state_id,
        this.form.value.country_id
      );
    }
  }

  callProjectApiIfReady() {
    if (this.selectedDuration !== null && this.selectedCategory !== null && this.selectedCompany !== null) {
      this.getProjData(this.selectedDuration, this.selectedCategory, this.selectedCompany);
    }
  }

  // callProjectApiIfReady() {
  //   if (this.selectedDuration === null) {
  //     this.alertService.warning("Please select a duration first.");
  //   } else if (this.selectedCompany === null) {
  //     this.alertService.warning("Please select a company.");
  //   } else if (this.selectedCategory === null) {
  //     this.alertService.warning("Please select a category.");
  //   } else {
  //     this.getProjData(this.selectedDuration, this.selectedCategory, this.selectedCompany);
  //   }
  // }

  getProjData(financialyearId: number, categoryId: number, companyId: number) {
    this.isNotFound = true;
    this.masterService.getProjectData(financialyearId, categoryId, companyId).subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.projectData = res.result;
      } else {
        this.alertService.warning("Looks like no project data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText);
    });
  }

  // ShortNumber(value: number): string {
  //   if (value >= 10000000) {
  //     return Math.floor(value / 10000000) + ' Cr';
  //   } else if (value >= 100000) {
  //     return Math.floor(value / 100000) + ' Lakh';
  //   } else {
  //     return Math.floor(value).toString();
  //   }
  // }


  ShortNumber(value: number, includeCr: boolean = true): string {
    if (value >= 10000000) {
      return Math.floor(value / 10000000) + (includeCr ? ' Cr' : '');
    } else if (value >= 100000) {
      return Math.floor(value / 100000) + ' Lakh';
    } else {
      return Math.floor(value).toString();
    }
  }

  formatNumber(value: number): string {
    if (value >= 10000000) {
      return Math.floor(value / 10000000) + ' Cr';
    } else if (value >= 100000) {
      return Math.floor(value / 100000) + ' Lac';
    } else {
      return value.toString();
    }
  }

  getIntegerValue(value: number): string {
    return Math.floor(value).toString();
  }

  //   getDashboardData() {
  //     this.isNotFound = true;
  //     this.loading = true;
  //     this.masterService.getDashboard().subscribe((res: any) => {
  //         this.isNotFound = false;
  //         this.dashboardData = [];
  //         if (res.status === 200) {
  //             this.loading = false;
  //             this.dashboardData = res;

  //             // Ensure topFiveTender is not null before using it
  //             if (res.topFiveTender) {
  //                 this.topFiveOrder = res.topFiveTender;
  //             }

  //             // Performance bar data mapping with null checks
  //             if (this.dashboardData.presalesData) {
  //                 this.performaceBar = this.dashboardData.presalesData.map((item: any) => {
  //                     return {
  //                         name: item.name,
  //                         series: item.series ? [
  //                             { name: 'Total', value: item.series[0]?.value ?? 0 },
  //                             { name: 'Completed', value: item.series[1]?.value ?? 0 }
  //                         ] : []
  //                     };
  //                 });
  //             }

  //             // Pie chart data mapping with null checks
  //             if (this.dashboardData.topFiveLocationWise) {
  //                 this.pieChartData2 = this.dashboardData.topFiveLocationWise.map((item: any) => {
  //                     return {
  //                         name: item.state_name,
  //                         value: item.state_count,
  //                     };
  //                 });
  //             }

  //             // Progress bar data mapping with null checks
  //             if (this.dashboardData.statusProgress) {
  //                 this.progressBar = this.dashboardData.statusProgress.map((item: any) => {
  //                     // Parse the progress string to a float value and handle null cases
  //                     // const progressValue = item.progress ? parseFloat(item.progress.replace('%', '')) : 0;
  //                     return {
  //                         name: item.tender_title,
  //                         value: item.duration,
  //                     };
  //                 });
  //                 this.progressBar2 = this.dashboardData.statusProgress; // Keeping original data for logging
  //                 console.log('progressBar2-->', this.progressBar2);
  //             }
  //         } else {
  //             this.alertService.warning("Looks like no data available!");
  //         }
  //     }, (error: any) => {
  //         console.error(error);
  //         this.dashboardData = [];
  //         this.isNotFound = false;
  //         this.loading = false;
  //         this.alertService.error("Error: " + error.statusText);
  //     });
  // }

    getDashboardData( duration: number | null, category: number | null, company: number | null, project: number | null, stateId: number | null, countryId: number | null) {
      // Construct URL with query parameters
      let apiUrl = `${environment.apiUrl}/dashboard/api/v1/getLandingDashboard`; // Change this to your actual API endpoint
      const queryParams: string[] = [];
      if (duration !== null) queryParams.push(`financialyear_id=${duration}`);
      if (category !== null) queryParams.push(`qacatagory_id=${category}`);
      if (company !== null) queryParams.push(`bidder_id=${company}`);
      if (project !== null) queryParams.push(`tender_id=${project}`);
      if (stateId !== null) queryParams.push(`state_id=${stateId}`);
      if (countryId !== null) queryParams.push(`country_id=${countryId}`);
      if (queryParams.length > 0) apiUrl += '?' + queryParams.join('&');
      this.isNotFound = true;
      this.loading = true;
      this.masterService.getDashboard(apiUrl).subscribe((res: any) => {
        this.isNotFound = false;
        this.loading = false;
        this.dashboardData = [];
        if (res.status === 200) {
          // this.loading = false;
          this.dashboardData = res;

          // Ensure topFiveTender is not null before using it
          if (res.topFiveTender) {
            this.topFiveOrder = res.topFiveTender;
            console.log(this.topFiveOrder);

          }

          // Performance bar data mapping with null checks
          if (this.dashboardData.presalesData) {
            this.performaceBar = this.dashboardData.presalesData.map((item: any) => {
              return {
                name: item.name,
                series: item.series ? [
                  { name: item.series[0]?.name, value: item.series[0]?.value ? +item.series[0].value : 0 },
                  { name: item.series[1]?.name, value: item.series[1]?.value ? +item.series[1].value : 0 }
                ] : []
              };
            });
          }

          
        // Map revenueResult to lineChartFinance
        if (this.dashboardData.revenueResult) {
          this.lineAreaChart = [
            {
              name: "Rev",
              series: this.dashboardData.revenueResult.map((item: any) => ({
                name: item.year,
                value: +item.revenue,
                formattedValue: this.formatNumber(+item.revenue)
              }))
            },
            {
              name: "EBITDA",
              series: this.dashboardData.revenueResult.map((item: any) => ({
                name: item.year,
                value: +item.ebidta,
                formattedValue: this.formatNumber(+item.ebidta)
              }))
            }
          ];
        }

          // Pie chart data mapping with null checks
          if (this.dashboardData.topFiveLocationWise) {
            this.pieChartData2 = this.dashboardData.topFiveLocationWise.map((item: any) => {
              return {
                name: item.state_name || 'Other',
                value: item.state_count ? +item.state_count : 0,
              };
            });
          }

          // Progress bar data mapping with null checks
          if (this.dashboardData.statusProgress) {
            // All data
            this.allProgressBar = this.dashboardData.statusProgress.map((item: any) => {
              return {
                name: item.tender_title,
                value: item.progress,
                // value: [0, 20, 40, 60, 80, 100],
                tender_id: item.tender_id
              };
            });

            // Top 10 data
            this.progressBar = this.allProgressBar.slice(0, 10);

            this.progressBar2 = this.dashboardData.statusProgress; // Keeping original data for logging
            console.log('progressBar2-->', this.progressBar2);
          }
        } else {
          this.alertService.warning("Looks like no data available!");
        }
      }, (error: any) => {
        console.error(error);
        this.dashboardData = [];
        this.isNotFound = false;
        this.loading = false;
        this.alertService.error("Error: " + error.statusText);
      });
    }
  
  
  // onPageChange(page: number) {
  //   this.currentPage = page;
  //   this.updatePagedData();
  // }

  // updatePagedData() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.pagedProgressBar = this.allProgressBar.slice(startIndex, endIndex);
  // }

  onBarClick(event: any) {
    const clickedBar = this.allProgressBar.find(bar => bar.name === event.name);
    console.log('clickedBar', clickedBar)
    if (clickedBar) {
      this.fetchTenderDetail(clickedBar.tender_id); // Passing tender_id to fetchTenderDetail method
    }
  }

  fetchTenderDetail(tenderId: any) {
    this.masterService.getTenderDetail(tenderId).subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderDetails = res.data;
      } else {
        this.alertService.warning("No details available for this tender.");
      }
    }, (error: any) => {
      console.error(error);
      this.alertService.error("Error fetching tender details: " + error.statusText);
    });
  }

  onPieChartSelect(event: any): void {
    // const segment = event.name; // Get the name of the clicked segment
    // Navigate to the desired page with the segment parameter
    // this.router.navigate(['/master/customer'], { queryParams: { segment: segment } });
  }
  getStatusData() {
    this.isNotFound = true;
    this.masterService.getStatusData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        // this.finCount = res;
        this.statusData = res.tenderstatus;
        console.log('this.categoryData-->', this.statusData);
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }
  onStatusChange(event: any) {
    const tenderStatusId = event.target.value; // Assuming you're using event binding for the select change
    if (tenderStatusId) {
      this.getProjData2(tenderStatusId);
    } else {
      // Handle if no company is selected
    }
  }
  getProjData2(tenderStatusId: number) {
    this.isNotFound = true;
    this.masterService.getProjectData2(tenderStatusId).subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.projectData2 = res.result;
        console.log('this.projectData2-->', this.projectData2);
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }
  // projectlist(){
  //   this.masterService.getProjectList().subscribe((res:any) => {
  //     if (res.status == 200) {
  //     this.projData = res.result;
  //     console.log(this.projData);

  //     }else {
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, (error: any) => {
  //     console.error(error);
  //     this.isNotFound = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   }); 
  // }

  onSelect(data: any): void {
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

  chartOptions: any;
  // Highcharts = new Chart({
  //   chart: {
  //     type: 'bar'
  //   },
  //   title: {
  //     text: '',
  //     align: 'right'
  //   },
  //   xAxis: {
  //     categories:this.arrayData ,
  //     title: {
  //       text: null
  //     },
  //     gridLineWidth: 1,
  //     lineWidth: 0,
  //     labels: {
  //       useHTML: true,
     
  //   }
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: ""
  //     },
  //     labels: {
  //       enabled: true, // Disable numeric labels on the y-axis
  //       overflow: 'justify'
  //     },
  //     gridLineWidth: 0,
  //   },
  //   tooltip: {
  //     valueSuffix: ''
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: '50%',
  //       borderColor:'red',
  //       dataLabels: {
  //         enabled: true
  //       },
  //       groupPadding: 0.1,
  //       colorByPoint: true, // Assign different colors to each point
  //       colors: ['#c0fec2', '#fd8383bd', '#fdda9b'] // Define three colors for the gradient
  //     }
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'right',
  //     verticalAlign: 'top',
  //     x: 10,
  //     y: -10,
  //     floating: true,
  //     borderWidth: 1,
  //     backgroundColor: Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
  //     shadow: true
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [{
  //     type: 'bar', // Specify the type of chart series
  //     name: 'Actual',
     
  //     data:this.helloData ,
   
  //     dataLabels: {
  //       enabled: true,
  //       useHTML: true,
  //       inside: true,
  //       align: 'right',
  //       formatter: function() {
  //         // return this.data > 130 ? this.y + ' mm' : null;
 
  //       if((this as Point).y<=20)
  //         {
  //        return `<div style="width: 10px;
  //               height: 10px;
  //                box-shadow: 2px 2px 3px #696969;
  //                border-radius: 5px;
  //                background-color: green;"></div> `  
  //         }else if((this as Point).y>20 && ((this as Point).y<50))
  //           {
  //             return `<div style="width:10px;height:10px;background-color:orange;
  //             box-shadow: 2px 2px 3px #696969;
  //                border-radius: 5px;"></div> `  
 
  //           }else if((this as Point).y>50)
  //             {
  //               return `<div style="width:10px;height:10px;background-color:red;
  //               box-shadow: 2px 2px 3px #696969;
  //                border-radius: 5px;"></div> `  
 
  //             }else
  //             {
  //               return ''
 
  //             }
  // // return ''
           
  //         // if((this as Point).x<20)
  //         //   {
  //         //     return `<div style="width:10px;height:10px;background-color:red;" ></div>`
  //         //   }else if((this as Point).x>20)
  //         //   {
  //         //     return `<div style="width:10px;height:10px;background-color:red;" ></div>`
  //         //   }
  //         // return ((this as Point).x<20?`<div style="width:10px;height:10px;background-color:red;" ></div>`:`<div style="width:10px;height:10px;background-color:red;" ></div>`)
  //     }
  //       // formatter: function() {
  //       //  if(this.point.name=='')
         
  //       // //   return this.colorIndex
  //       // // return `<div class="hii" style="width:10px;height:10px;background-color:red;"></div>`
  //       // //   // return `<img src="https://findicons.com/files/icons/2315/default_icon/256/arrow_down.png" style="width: 30px;margin-top:-10px"><img>`;
  //       // }
  //     }
  //   }],
 
  //   colors: ['#49b59a', '#FF6067', '#f9d84a'] // Assign three different colors to the bars
  // });

  Highcharts = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: '',
      align: 'right'
    },
    xAxis: {
      categories:this.arrayData ,
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0,
      labels: {
        useHTML: true,
     
    }
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
        borderColor:'red',
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1,
        colorByPoint: true, // Assign different colors to each point
        colors: ['#c0fec2', '#fd8383bd', '#fdda9b'] // Define three colors for the gradient
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
      backgroundColor: Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'bar', // Specify the type of chart series
      name: 'Actual',
     
      data:this.helloData ,
   
      dataLabels: {
        enabled: true,
        useHTML: true,
        inside: true,
        align: 'right',
        formatter: function() {
          // return this.data > 130 ? this.y + ' mm' : null;
 
        if((this as Point).y<=20)
          {
         return `<div style="width:10px;height:10px;background-color:red;position:absolute;left:10px;top:-4px"></div>
          `  
          }else if((this as Point).y>20 && ((this as Point).y<50))
            {
              return `<div style="width:10px;height:10px;background-color:blue;position:absolute;left:10px;top:-4px"></div>
               `  
 
            }else if((this as Point).y>50)
              {
                return `<div style="width:10px;height:10px;background-color:yellow;position:absolute;left:10px;top:-4px"></div> `  
 
              }else
              {
                return ''
 
              }
  // return ''
           
          // if((this as Point).x<20)
          //   {
          //     return `<div style="width:10px;height:10px;background-color:red;" ></div>`
          //   }else if((this as Point).x>20)
          //   {
          //     return `<div style="width:10px;height:10px;background-color:red;" ></div>`
          //   }
          // return ((this as Point).x<20?`<div style="width:10px;height:10px;background-color:red;" ></div>`:`<div style="width:10px;height:10px;background-color:red;" ></div>`)
      }
        // formatter: function() {
        //  if(this.point.name=='')
         
        // //   return this.colorIndex
        // // return `<div class="hii" style="width:10px;height:10px;background-color:red;"></div>`
        // //   // return `<img src="https://findicons.com/files/icons/2315/default_icon/256/arrow_down.png" style="width: 30px;margin-top:-10px"><img>`;
        // }
      }
    }],
 
    colors: ['#49b59a', '#FF6067', '#f9d84a'] // Assign three different colors to the bars
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
        { name: 'New Delhi', y: 20 },
        { name: 'Others', sliced: true, selected: true, y: 10 },
      ]
    }],
    colors: [
      '#bb9ff5', '#b5d0ff',
      '#ffc3ae', '#7dabf9', '#aeddc5', '#f397ca'
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
        symbol: 'circle'
      },
      data: [100, 100, 90, 110, 100, 85, 110, {
        y: 100,

        accessibility: {
          description: ''
        }
      }, 100, 90, 100, 100]

    }, {
      type: 'spline',
      name: 'Expense',
      marker: {
        symbol: 'circle'
      },

      data: [{
        y: 95,

        accessibility: {
          description: ''
        }
      }, 105, 80, 100, 95, 100, 90, 110, 105, 95, 95, 110]
    },
    ],
    colors: [
      '#d6a974', '#97daa7'
    ],
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
      borderColor: 'gray',
      data: [{
        x: Date.UTC(2023, 10, 21),
        x2: Date.UTC(2023, 11, 2),

        y: 0,
        partialFill: {
          amount: 0.50,
          fill: '#03b75e'
        }
      }, {
        x: Date.UTC(2023, 11, 8),
        x2: Date.UTC(2023, 11, 15),

        y: 1,

        partialFill: {
          amount: 0.15,
          fill: '#03b75e'
        }

      }, {
        x: Date.UTC(2023, 11, 15),
        x2: Date.UTC(2023, 11, 25),
        y: 2,
        partialFill: {
          amount: 0.45,
          fill: '#03b75e'
        }
      },

      {
        x: Date.UTC(2023, 11, 25),
        x2: Date.UTC(2023, 12, 5),
        y: 3,
        partialFill: {
          amount: 0.30,
          fill: '#03b75e'
        }
      },
      {
        x: Date.UTC(2023, 12, 5),
        x2: Date.UTC(2023, 12, 20),
        y: 4,
        partialFill: {
          amount: 0.20,
          fill: '#03b75e'
        }
      },


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

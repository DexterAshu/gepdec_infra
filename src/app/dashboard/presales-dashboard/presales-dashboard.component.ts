import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, MasterService, SharedService } from 'src/app/_services';
import { Chart } from 'angular-highcharts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presales-dashboard',
  templateUrl: './presales-dashboard.component.html',
  styleUrls: ['./presales-dashboard.component.css']
})
export class PresalesDashboardComponent {
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  p4: number = 1;
  limit = environment.pageLimit;
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
  companyData: any;
  financialData: any;
  categoryData: any;

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
  isNotFound: boolean = false;
  loading: boolean = false;
  preSalesDashData: any;
  selectedDuration: number | null = null;
  selectedCategory: number | null = null;
  selectedCompany: number | null = null;
  selectedProject: number | null = null;
  projectData: any;
  pieChartData: any = [];
  topFiveOrder: any[] = [];
  barChartData: any = [];
  tPublishedData: any;
  qualifiedData: any;
  participatedData: any;
  wonData: any;
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
  this.getCompanyData();
  this.getCatgData();
  this.getPresalesDashData(null, null, null, null, null, null);

  this.form = this.formBuilder.group({
    country_id: [null, Validators.required],
    state_id: [null, Validators.required],
    duration: [null, Validators.required],
    category: [null, Validators.required],
    company: [null, Validators.required],
    project: [null, Validators.required],
  });
  // Fetch country data and set default value to India
  this.getCountryData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  getIntegerValue(value: string | number): string {
    return Math.floor(Number(value)).toString();
  }
  
  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
        const india = this.countryData.find((country: { name: string; }) => country.name === 'India');
        if (india) {
          this.form.patchValue({ country_id: india.country_id });
        }
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
    this.masterService.getFinData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.financialData = res.result;
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
    this.companyData = [];
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.companyData = res.result.reverse();
        // const company = this.companyData.find((company: any) => company.bidder_name === 'Gepdec Infratech Limited');
        // if (company) {
        //   this.form.patchValue({ company: company.bidder_id });
        // }
      } else {
        this.alertService.warning("Looks like no data available in company data.");
      }
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
      this.getPresalesDashData(
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
    // console.error(error);
  //   this.segmentData = [];
  //   this.alertService.error("Error: " + error.statusText)
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
  
  getPresalesDashData(duration: number | null, category: number | null, company: number | null, project: number | null, stateId: number | null, countryId: number | null) {
    let apiUrl = `${environment.apiUrl}/dashboard/api/v1/getPreSalesDashboard`; // Change this to your actual API endpoint
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
    this.masterService.getPreSaleDashboard(apiUrl).subscribe((res: any) => {
        this.isNotFound = false;
        this.loading = false;
        this.preSalesDashData = [];
        if (res.status === 200) {
            // this.loading = false;
            this.preSalesDashData = res;
            console.log( this.preSalesDashData);

            // topFiveTender is not null before using it
            if (this.preSalesDashData.topFiveProject) {
                this.topFiveOrder = this.preSalesDashData.topFiveProject;
                
              }
              console.log(this.topFiveOrder);
            this.tPublishedData = this.preSalesDashData.cardData[0].data;
            this.qualifiedData = this.preSalesDashData.cardData[1].data;
            this.participatedData = this.preSalesDashData.cardData[2].data;
            this.wonData = this.preSalesDashData.cardData[3].data;
            // Pie chart 
            if (this.preSalesDashData.cardData) {
              this.pieChartData = this.preSalesDashData.cardData
                .filter((item: any) => item.status !== 'Published') // Exclude 'Published' status
                .map((item: any) => {
                  return {
                    name: item.status,
                    value: item.count,
                  };
                });
            }

            //  vertical bar chart
            if (this.preSalesDashData.performanceData) {
              this.barChartData = this.preSalesDashData.performanceData.map((item: any) => {
                  return {
                      name: item.year,
                      series: [
                          { name: 'Total', value: +item.published_count },
                          { name: 'Qualified', value: +item.qualified_count },
                          { name: 'Participated', value: +item.participated_count },
                          { name: 'Won', value: +item.won_count }
                      ]
                  };
              });
          }
        } else {
            this.alertService.warning("Looks like no data available!");
        }
    }, (error: any) => {
      console.error(error);
        this.preSalesDashData = [];
        this.isNotFound = false;
        this.loading = false;
        this.alertService.error("Error: " + error.statusText);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';
import { ApiService } from '../_services/api.service';
import { AlertService } from '../_services/alert.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    domain: ['#4676C6', '#FFA333', '#cf97ef']
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
    domain: ['#7CC9FF', '#1F6799']
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'Load';
  xAxisLabelBarLoad = 'Months';
  colorSchemeLoad:any ={
    domain: ['#cf97ef', '#7F5398', '#56BAFF']
  }
  
  pieColorsOL:any = {
    domain: ['#6093E8', '#cf97ef', '#FFB761', '#A2D9FF']
  };

  pieColorsSegment:any = {
    domain: ['#6093E8', '#cf97ef', '#FFB761']
  };
  pieColorsType:any = {
    domain: ['#cf97ef', '#FFB761', '#A2D9FF']
  };
  pieDataSegment=[
    {
      "name": "Critical",
      "value": 89400
    },
    {
      "name": "Major",
      "value": 59000
    },
    {
      "name": "Minor",
      "value": 99000
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
    let apiLink = '/master/segmentMaster/getSegment';
    this.apiService.getDataList(apiLink).subscribe((res:any) => {
      if (res.status === true) {
        this.segmentData = res.data;
      } else {
        this.alertService.warning("No data available in Segment dropdown.");
      }
    }, error => {
      this.segmentData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }
  
}

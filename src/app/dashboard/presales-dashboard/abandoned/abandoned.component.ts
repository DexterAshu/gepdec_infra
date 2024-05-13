import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { gantt } from 'dhtmlx-gantt';
import "../../../../assets/js/api.js"
import { ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-abandoned',
  templateUrl: './abandoned.component.html',
  styleUrls: ['./abandoned.component.css']
})
export class AbandonedComponent {
  form!: FormGroup;
  p: number = 1;
  searchText: any;
  limit = environment.pageLimit;
  stateData: any = [];
  isNotFound: boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  stateCount: any;
  //CHart property
  project: any;
  projectDetails: any;
  taskDetails: any;
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  projectNames: any;
  Gantt: any;
  proj: any;
  tendersList: any;
  filterData: any;
  projectDetails1: any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      state_name: [null, Validators.required],
      country_id: [null, Validators.required],
    });
    this.getStateData();
    this.getCountryData();

  }

  get f() { return this.form.controls; }

  getStateData() {
    this.stateData = [];
    this.isNotFound = false;
    this.masterService.getStateData().subscribe((res: any) => {
      if (res.status == 200) {
        this.isNotFound = false;
        this.stateCount = res;
        this.stateData = res.result;
        //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
      } else {
        this.isNotFound = true;
        this.stateData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.stateData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!")
    });

    this.getData(1001);
    //   window.onload = () => {
    //   this.getData(1001);
    // };
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res: any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.isSubmitted = true;

  //     if (this.form.value.country_id !== null) {
  //       var countryVal = this.countryData.filter((item: any) => {
  //         return item.country_id == this.form.value.country_id;
  //       });
  //       this.form.value.country_id = countryVal[0]['country_id'];
  //     }
  //     else {
  //       this.form.value.country_id = null;
  //     }

  //     let params = {
  //       country_id: this.form.value.country_id,
  //       state_name: this.form.value.state_name,
  //     };
  //     this.apiService.createMasterState( params).subscribe((res:any) => {

  //       let response: any = res;
  //       document.getElementById('cancel')?.click();
  //       this.isSubmitted = false;
  //       if (response.status == 200) {
  //         this.getStateData();
  //         this.alertService.success(response.message);
  //       } else {
  //         this.alertService.warning(response.message);
  //       }
  //     }, (error:any) => {
  //         document.getElementById('cancel')?.click();
  //         this.alertService.error("Error: Unknown Error!"t);
  //       })
  //   } else {
  //     this.alertService.warning("Form is invalid, Please fill the form correctly.");
  //    }
  // }

  getData(data: any) {
    this.filterData = data;
    this.apiService.getChartData(this.filterData).subscribe((res: any) => {
      this.tendersList = res.list;
      this.projectDetails = res.data;
      this.projectDetails1 = res.data[0].tsak;
      // this.taskDetails = res.tasks;
      gantt.config.date_format = "%d-%m-%Y %H:%i";
      gantt.config.scale_height = 90;
      //column data
      gantt.config.columns = [
        { name: "text", label: 'Milestone Description', tree: true, width: 225, resize: true },
        { name: "start_date", label: 'Start Date', align: "center", width: 80, resize: true },
        { name: "end_date", label: 'End Date', align: "center", width: 80, resize: true },
        { name: "owner", align: "center", label: "Owner", width: 160, resize: true },
        { name: "duration", label: 'Duration', width: 82, align: "center" },
        { name: "progress", label: 'Progress', width: 82, align: "center" },
        //   template: function (obj: any) {
        //     return obj.owner + `(${obj.progress * 100})`
        //   }
        // },
        // { name: "add", width: 30 }
      ];

      //horizontal scroll for left side data\
      gantt.config.layout = {
        css: "gantt_container",
        cols: [
          {
            width: 600,
            min_width: 300,

            // adding horizontal scrollbar to the grid via the scrollX attribute
            rows: [
              { view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer" },
              { view: "scrollbar", id: "gridScroll" }
            ]
          },
          { resizer: true, width: 1 },
          {
            rows: [
              { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
              { view: "scrollbar", id: "scrollHor" }
            ]
          },
          { view: "scrollbar", id: "scrollVer" }
        ]
      };

      //progress percentage, left and right custom text
      gantt.templates.progress_text = function (start, end, task) { return Math.round((task.progress ? +task.progress : 0) * 100) + "%"; };


      //dynamic scale based on duration data
      if (this.projectDetails.progress > 365) {
        var monthScaleTemplate = function (date: any) {
          var dateToStr = gantt.date.date_to_str("%M");
          var endDate = gantt.date.add(date, 2, "month");
          return dateToStr(date) + " - " + dateToStr(endDate);
        };


        gantt.config.scales = [
          { unit: "year", step: 1, format: "%Y" },
          { unit: "month", step: 4, format: monthScaleTemplate },
          { unit: "month", step: 1, format: "%M" }
        ];
      }
      else if (this.projectDetails.progress > 30) {
        function getWeekOfMonthNumber(date: any) {
          let adjustedDate = date.getDate() + date.getDay();
          let prefixes = ['0', '1', '2', '3', '4', '5'];
          return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
        }

        gantt.config.scales = [
          { unit: "month", step: 1, format: "%F, %Y" },
          {
            unit: "week", step: 1, format: function (date: any) {
              return "Week #" + getWeekOfMonthNumber(date);
            }
          },

        ];
      }
      else {
        function getWeekOfMonthNumber(date: any) {
          let adjustedDate = date.getDate() + date.getDay();
          let prefixes = ['0', '1', '2', '3', '4', '5'];
          return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
        }

        gantt.config.scales = [
          // { unit: "month", step: 1, format: "%F, %Y" },
          {
            unit: "week", step: 1, format: function (date: any) {
              return "Week #" + getWeekOfMonthNumber(date);
            }
          },
          {
            unit: "day", step: 1, format: "%j %D", css: function (date: any) {
              if (!gantt.isWorkTime(date)) {
                return "week-end";
              }
              return null;
            }
          }
        ];
      }

      //scale zoom functionality
      function setScaleConfig(level: any) {
        switch (level) {
          case "Day scale":
            gantt.config.scales = [
              { unit: "day", step: 1, format: "%d %M" }
            ];
            gantt.config.scale_height = 27;
            break;
          case "Week scale":
            var weekScaleTemplate = function (date: any) {
              var dateToStr = gantt.date.date_to_str("%d %M");
              var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
              return dateToStr(date) + " - " + dateToStr(endDate);
            };
            gantt.config.scales = [
              { unit: "week", step: 1, format: weekScaleTemplate },
              { unit: "day", step: 1, format: "%D" }
            ];
            gantt.config.scale_height = 50;
            break;
          case "Month scale":
            gantt.config.scales = [
              { unit: "month", step: 1, format: "%F, %Y" },
              { unit: "day", step: 1, format: "%j, %D" }
            ];
            gantt.config.scale_height = 50;
            break;
          case "Year scale":
            gantt.config.scales = [
              { unit: "year", step: 1, format: "%Y" },
              { unit: "month", step: 1, format: "%M" }
            ];
            gantt.config.scale_height = 90;
            break;
        }
      }
      var els = document.querySelectorAll<HTMLElement>("input[name='scale']");
      for (var i = 0; i < els.length; i++) {
        els[i].onclick = function (e: any) {
          var el = e.target;
          var value = el.value;
          setScaleConfig(value);
          gantt.render();
        };
      }

      //changing colors based on tasks priority
      gantt.templates.task_class = function (start, end, task) {
        switch (task['priority']) {
          case "1":
            return "high";
            break;
          case "2":
            return "medium";
            break;
          case "3":
            return "low";
            break;
        }
        return '';
      };

      //chart initialization
      gantt.init(this.ganttContainer.nativeElement, new Date(`${this.projectDetails.startdate}`));
      gantt.init(this.ganttContainer.nativeElement, new Date(`${this.projectDetails.enddate}`));

      //passing chart data from api data
      let ganttData: any = [];
      if (this.projectDetails.length > 0) {
        for (let i = 0; i < this.projectDetails.length; i++) {
          ganttData.push(

            { id: 1, text: `${this.projectDetails[i].tenderName}`, start_date: `${this.projectDetails[i].startdate}`, end_date: `${this.projectDetails[i].enddate}`, duration: `${this.projectDetails[i].duration}`, parent: 0, progress: `${this.projectDetails[i].progress}`, owner: `${this.projectDetails[i].owner}` },
          );
          for (let j = 0; j < this.projectDetails[i].tsak.length; j++) {
            ganttData.push(
              { id: j + 2, text: `${this.projectDetails1[j].taskName}`, start_date: `${this.projectDetails1[j].startdate}`, end_date: `${this.projectDetails1[j].enddate}`, duration: `${this.projectDetails1[j].duration}`, parent: 1, progress: `${this.projectDetails1[j].progress}`, owner: `${this.projectDetails1[j].owner}` }
            );

          }
        }
      } else {
        ganttData.push({ id: 1, text: `${this.projectDetails[i].tenderName}`, start_date: `${this.projectDetails[i].startdate}`, end_date: `${this.projectDetails[i].enddate}`, duration: `${this.projectDetails[i].duration}`, parent: 0, progress: `${this.projectDetails[i].progress}`, open: true, owner: `${this.projectDetails[i].owner}` });
      }
      gantt.clearAll();
      gantt.parse({ data: ganttData });

      // links: [
      //   { id: 1, source: 2, target: 3, type: "0" },
      //   { id: 2, source: 3, target: 4, type: "0" },
      //   { id: 3, source: 5, target: 6, type: "0" }
      // ]

      //chart plugins details
      gantt.plugins({
        quick_info: true,
        keyboard_navigation: true,
        undo: true,
        drag_timeline: true,
        click_drag: true,
        tooltip: true,
        marker: true
      });

      //get today date marker functionality
      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var markerId = gantt.addMarker({
        start_date: new Date(),
        end_date: new Date(),
        css: "today",
        text: "Today",
        title: dateToStr(new Date())
      });
      gantt.getMarker(markerId);

      //custom tooltip functionality
      gantt.config.tooltip_timeout = 0;
      gantt.attachEvent(
        'onGanttReady',
        function () {
          gantt.templates.tooltip_text = function (start, end, task) {

            return (
              "<div> <strong>Tender Name: </strong> " + task.text + "</div>" +
              "<div><strong>Start date: </strong> " + gantt.templates.tooltip_date_format(start) + "</div>" +
              "<div><strong>End date: </strong> " + gantt.templates.tooltip_date_format(end) + "</div>" +
              "<div><strong>Owner: </strong> " + task['owner'] + "</div>" +
              "<div><strong>Duration: </strong> " + task.duration + "</div>"
            );
          };
        },
        null
      );
    })
  }
}

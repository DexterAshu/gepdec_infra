import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-proj-reports',
  templateUrl: './proj-reports.component.html',
  styleUrls: ['./proj-reports.component.css']
})
export class ProjReportsComponent {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  // meterPort = environment.meterPort;
  meterData:any=[];
  isNotFound:boolean = false;
  isData:boolean = false;
  isDataList:boolean = false;
  isPulling:boolean = false;
  meterDetailData:any;
  meterDataList:any;
  meterIndexData: any;
  tableHeight: any;
  filterNumber: any;
  filterData: any;
  titleData: any;
  filterType: any = 'PC';
  singleMeterData: any;
  dateForFilter: any;
  searchText:any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      companyID: ["",Validators.required],
      meterCode: ["",Validators.required],
      type: ["",Validators.required],
    });

    this.tableHeight = `${window.innerHeight * 0.65}px`;

   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the table height when the window is resized
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  get f() { return this.form.controls; }



  onSubmit(){
    console.log(this.form);
  }
}

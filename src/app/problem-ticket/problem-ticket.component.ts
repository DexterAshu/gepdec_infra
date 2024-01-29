import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-problem-ticket',
  templateUrl: './problem-ticket.component.html',
  styleUrls: ['./problem-ticket.component.css']
})
export class ProblemTicketComponent {
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
  incidentlistdata: any;
  button: any;
  update: boolean = false;
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
  this.incidentlistData();
  }

  incidentlistData(){
    this.apiService.incidentList().subscribe((res:any)=>{
       console.log(res);
       this.incidentlistdata=res.result
    
     })
   }
   createForm(){
    console.clear();
    this.button = 'Create';
    console.log( this.button);
    
    this.update = false;
    this.form.reset();
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

import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audit-approval',
  templateUrl: './audit-approval.component.html',
  styleUrls: ['./audit-approval.component.css']
})
export class AuditApprovalComponent {
  date = new Date();
  fromDate: any;
  toDate: any;
  currentDate: any;
  searchText: any;
  auditApprovalData: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  searchForm!: FormGroup;
  selectedItem: any = [];

  constructor( private fb: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.currentDate);
    this.formInit();
  }

  selectRequest(data: any): void {
    this.selectedItem = [data];
  }

  formInit(): void {
    this.searchForm = this.fb.group({
      fromDate: [this.fromDate],
      toDate: [this.toDate]
    });
  }

  searchData(): void {
    console.log(this.searchForm.value);
  }

  getData(): void {
    const apiLink = `/inventory/api/v1/getAuditRequestList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.auditApprovalData = res.result;
      } else {
        this.auditApprovalData = [];
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.auditApprovalData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

}

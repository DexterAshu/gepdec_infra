import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';
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
  selectedRow: any;

  constructor( private fb: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService, private sharedService:SharedService, private elementRef:ElementRef ) {
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

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  selectRequest(data: any): void {
    this.selectedRow = data;
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
    this.auditApprovalData = [];
    this.isNotFound = false;
    const apiLink = `/inventory/api/v1/getAuditRequestList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.auditApprovalData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.auditApprovalData = undefined;
        this.alertService.warning(res.message);
      }
    },
    (error: any) => {
      this.isNotFound = true;
      this.auditApprovalData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  onApprove(): void {
    let match = {
      "inventoryaudit_id": "6006",
      "warehouse_id": "4012",
      "itemcategory_id": "404",
      "audit_purpose": "to test apis",
      "auditor_remarks": null,
      "status": "Approved",
      "items": [
        {
          "audititem_id": "1016",
          "item_id": "896",
          "inventoryaudit_id": "6006",
          "unit_id": "9003",
          "system_qty": 100,
          "audit_qty": 80,
          "difference": 20,
          "remarks": "need to check",
          "warehouselocation_id": "3020"
        }
      ]
    };
    this.selectedRow.status = 'Approved';
    this.apiService.auditRequestApproval(this.selectedRow).subscribe((res:any) => {
      if (res.status === 200) {
        this.alertService.success(res.message);
        this.getData();
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!")
    }
  }

  onReject(): void {
    let match = {
      "inventoryaudit_id": "6006",
      "warehouse_id": "4012",
      "itemcategory_id": "404",
      "audit_purpose": "to test apis",
      "auditor_remarks": null,
      "status": "Rejected",
      "items": [
        {
          "audititem_id": "1016",
          "item_id": "896",
          "inventoryaudit_id": "6006",
          "unit_id": "9003",
          "system_qty": 100,
          "audit_qty": 80,
          "difference": 20,
          "remarks": "need to check",
          "warehouselocation_id": "3020"
        }
      ]
    };
    this.selectedRow.status = 'Rejected';
    this.apiService.auditRequestApproval(this.selectedRow).subscribe((res:any) => {
      if (res.status === 200) {
        this.alertService.success(res.message);
        this.getData();
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!")
    }
  }

}

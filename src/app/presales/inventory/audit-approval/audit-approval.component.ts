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
    console.log(this.currentDate);
    this.formInit();
    this.auditApprovalData = [
      {
        "projectID": "ABC123",
        "warehouseID": "WH001",
        "locationID": "LOC001",
        "audit": {
          "auditID": "AUDIT001",
          "auditorName": "John Doe",
          "purpose": "Inventory Audit",
          "remarks": "Completed without issues",
          "createdBy": "Admin",
          "createdAt": "2024-03-12T08:00:00Z",
          "item" : [
            {
              "itemCode": "ABC123",
              "systemQTY": 100,
              "auditQTY": 90,
              "missingQTY": 10
            }
          ]
        }
      },
      {
        "projectID": "XYZ456",
        "warehouseID": "WH002",
        "locationID": "LOC002",
        "audit": {
          "auditID": "AUDIT001",
          "auditorName": "Jane Smith",
          "purpose": "Asset Verification",
          "remarks": "Minor discrepancies found",
          "createdBy": "Manager",
          "createdAt": "2024-03-11T10:30:00Z",
          "item" : [
            {
              "itemCode": "DEF456",
              "systemQTY": 150,
              "auditQTY": 120,
              "missingQTY": 30
            },
            {
              "itemCode": "GHI789",
              "systemQTY": 200,
              "auditQTY": 150,
              "missingQTY": 50
            }
          ]
        }
      },
      {
        "projectID": "DEF789",
        "warehouseID": "WH003",
        "locationID": "LOC003",
        "audit": {
          "auditID": "AUDIT001",
          "auditorName": "Alice Johnson",
          "purpose": "Inventory Count",
          "remarks": "Pending further investigation",
          "createdBy": "Supervisor",
          "createdAt": "2024-03-10T15:45:00Z",
          "item" : [
            {
              "itemCode": "JKL012",
              "systemQTY": 300,
              "auditQTY": 0,
              "missingQTY": 300
            },
            {
              "itemCode": "MNO345",
              "systemQTY": 400,
              "auditQTY": 0,
              "missingQTY": 400
            },
            {
              "itemCode": "PQR678",
              "systemQTY": 500,
              "auditQTY": 0,
              "missingQTY": 500
            }
          ]
        }
      }
    ];
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

}

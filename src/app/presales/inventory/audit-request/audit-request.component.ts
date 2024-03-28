import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audit-request',
  templateUrl: './audit-request.component.html',
  styleUrls: ['./audit-request.component.css']
})
export class AuditRequestComponent {
  date = new Date();
  fromDate: any;
  toDate: any;
  currentDate: any;
  searchText: any;
  searchItem: any;
  auditRequestData: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  searchForm!: FormGroup;
  form!: FormGroup;
  itemAuditForm!: FormGroup;
  wareHouseData: any = [];
  projectData: any = [];
  itemData: any = [];

  constructor( private fb: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
  }

  ngOnInit(): void {
    this.formInit();
    this.getData();
  }

  get f() { return this.form.controls; }

  formInit(): void {
    this.searchForm = this.fb.group({
      fromDate: [this.fromDate],
      toDate: [this.toDate]
    });
    this.form = this.fb.group({
      warehouse_id: ["",Validators.required],
      projectID: ["",Validators.required],
      itemCategory: ["",Validators.required],
    });
    this.itemAuditForm = this.fb.group({
      itemCode: ["",Validators.required],
      itemName: ["",Validators.required],
      systemQty: ["",Validators.required],
      auditQty: ["",Validators.required],
      auditRemarks: ["",Validators.required],
      isItemAudit: ["",Validators.required]
    })
  }

  getModelFormData(): void {
    this.getWarehouseData();
    this.getProjectData();
  }

  getProjectData(): void {
    this.projectData = [
      {
        "projectID": "ABC123",
        "projectName": "Project 1",
        "createdBy": "Admin",
        "createdAt": "2024-03-12T08:00:00Z"
      },
      {
        "projectID": "XYZ456",
        "projectName": "Project 2",
        "createdBy": "Manager",
        "createdAt": "2024-03-11T10:30:00Z"
      },
      {
        "projectID": "PQR789",
        "projectName": "Project 3",
        "createdBy": "User",
        "createdAt": "2024-03-10T14:20:00Z"
      },
      {
        "projectID": "LMN012",
        "projectName": "Project 4",
        "createdBy": "Admin",
        "createdAt": "2024-03-09T16:45:00Z"
      }
    ]
  }

  getWarehouseData() {
    this.masterService.getWarehouseData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  getData(): void {
    this.auditRequestData = [
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
          "createdAt": "2024-03-12T08:00:00Z"
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
          "createdAt": "2024-03-11T10:30:00Z"
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
          "createdAt": "2024-03-10T15:45:00Z"
        }
      }
    ];
  }

  searchItems(): void {
    this.itemData = [
      {
        "itemCode": "ABC123",
        "itemName": "Item 1",
        "itemCategory": "Category 1",
        "uom": "Unit",
        "systemQty": 100,
      },
      {
        "itemCode": "XYZ456",
        "itemName": "Item 2",
        "itemCategory": "Category 2",
        "uom": "Unit",
        "systemQty": 200,
      },
      {
        "itemCode": "PQR789",
        "itemName": "Item 3",
        "itemCategory": "Category 3",
        "uom": "Unit",
        "systemQty": 300,
      }
    ];
  }

  searchData(): void {
    console.log(this.searchForm.value);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}

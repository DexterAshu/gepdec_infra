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
  itemCategory: any = [];
  ItemSubCategory: any = [];

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
      tender_id: [null,Validators.required],
      warehouse_id: [null,Validators.required],
      itemcategory_id: [null,Validators.required],
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
    this.getTenderList();
    this.getDropdownList();
  }

  getDropdownList() {
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.itemCategory = res.itemcategory;
        this.ItemSubCategory = res.subcategory;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getTenderList(): void {
    let apiLink = `/biding/api/v1/getTenderlist`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.projectData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.alertService.error("Error: " + error.statusText)
    });
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
    const apiLink = `/inventory/api/v1/getAuditRequestList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.auditRequestData = res.result;
      } else {
        this.auditRequestData = [];
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.auditRequestData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  searchItems(): void {
    this.itemData = [];
    let tender_id = this.form.value.tender_id;
    let warehouse_id = this.form.value.warehouse_id;
    let itemcategory_id = this.form.value.itemcategory_id;
    this.apiService.getItemListByTender(tender_id, warehouse_id, itemcategory_id).subscribe((res:any) => {
      if (res.status === 200) {
        this.itemData = res.result;
      } else {
        this.itemData = [];
        this.alertService.warning("Looks like no data available!");
      }
    }),
    (error: any) => {
      this.itemData = [];
      this.alertService.error("Error: " + error.statusText)
    }
  }

  searchData(): void {
    console.log(this.searchForm.value);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}

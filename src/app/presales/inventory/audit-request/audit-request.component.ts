import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';
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
  selectedRow: any;
  wareHouseData: any = [];
  projectData: any = [];
  itemData: any = [];
  itemCategory: any = [];
  ItemSubCategory: any = [];

  constructor( private fb: FormBuilder, private alertService: AlertService, private apiService: ApiService, private sharedService: SharedService, private elementRef: ElementRef ) {
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

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
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

  selectRequest(data: any): void {
    this.selectedRow = data;
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
    }, (error: any) => {
      this.alertService.error("Error: Unknown Error!");
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
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getWarehouseData() {
    const apiLink = `/warehouse/api/v1/getWareHouseList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getData(): void {
    this.isNotFound = false;
    this.auditRequestData = [];
    const apiLink = `/inventory/api/v1/getAuditRequestList`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.auditRequestData = res.result;
      } else {
        this.isNotFound = true;
        this.auditRequestData = undefined;
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.isNotFound = true;
      this.auditRequestData = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  searchItems(): void {
    this.itemData = [];
    let tender_id = this.form.value.tender_id;
    let warehouse_id = this.form.value.warehouse_id;
    let itemcategory_id = this.form.value.itemcategory_id;
    const apiLink = `/inventory/api/v1/getItemListByTender/${tender_id}/${warehouse_id}/${itemcategory_id}`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.itemData = res.result;
      } else {
        this.itemData = [];
        this.alertService.warning("Looks like no data available!");
      }
    }),
    (error: any) => {
      this.itemData = [];
      this.alertService.error("Error: Unknown Error!")
    }
  }

  searchData(): void {
    console.log(this.searchForm.value);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}

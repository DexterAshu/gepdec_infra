import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-supplier-item-link',
  templateUrl: './supplier-item-link.component.html',
  styleUrls: ['./supplier-item-link.component.css']
})
export class SupplierItemLinkComponent {

  p: number = 1;
  limit = environment.pageLimit;
  form!: FormGroup;
  currentDate = new Date();
  searchText: any;
  isNotFound:boolean = false;
  isSubmitted:boolean = false;
  dataList:any;
  rowData:any;
  itemDataList:any;
  supplierId:any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
    private sharedService: SharedService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      supplierCode: [null, Validators.required],
      itemCode: [null, Validators.required],
    });

    this.getDataList();
    this.getItemList();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }
  
  get f() { return this.form.controls; }

  // getLabel(item: any): string {
  //   return `${item?.itemname} [${item?.itemcode}]`;
  // }

  getItemList() {
    this.itemDataList = [];
    let apiLink = "/item/api/v1/getItemList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.itemDataList = res.result;
      } else {
        this.itemDataList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.itemDataList = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/supplier/api/v1/getSupplierList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.dataList = res.result;
      } else {
        this.isNotFound = true;
        this.dataList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.dataList = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
    this.supplierId = undefined;
    this.form.controls['supplierCode'].setValue(`${this.rowData.suppliername} [${this.rowData.suppliercode}]`);
    // this.form.controls['itemCode'].setValue(`${this.rowData?.item['item_id']}`);
    this.supplierId = this.rowData.supplier_id;
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        supplier_id: this.supplierId,
        item: this.form.value.itemCode,
      }
      let apiLink = '/supplier/api/v1/supplierItemMapping';
      this.apiService.postData(apiLink, data).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.getDataList();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: Unknown Error!");
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

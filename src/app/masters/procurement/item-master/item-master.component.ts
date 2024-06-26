import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ApiService, ExcelExportService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound: boolean = false;
  dataList: any = [];
  file: any;
  dataDropdownList: any;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private apiService: ApiService, private excelExport: ExcelExportService, private sharedService:SharedService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
      parameter: [null],
      itemCategory: [null, Validators.required],
      itemSubCategory: [null, Validators.required],
      itemUOM: [null, Validators.required],
      // procurementUOM: [null, Validators.required],
      cost: [null],
      hsnCode: [null],
      gst: [null],
      parentItem: [null, Validators.required],
      parentItem_id: [null],
      itemClass: [null, Validators.required],
      itemTolerance: [null, Validators.required],
      // specification: [null, Validators.required],
    });

    this.getDataList();
    this.getDropdownList()
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }
  get f() { return this.form.controls; }

  selectRow(data: any): void {
    this.selectedRow = data;
  }

  getDropdownList() {
    this.dataDropdownList = [];
    // this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        // this.isNotFound = false;
        this.dataDropdownList = res;
      } else {
        // this.isNotFound = true;
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      // this.isNotFound = true;
      this.dataDropdownList = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemList";
    this.apiService.getData(apiLink).subscribe((res: any) => {
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

  isParent(val: any) {
    if (val == 'Yes') {
      this.form.get('parentItem_id')!.setValidators([Validators.required]);
      this.form.controls['parentItem_id'].reset();
    } else {
      this.form.controls['parentItem_id'].clearValidators();
      this.form.controls['parentItem_id'].reset();
    }
  }

  fileUpload(event: any) {
    this.file = [];
    let file = event.target.files;
    let type = /(\.pdf)$/i;
    if (type.exec(file[0].name)) {
      this.file = file;
    } else {
      this.form.controls['specification'].setValue(null);
      this.alertService.warning("Please choose only pdf file!");
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      let data = {
        unit_id: this.form.value.itemUOM,
        description: this.form.value.description,
        parameter: this.form.value.parameter,
        itemcategory_id: this.form.value.itemCategory,
        cost: this.form.value.cost,
        hsn_code: this.form.value.hsnCode,
        gst: this.form.value.gst,
        parentitem: this.form.value.parentItem,
        parentitem_id: this.form.value.parentItem_id,
        // precurementuom_id: this.form.value.procurementUOM,
        materialclass_id: this.form.value.class,
        tolerance_id: this.form.value.itemTolerance,
        subcategory_id: this.form.value.itemSubCategory,
      }

      let apiLink = '/Item/api/v1/addItem';
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

  download(): void {
    this.excelExport.exportAsExcelFile(this.dataList, 'sample');
  }
}

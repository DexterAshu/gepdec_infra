import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-boq-items',
  templateUrl: './boq-items.component.html',
  styleUrls: ['./boq-items.component.css']
})

export class BoqItemsComponent {
  form!: FormGroup;
  form1!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  limits: any = [];
  update: boolean = false;
  button: string = 'Create';
  loading: boolean = false;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  contactData: any;
  addressDetails: any;
  countryName: any;
  attachment: any = [];
  supgrpmemb: any;
  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};
  addmember: any;
  @ViewChild('multiSelect') multiSelect: any;
  dataDropdownList: any;
  rmove: any;
  arr: any;
  itemList: any;
  clientListData: any;
  tenderDetailsData: any;
  tendDetails: any;
  bankData: any;
  tenderData: any;
  tenderType: any;
  docType: any;
  docListData: any;
  refData: any;
  rowData: any;
  filterTenderDetailsData: any[] = [];
  listOfFiles: any[] = [];
  boqData: any;
  comData: any;
  dataCatList: any;
  dataSubList: any;
  childData: any;
  boqList: any;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private apiService: ApiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      childItem: this.formBuilder.array([]),
    });
    this.form1 = this.formBuilder.group({
      tender_id: ['', Validators.required],
      utility_id: ['', Validators.required],
      itemCategory: ['', Validators.required],
      itemSubCategory: ['', Validators.required],
      attachment: ['', Validators.required]
    });
    this.addAnotherRow();
    this.getDropdownList();
    this.getBoqListData();
    this.getCompanyData();
  }

  getCompanyData(): void {
    const apiLink = `/company/api/v1/getComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.comData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type!");
      }
    }),
    (error: any) => {
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getChildData(data: any): void {
    this.childData = data;
  }

  getDropdownList() {
    this.dataDropdownList = [];
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.dataCatList = res.itemcategory;
        this.dataSubList = res.subcategory;
      } else {
        this.dataDropdownList = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, (error: any) => {
      this.dataDropdownList = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    const apiLink = `/biding/api/v1/getTenderlist?company_id=${company_id}`
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status == 200){
        this.tenderDetailsData = res.result;
      } else {
        this.tenderDetailsData = undefined;
        this.alertService.warning("Looks like no data available in type!");
      }
    }),
    (error: any) => {
      this.tenderDetailsData = undefined;
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  boqChildItem(): FormArray {
    return this.form.get("childItem") as FormArray
  }

  childItemsArray(): FormGroup {
    return this.formBuilder.group({
      itemCode: [null, Validators.required],
      type: [null, Validators.required],
      quantity: [null, Validators.required],
      isChild: [null, Validators.required],
      childItem: [null, Validators.required],
    })
  }

  addAnotherRow() {
    this.boqChildItem().push(this.childItemsArray());
  }

  removeRow(i: number, type: string) {
    this.boqChildItem().removeAt(i);
  }

  createForm() {
    console.clear();
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }

  onItemSelect(item: any) {
    var a = this.arr
    var b = this.selectedItems
    var c = a.filter(function (objFromA: any) {
      return !b.find(function (objFromB: any) {
        return objFromA.ussg_id === objFromB.ussg_id
      })
    })
    this.arr = c;
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  rmovemember(data: any) { }

  onItemDeSelect(item: any) {
    this.rmovemember(item)
    this.rmove = item;
    this.arr.push(this.rmove);
  }

  getBoqListData() {
    this.boqData = [];
    this.isNotFound = false;
    const apiLink = `/boq/api/v1/getTenderBOQData`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.boqData = res.result;
      } else {
        this.boqData = undefined;
        this.isNotFound = true;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      console.error(error);
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getBOQItemList(data: any) {
    this.itemList = data;
  }

  getBOQList(data: any) {
    this.itemList =  [];
    this.boqList = data;
  }

  get f() { return this.form.controls; }
  get fb() { return this.form1.controls; }

  onFileChanged(event: any) {
    this.listOfFiles = [];
    this.attachment = [];
    const fileList = event.target.files;
    for (let file of fileList) {
      this.listOfFiles.push(file.name);
      this.attachment.push(file);
    }
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  //create form submit
  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
    }
  }

  // BOQ item bulk data
  onBOQSubmit() {
    this.isSubmitted = true;
    const formData: any = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append('utility_id', this.form1.value.utility_id);
    formData.append('tender_id', this.form1.value.tender_id);
    formData.append('itemcategory_id', this.form1.value.itemCategory);
    formData.append('subcategory_id', this.form1.value.itemSubCategory);
    this.apiService.BOQbulkData(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.form1.reset();
        this.isSubmitted = false;
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
        this.ngOnInit();
      } else {
        this.isSubmitted = false;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      console.error(error);
      this.isSubmitted = false;
      this.alertService.error("Error: Unknown Error!");
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

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
  result: any;
  companyData: any;
  isNotFound: boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country: any;
  limits: any = [];
  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
  contDetails: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData: boolean = true;
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
  itemList: any = [];
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

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status === 200) {
        this.comData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type!");
      }
    }),
    (error: any) => {
      console.log(error);
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
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
    }, error => {
      this.dataDropdownList = undefined;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
    });
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
    const apiLink = `/boq/api/v1/getBoqList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.boqData = res.result;
      } else {
        this.boqData = undefined;
        this.isNotFound = true;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getBOQItemList(data: any) {
    this.itemList = data;
  }

  get f() { return this.form.controls; }
  get fb() { return this.form1.controls; }

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
  }

  removeSelectedFile(index: any) {
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  //bulk-load with bulk excel download
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  exportAsXLSX1() {
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
    var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");
    XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");
    XLSX.writeFile(wb, "Data_File.xlsx");

  }
  downloadPdf() {
    const pdfUrl = './assets/tamplate/BOQ.xlsx';
    const pdfName = 'BOQ.xlsx';
    FileSaver.saveAs(pdfUrl, pdfName);
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
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append('utility_id', this.form1.value.utility_id);
    formData.append('tender_id', this.form1.value.tender_id);
    formData.append('itemCategory', this.form1.value.itemCategory);
    formData.append('itemSubCategory', this.form1.value.itemSubCategory);
    // formData.append('itemcode', this.form1.value.itemcode);
    this.addBOQ(formData);
  }

  addBOQ(formData: FormData) {
    this.isSubmitted = true;
    this.apiService.BOQbulkData(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.ngOnInit();
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        this.form1.reset();
      } else {
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: " + error.statusText);
    });
  }
}

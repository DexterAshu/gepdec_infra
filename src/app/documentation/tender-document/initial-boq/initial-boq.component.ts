import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-initial-boq',
  templateUrl: './initial-boq.component.html',
  styleUrls: ['./initial-boq.component.css']
})
export class InitialBoqComponent {
  documentForm!: FormGroup;
  attachment: File[] = [];
  isSubmitted: boolean = false;
  listOfFiles: string[] = [];
  fileList: any[] = [];
  tableHeight: any;
  searchText: string = '';
  isNotFound: boolean = false;
  meterData: any;
  p: number = 1;
  limit = environment.pageLimit;
  apiURL = environment.apiUrl;
  docType: any;
  docListData: any;
  companyData: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  clientListData: any;
  tenderDetailsData: any;
  filterTenderDetailsData: any = [];
  showTypeField: boolean = true;
  comData: any;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router, private elementRef: ElementRef, private sharedService: SharedService) { }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      tender_id: ['', Validators.required],
      utility_id: ['', Validators.required],
      attachment: ['', Validators.required],
      description: [''],
      doc_type: ['initialboq'],
    });
    this.listAPIData('initialboq');
    this.getData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  selectRow(data: any): void {
    this.selectedRow = data;
  }

  getDetails(event: any) {
    this.tenderDetailsData = [];
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      if (res.status = 200) {
        this.tenderDetailsData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
        console.error(error);
        this.alertService.error("Error: Unknown Error.");
      }
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  getData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status == 200) {
        this.comData = res.result;
        this.companyData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
        console.error(error);
        this.alertService.error("Error: Unknown Error.");
      }
    this.apiService.getDocType().subscribe((res: any) => {
      if (res.status == 200) {
        this.docType = res.documenttype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
        console.error(error);
        this.alertService.error("Error: Unknown Error.");
      }
    this.apiService.getTenderType().subscribe((res: any) => {
      if (res.status == 200) {
        this.tenderType = res.bidtype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
        console.error(error);
        this.alertService.error("Error: Unknown Error.");
      }
  }

  listAPIData(data: any) {
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getinitialBOQListData(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.docListData = undefined;
        this.isNotFound = true;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.docListData = undefined;
      console.error(error);
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.listOfFiles.push(file.name);
      this.attachment.push(file);
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  get f() { return this.documentForm.controls; }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('doc_type', this.documentForm.value.doc_type);
    formData.append('utility_id', this.documentForm.value.utility_id);
    formData.append('tender_id', this.documentForm.value.tender_id);
    formData.append('description', this.documentForm.value.description);
    this.apiService.tenderDocuments(formData).subscribe((res: any) => {
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        this.documentForm.reset();
        document.getElementById('cancel')?.click();
        this.alertService.success(res.message);
      } else {
        this.alertService.warning(res.message);
      }
    }, (error) => {
      console.error(error);
      this.isSubmitted = false;
      this.alertService.error("Error: Unknown Error!");
    });
  }
}
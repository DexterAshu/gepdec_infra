import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-document',
  templateUrl: './tender-document.component.html',
  styleUrls: ['./tender-document.component.css']
})
export class TenderDocumentComponent {
  // @ViewChild('attachments') attachment: any;
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
  apiLink: any = environment.apiUrl;
  docType: any;
  docListData: any;
  companyData: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  filterTenderDetailsData: any = [];
  showTypeField: boolean = true;
  clientListData: any;
  tenderDetailsData: any;
    comData: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      utility_id: ['',Validators.required],
      tender_id: ['',Validators.required],
      attachment: ['', Validators.required],
      description: ['', Validators.required],
      doc_type: ['Tender'],
    });
    this.getData();
    this.listAPIData('Tender');
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.comData = res.result;
      this.companyData = res.result;
      console.log(this.comData);
    });
    this.apiService.getDocType().subscribe((res: any) => {
      this.docType = res.documenttype;
    });
    this.apiService.getTenderType().subscribe((res: any) => {
      this.tenderType = res.bidtype;
    });



  }

  listAPIData(data:any){
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getTendListData(data).subscribe((res:any) => {
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
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  onFileChanged(event: any) {
    try {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.listOfFiles.push(files[i].name);
        this.attachment.push(files[i]);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }


  get f() {
    return this.documentForm.controls;
  }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
    this.tenderDetailsData = res.result;
    });
  }

  getrefData(tender_id: any){
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x:any) => x.tender_id == tender_id);
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.documentForm.invalid) {
      return;
    }
    console.log(this.documentForm.value);
    const formData: FormData = new FormData();

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('utility_id', this.documentForm.value.utility_id);
    formData.append('tender_id', this.documentForm.value.tender_id);
    formData.append('description', this.documentForm.value.description);
    formData.append('doc_type', this.documentForm.value.doc_type);
    this.addDocument(formData);
  }

  addDocument(formData: FormData) {
    this.apiService.tenderDocuments(formData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.ngOnInit();
        this.documentForm.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: Unknown Error!");
    });
  }
}


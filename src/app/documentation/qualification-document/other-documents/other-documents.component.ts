import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-other-documents',
  templateUrl: './other-documents.component.html',
  styleUrls: ['./other-documents.component.css']
})
export class OtherDocumentsComponent {
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
  docType: any;
  docListData: any;
  companyData: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any
    
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
      tender_submission_date: ['',Validators.required],
      // prebid_meeting_mode: ['',Validators.required],
      // prebid_date: ['',Validators.required],
      prebid_submission_date: ['',Validators.required],
      publish_date: ['',Validators.required],
      tender_location: ['',Validators.required],
      bidtype: ['',Validators.required],
      tender_ref_no: ['',Validators.required],
      tender_title: ['',Validators.required],
      completion_period: ['',Validators.required],
      ecv: ['',Validators.required],
      utility: ['',Validators.required],
      bid_validity: ['',Validators.required],
      attachment: ['', Validators.required],
      description: [''],
    });

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

  getData() {

    // let data = this.documentForm.value.document_id;
    this.apiService.getDocType().subscribe((res: any) => {
      if(res.status == 200) {
        this.docType = res.documenttype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getTenderType().subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderType = res.bidtype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
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

  onSubmit() {
    console.log(this.documentForm.value);
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }

    formData.append('tender_title', this.documentForm.value.tender_title);
    formData.append('tender_ref_no', this.documentForm.value.tender_ref_no);
    formData.append('bidtype', this.documentForm.value.bidtype);
    formData.append('tender_location', this.documentForm.value.tender_location);
    formData.append('publish_date', this.documentForm.value.publish_date);
    formData.append('prebid_submission_date', this.documentForm.value.prebid_submission_date);
    // formData.append('prebid_date', this.documentForm.value.prebid_date);
    // formData.append('prebid_meeting_mode', this.documentForm.value.prebid_meeting_mode);
    // formData.append('documenttype_id', this.documentForm.value.documenttype_id);
    formData.append('tender_submission_date', this.documentForm.value.tender_submission_date);
    formData.append('completion_period', this.documentForm.value.completion_period);
    formData.append('ecv', this.documentForm.value.ecv);
    formData.append('utility', this.documentForm.value.utility);
    formData.append('bid_validity', this.documentForm.value.bid_validity);
    formData.append('description', this.documentForm.value.description);
    this.addDocument(formData);
  }

  addDocument(formData: FormData) {
    this.apiService.createDocuments(formData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.documentForm.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    });
  }
}


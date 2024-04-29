import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-fin-documents',
  templateUrl: './fin-documents.component.html',
  styleUrls: ['./fin-documents.component.css']
})
export class FinDocumentsComponent {

  documentForm!: FormGroup;
  attachment: File[] = [];
  isSubmitted = false;
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
  discardeddata: any;
  isExcelDownloadData: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService
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

  
  getData() {
    
    // let data = this.documentForm.value.document_id;
    // console.log(data);
    this.apiService.getDocType().subscribe((res: any) => {
      this.docType = res.documenttype;
    });
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
    this.apiService.getTenderType().subscribe((res: any) => {  
      this.tenderType = res.bidtype;
    });
    
    this.apiService.getDocListData().subscribe((res:any) => {
      
      
      if (res.status === 200) {
        this.docListData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
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

  //button dropdown
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  get f() {
    return this.documentForm.controls;
  }
  exportAsXLSX1(){
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
     var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);
    var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");
     XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");
    XLSX.writeFile(wb, "Data_File.xlsx");

        }
downloadPdf() {
  const pdfUrl = './assets/tamplate/country_bulkload_template_file.xlsx';
  const pdfName = 'country_bulkload_template_file.xlsx';
  FileSaver.saveAs(pdfUrl, pdfName);
}

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
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
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: " + error.statusText);
    });
  }
}


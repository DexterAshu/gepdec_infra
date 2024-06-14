import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  // imageLink:string='';
  // pdfFile: string = '';
  imageLink: SafeResourceUrl = '';
  pdfFile: SafeResourceUrl = '';
  excelFile: string = '';
  rowData: any;
  processedDocuments: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private sharedService: SharedService,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
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

  // listAPIData(data: any) {
  //   this.docListData = [];
  //   this.isNotFound = false;
  //   this.apiService.getTendListData(data).subscribe((res: any) => {
  //     if (res.status === 200) {
  //       this.isNotFound = false;
  //       this.docListData = res.result;
  //       this.docListData.forEach((doc: any) => {
  //         doc.images = [];
  //         doc.pdfs = [];
  //         doc.excels = [];
  //         const documents = doc.document ? doc.document.split(',') : [];
  //         documents.forEach((file: string) => {
  //           const lowerCaseFile = file.toLowerCase();
  //           if (lowerCaseFile.endsWith('.jpg') || lowerCaseFile.endsWith('.png')) {
  //             doc.images.push(file);
  //           } else if (lowerCaseFile.endsWith('.pdf')) {
  //             doc.pdfs.push(file);
  //           } else if (lowerCaseFile.endsWith('.xlsx')) {
  //             doc.excels.push(file);
  //           }
  //         });
  //       });
  //     } else {
  //       this.docListData = undefined;
  //       this.isNotFound = true;
  //       this.alertService.warning(res.message);
  //     }
  //   }, (error: any) => {
  //     this.docListData = undefined;
  //     this.isNotFound = true;
  //     this.alertService.error("Error: Unknown Error!");
  //   });
  // }

  listAPIData(data: any) {
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getTendListData(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
        this.docListData.forEach((doc: any) => {
          doc.images = [];
          doc.pdfs = [];
          doc.excels = [];
          const documents = doc.document ? doc.document.split(',') : [];
          documents.forEach((file: string) => {
            const lowerCaseFile = file.toLowerCase();
            if (lowerCaseFile.endsWith('.jpg') || lowerCaseFile.endsWith('.png')) {
              doc.images.push(file);
            } else if (lowerCaseFile.endsWith('.pdf')) {
              doc.pdfs.push(file);
            } else if (lowerCaseFile.endsWith('.xlsx')) {
              doc.excels.push(file);
            }
          });
        });
      } else {
        this.docListData = undefined;
        this.isNotFound = true;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  // rowListData(row: any) {
  //   this.rowData = [];
  //   this.processedDocuments = [];
  //   const documentList = this.extractFileNames(row.document);
  //   documentList.forEach((doc, index) => {
  //     this.processedDocuments.push({
  //       index: index + 1,
  //       document: doc,
  //       images: row.images,
  //       pdfs: row.pdfs,
  //       excels: row.excels
  //     });
  //   });
  //   console.log('processedDocuments--->', this.processedDocuments);
  // }

  // rowListData(row: any) {
  //   this.processedDocuments = [];
  //   const documentList = this.extractFileNames(row.document);
  //   documentList.forEach((doc, index) => {
  //     const type = this.getDocumentType(doc);
  //     this.processedDocuments.push({
  //       index: index + 1,
  //       document: doc,
  //       type: type
  //     });
  //   });
  // }

  rowListData(row: any) {
    this.processedDocuments = [];
    const documentList = this.extractFileDetails(row.document);
    documentList.forEach((doc, index) => {
      const type = this.getDocumentType(doc.name);
      this.processedDocuments.push({
        index: index + 1,
        document: doc.name,
        fullPath: doc.path,
        type: type
      });
    });
  }

  // extractFileNames(filePaths: string): string[] {
  //     const regex = /\/documents\/[\d-]*([a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+)$/;
  //     return filePaths.split(',').map(path => {
  //         const match = path.match(regex);
  //         return match ? match[1] : path;
  //     });
  // }

  extractFileDetails(filePaths: string): { name: string, path: string }[] {
    const regex = /\/documents\/[\d-]*([a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+)$/;
    return filePaths.split(',').map(path => {
      const match = path.match(regex);
      const fileName = match ? match[1] : path;
      return { name: fileName, path: path };
    });
  }

  getDocumentType(fileName: string): string {
    const lowerCaseFile = fileName.toLowerCase();
    if (lowerCaseFile.endsWith('.jpg') || lowerCaseFile.endsWith('.png')) {
      return 'image';
    } else if (lowerCaseFile.endsWith('.pdf')) {
      return 'pdf';
    } else if (lowerCaseFile.endsWith('.xlsx')) {
      return 'excel';
    }
    return 'unknown';
  }

  showImage(data: string) {
    console.log(data);
    // this.imageLink = `${environment.apiUrl}/${data}`;
    this.imageLink = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/${data}`);
    console.log(this.imageLink);
  }
  showPdf(data: string) {
    console.log('pdf file-->', data);
    this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/${data}`);
  }

  downloadExcel(data: string) {
    console.log('excel file-->', data);
    this.excelFile = `${environment.apiUrl}/${data}`;
    console.log('this.excelFile -->', this.excelFile);
    
    const link = document.createElement('a');
    link.href = this.excelFile;
    const fileName = data.split('/').pop();
    link.download = fileName ? fileName : 'download.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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


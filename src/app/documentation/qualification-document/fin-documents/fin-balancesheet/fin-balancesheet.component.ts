import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, MasterService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-fin-balancesheet',
  templateUrl: './fin-balancesheet.component.html',
  styleUrls: ['./fin-balancesheet.component.css']
})
export class FinBalancesheetComponent {
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
  companyData: any = [];
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  financialData: any;
  ourComp: any;
    rowData: any;
  finDetails: any;
  update: boolean = false;
  button: string = 'Create';
  // imageLink:string='';
  // pdfFile: string = '';
  imageLink: SafeResourceUrl = '';
  pdfFile: SafeResourceUrl = '';
  excelFile: string = '';
  processedDocuments: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private masterService: MasterService,
    private router: Router,
    private elementRef: ElementRef,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      bidder_id: ['', Validators.required],
      financialyear_id: ['', Validators.required],
      net_working_capital: ['', Validators.required],
      total_liabilities: ['', Validators.required],
      total_fixed_assets: ['', Validators.required],
      net_profit: ['', Validators.required],
      net_worth: ['', Validators.required],
      // net_capital: ['', Validators.required],
      reserve_surplus: ['', Validators.required],
      paid_upcapital: ['', Validators.required],
      annual_turnover: ['', Validators.required],
      ebidta: [''],
      // itr:['',Validators.required],
      // itr_date:[''],
      // itr_number:[''],
      attachment: [''],
      description: [''],
    });

    this.getData();
    this.companyDataList();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }
  get f() { return this.documentForm.controls; }

  getDetails(data: any) {
    this.rowData = [];
    this.rowData = data;
  }

  getPatchDetails(data: any) {
    this.documentForm.reset();
    this.button = 'Update';
    this.update = true;
    this.finDetails = [];
    this.finDetails = data;
    this.documentForm.patchValue({
      bidder_id: this.finDetails.bidder_id,
      financialyear_id: this.finDetails.financialyear_id,
      total_liabilities: this.finDetails.total_liabilities,
      total_fixed_assets: this.finDetails.total_fixed_assets,
      net_profit: this.finDetails.net_profit,
      net_worth: this.finDetails.net_worth,
      // net_capital: this.finDetails.net_capital,
      reserve_surplus: this.finDetails.reserve_surplus,
      paid_upcapital: this.finDetails.paid_upcapital,
      annual_turnover: this.finDetails.annual_turnover,
      net_working_capital: this.finDetails.net_working_capital,
      ebidta: this.finDetails.ebidta,
      description: this.finDetails.description
    });
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  companyDataList() {
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    })
    this.masterService.getFinData().subscribe((res: any) => {
      this.financialData = res.result;
    });
  }

  getData() {
    this.isNotFound = false;
    this.docListData = [];
    this.apiService.getOurFinList().subscribe((res: any) => {
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
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.warning("Looks like no data available.");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = true;
      this.docListData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

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
      console.log('doc short name', this.processedDocuments);
      
    });
  }

  extractFileDetails(filePaths: string): { name: string, path: string }[] {
    return filePaths.split(',').map(path => {
        const parts = path.split('/');
        const fullFileName = parts[parts.length - 1];
        // Remove leading numbers and dashes
        const fileName = fullFileName.replace(/^\d+-*/, '');
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


  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }
  createForm() {
    this.button = 'Create';
    this.update = false;
    this.documentForm.reset();
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('net_working_capital', this.documentForm.value.net_working_capital)
    formData.append('bidder_id', this.documentForm.value.bidder_id);
    formData.append('financialyear_id', this.documentForm.value.financialyear_id);
    formData.append('total_liabilities', this.documentForm.value.total_liabilities);
    formData.append('total_fixed_assets', this.documentForm.value.total_fixed_assets);
    formData.append('net_profit', this.documentForm.value.net_profit);
    formData.append('net_worth', this.documentForm.value.net_worth);
    // formData.append('net_capital', this.documentForm.value.net_capital);
    formData.append('reserve_surplus', this.documentForm.value.reserve_surplus);
    formData.append('paid_upcapital', this.documentForm.value.paid_upcapital);
    formData.append('annual_turnover', this.documentForm.value.annual_turnover);
    formData.append('description', this.documentForm.value.description);
    formData.append('ebidta', this.documentForm.value.ebidta);

    this.addOurFinDocument(formData);
    this.finUpdate(this.documentForm.value)
  }
  addOurFinDocument(formData: FormData) {
    this.apiService.createOurFinDocuments(formData).subscribe((res: any) => {
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

  finUpdate(formData: FormData): void {
    this.documentForm.value.financials_id = this.finDetails.financials_id;
    this.apiService.ourFinUpdation(formData).subscribe((res: any) => {
      this.isSubmitted = false;
      if (res.status == 200) {
        this.getData();
        document.getElementById('cancel')?.click();
        this.alertService.success(res.message);
      } else if (res.status == 201) {
        this.alertService.error(res.message);
      } else {
        this.alertService.error('Error, Something went wrong please check');
      }
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: Unknown Error!");
    });
  }


}



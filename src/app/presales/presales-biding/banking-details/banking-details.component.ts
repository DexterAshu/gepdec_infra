import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.component.html',
  styleUrls: ['./banking-details.component.css']
})
export class BankingDetailsComponent {
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
  inserteddata: any;
  discardeddata: any;
  isExcelDownloadData: boolean = true;
  companyData: any;
  tenderType: any;
  bankData: any;
  tenderData: any;
  tenderDetails: any;
  tenderDetailsData: any;
  clientListData: any;
  clientList: any;
  tendDetails: any;
  data1: any;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private  masterService: MasterService,
    private alertService: AlertService
  ) {

    const userDataString = localStorage.getItem('gdUserData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      // documenttype_id: ['',Validators.required],
      bank_id: [''],
      bg_number: ['', Validators.required],
      bg_amount: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      submission_date: [''],
      extend_date: [''],
      attachment: [''],
      // publish_date: [''],
      // tender_ref_no:[''],
      tender_id:['', Validators.required],
      utility_id:['', Validators.required],
      document_description: [''],
     
    });

    

    this.getData();
    this.apiService.getDocType().subscribe((res: any) => {
      this.docType = res.documenttype;
    });
  }

  updateDoc(){
    this.documentForm.get('bank_id')!.setValidators([Validators.required]);
    this.documentForm.get('bank_id')!.clearValidators();
    this.documentForm.get('submission_date')!.setValidators([Validators.required]);
    this.documentForm.get('submission_date')!.clearValidators();
    this.documentForm.get('extend_date')!.setValidators([Validators.required]);
    this.documentForm.get('extend_date')!.clearValidators();
    this.documentForm.get('attachment')!.setValidators([Validators.required]);
    this.documentForm.get('attachment')!.clearValidators();
    this.documentForm.get('end_date')!.setValidators([Validators.required]);
    this.documentForm.get('end_date')!.clearValidators();
    this.documentForm.get('start_date')!.setValidators([Validators.required]);
    this.documentForm.get('start_date')!.clearValidators();
  }

 

  getData() {
    this.apiService.getDocType().subscribe((res: any) => {
      this.docType = res.documenttype;
    });
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
    this.apiService.getTenderType().subscribe((res: any) => {  
      this.tenderType = res.bidtype;
    });
    this.masterService.getBankData().subscribe((res:any)=>{
      this.bankData = res.bank;
    })
    this.apiService.getTenderList().subscribe((res: any) => {  
      this.tenderData = res.result;
    });
    
    this.apiService.getDocListData().subscribe((res:any) => {
      
      
      if (res.status === 200) {
        this.docListData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
      this.tendDetails = this.tenderDetailsData[0];
      console.log(this.tenderDetailsData);
    });
  }
  
  // getDetails(event:any) {
  //   debugger
  //   this.data1 = this.clientList; // Assuming this assignment is necessary
  //   this.apiService.tenderDetails(this.data1).subscribe((res: any) => {
  //     this.tenderDetailsData = res.result;
  //     this.tendDetails = this.tenderDetailsData[0];
  //   });
  // }
  


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

  //button dropdown
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
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

    // formData.append('documenttype_id', this.documentForm.value.documenttype_id);
    formData.append('bank_id', this.documentForm.value.bank_id);
    formData.append('bg_number', this.documentForm.value.bg_number);
    formData.append('bg_amount', this.documentForm.value.bg_amount);
    formData.append('start_date', this.documentForm.value.start_date);
    formData.append('end_date', this.documentForm.value.end_date);
    formData.append('submission_date', this.documentForm.value.submission_date);
    formData.append('extend_date', this.documentForm.value.extend_date);
    // formData.append('publish_date', this.documentForm.value.publish_date);
    // formData.append('tender_ref_no', this.documentForm.value.tender_ref_no);
    formData.append('tender_id', this.documentForm.value.tender_id);
    formData.append('utility_id', this.documentForm.value.utility_id);
    formData.append('document_description', this.documentForm.value.document_description);
    this.addDocument(formData);
  }

  addDocument(formData: FormData) {
    this.apiService.AddBank(formData).subscribe((res: any) => {
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
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-bg-document',
  templateUrl: './bg-document.component.html',
  styleUrls: ['./bg-document.component.css']
})
export class BgDocumentComponent {
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
  inserteddata: any;
  discardeddata: any
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
  filterTenderDetailsData: any = [];
  securityData: any;
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
      security_id: [null,Validators.required],
      utility_id:[null, Validators.required],
      tender_id:[null, Validators.required],
      bank_id: [null, Validators.required],
      bg_number: [null, Validators.required],
      bg_amount: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      submission_date: [null, Validators.required],
      extend_date: [null],
      attachment: [null],
      document_description: [null],

    });

    this.getData();
    this.bankList();
  }

  updateDoc(){
    this.documentForm.get('bank_id')!.setValidators([Validators.required]);
    this.documentForm.controls['bank_id'].clearValidators();
    this.documentForm.get('submission_date')!.setValidators([Validators.required]);
    this.documentForm.controls['submission_date'].clearValidators();
    this.documentForm.get('extend_date')!.setValidators([Validators.required]);
    this.documentForm.controls['extend_date'].clearValidators();
    this.documentForm.get('attachment')!.setValidators([Validators.required]);
    this.documentForm.controls['attachment'].clearValidators();
    this.documentForm.get('end_date')!.setValidators([Validators.required]);
    this.documentForm.controls['end_date'].clearValidators();
    this.documentForm.get('start_date')!.setValidators([Validators.required]);
    this.documentForm.controls['start_date'].clearValidators();
  }

  getData() {
    this.apiService.getDocType().subscribe((res: any) => {
      if(res.status == 200) {
        this.docType = res.documenttype;
      } else {
        this.alertService.warning("Looks like no data available in type.");
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
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getTenderType().subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderType = res.bidtype;
        this.securityData = res.security;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.masterService.getBankData().subscribe((res:any)=>{
      if(res.status === 200){
        this.bankData = res.bank;
      } else {
        this.alertService.warning("Looks like no data available in type.")
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getTenderList().subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  bankList(){
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getBankDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.docListData = undefined;
        this.isNotFound = true;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, (error: any) => {
      console.error(error);
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!")
    });
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
    this.isSubmitted = true;
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('security_id', this.documentForm.value.security_id);
    formData.append('bank_id', this.documentForm.value.bank_id);
    formData.append('bg_number', this.documentForm.value.bg_number);
    formData.append('bg_amount', this.documentForm.value.bg_amount);
    formData.append('start_date', this.documentForm.value.start_date);
    formData.append('end_date', this.documentForm.value.end_date);
    formData.append('submission_date', this.documentForm.value.submission_date);
    if(this.documentForm.value.extend_date != '' || this.documentForm.value.extend_date != null){
      formData.append('extend_date', this.documentForm.value.extend_date);
    }
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
        this.bankList();
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

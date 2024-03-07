import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService } from 'src/app/_services';

@Component({
  selector: 'app-fin-bank-guarantee',
  templateUrl: './fin-bank-guarantee.component.html',
  styleUrls: ['./fin-bank-guarantee.component.css']
})
export class FinBankGuaranteeComponent {
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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      documenttype_id: ['',Validators.required],
      bank_name: ['null', Validators.required],
      bgamount: ['', Validators.required],
      bgnumber: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      submission_date: ['', Validators.required],
      extend_date: ['', Validators.required],
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

  onSubmit() {
    console.log(this.documentForm.value);
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }

    formData.append('documenttype_id', this.documentForm.value.documenttype_id);
    formData.append('bank_name', this.documentForm.value.bank_name);
    formData.append('bgnumber', this.documentForm.value.bgnumber);
    formData.append('bgamount', this.documentForm.value.bgamount);
    formData.append('start_date', this.documentForm.value.start_date);
    formData.append('end_date', this.documentForm.value.end_date);
    formData.append('submission_date', this.documentForm.value.submission_date);
    formData.append('extend_date', this.documentForm.value.extend_date);
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



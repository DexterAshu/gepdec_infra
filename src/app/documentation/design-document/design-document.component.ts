import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService } from 'src/app/_services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-design-document',
  templateUrl: './design-document.component.html',
  styleUrls: ['./design-document.component.css']
})

export class DesignDocumentComponent {
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
  companyData: any = [];
  tenderList: any = [];
  selectedTender: any;
  isOpen: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      client: ['null', Validators.required],
      tender_id: ['', Validators.required],
      bank_name: ['null', Validators.required],
      bgamount: ['', Validators.required],
      bgnumber: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      submission_date: ['', Validators.required],
      extend_date: ['', Validators.required],
      attachment: ['', Validators.required],
      description: ['']
    });
  }

  getClient(): void {
    this.companyData = [];
    const apiLink = `/company/api/v1/getComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error(error);
    }
  }

  getTenderList(): void {
    this.tenderList = [];
    const apiLink = `/biding/api/v1/getTenderlist?comapany_id=${this.documentForm.value.client}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.tenderList = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error(error);
    }
  }

  selectTender(): void {
    this.selectedTender = this.tenderList.filter((tender: any) => tender.tender_id == this.documentForm.value.tender_id)[0];
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

  get f() { return this.documentForm.controls }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

  onSubmit() {
    console.log(this.documentForm.value);
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('bank_name', this.documentForm.value.bank_name);
    formData.append('bgnumber', this.documentForm.value.bgnumber);
    formData.append('bgamount', this.documentForm.value.bgamount);
    formData.append('start_date', this.documentForm.value.start_date);
    formData.append('end_date', this.documentForm.value.end_date);
    formData.append('submission_date', this.documentForm.value.submission_date);
    formData.append('extend_date', this.documentForm.value.extend_date);
    formData.append('publish_date', this.documentForm.value.publish_date);
    formData.append('tender_ref_no', this.documentForm.value.tender_ref_no);
    formData.append('tender_title', this.documentForm.value.tender_title);
    formData.append('utility', this.documentForm.value.utility);
    formData.append('description', this.documentForm.value.description);
    this.isSubmitted = true;
    this.apiService.createDocuments(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.documentForm.reset();
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error(error);
    }
    this.isSubmitted = false;
  }

}

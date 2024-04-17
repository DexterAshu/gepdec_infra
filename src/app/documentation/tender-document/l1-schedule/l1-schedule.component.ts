import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-l1-schedule',
  templateUrl: './l1-schedule.component.html',
  styleUrls: ['./l1-schedule.component.css']
})

export class L1ScheduleComponent {
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
  tenderList: any = [];
  inserteddata: any;
  selectedTender: any;
  discardeddata: any;
  isExcelDownloadData: boolean = true;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.getData();
    this.documentForm = this.fb.group({
      company_id: ['', Validators.required],
      tender_ref_no: ['', Validators.required],
      total_tenure: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      publish_date: ['', Validators.required],
      attachment: ['', Validators.required],
      description: ['']
    });
  }

  getData() {
    this.apiService.getDocListData().subscribe((res: any) => {
      if (res.status === 200) {
        this.docListData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error(`Error: ${error.message}`);
    }
  }

  createModel(): void {
    this.getCompanyList();
  }

  getCompanyList(): void {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status === 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error(`Error: ${error.message}`);
    }
  }

  selectTender(): void {
    this.selectedTender = this.tenderList.filter((x: any) => x.tender_id == this.documentForm.value.tender_id)[0];
  }

  getTenderListByCompany(): void {
    this.apiService.getTenderLisById(this.documentForm.value.company_id).subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderList = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.error(`Error: ${error.message}`);
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

  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  get f() {
    return this.documentForm.controls;
  }

  downloadPdf() {
    const pdfUrl = './assets/tamplate/country_bulkload_template_file.xlsx';
    const pdfName = 'country_bulkload_template_file.xlsx';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

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
    formData.append('tender_title', this.documentForm.value.tender_title);
    formData.append('tender_ref_no', this.documentForm.value.tender_ref_no);
    formData.append('total_tenure', this.documentForm.value.total_tenure);
    formData.append('start_date', this.documentForm.value.start_date);
    formData.append('end_date', this.documentForm.value.end_date);
    formData.append('utility', this.documentForm.value.utility);
    formData.append('publish_date', this.documentForm.value.publish_date);
    formData.append('description', this.documentForm.value.description);
    // this.apiService.createDocuments(formData).subscribe((res: any) => {
    //   if (res.status == 200) {
    //     this.documentForm.reset();
    //     this.alertService.success(res.message);
    //   } else {
    //     this.alertService.warning(res.message);
    //   }
    //   this.isSubmitted = false;
    //   document.getElementById('cancel')?.click();
    // }),
    // (error: any) => {
    //   this.isSubmitted = false;
    //   this.alertService.error(`Error: ${error.message}`);
    // }
  }
}

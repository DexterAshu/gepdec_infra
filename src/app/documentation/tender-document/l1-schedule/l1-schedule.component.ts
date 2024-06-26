import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-l1-schedule',
  templateUrl: './l1-schedule.component.html',
  styleUrls: ['./l1-schedule.component.css']
})

export class L1ScheduleComponent {
  today: any = new Date();
  documentForm!: FormGroup;
  attachment: any = [];
  attachmentName: any = [];
  isSubmitted: boolean = false;
  searchText: string = '';
  isNotFound: boolean = false;
  p: number = 1;
  limit = environment.pageLimit;
  apiURL = environment.apiUrl;
  docListData: any;
  companyData: any;
  tenderList: any = [];
  selectedTender: any;
  selectedRow: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService, private elementRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.getData();
    this.documentForm = this.fb.group({
      company_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      total_tenure: [null, Validators.required],
      attachment: [null],
      description: [null]
    });
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
    this.docListData = [];
    this.isNotFound = false;
    const apiLink = `/document/api/v1/getL1ScheduleList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.error("Error: Unknown Error!");
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
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  selectRow(data: any): void {
    this.selectedRow = data;
  }

  selectTender(): void {
    this.selectedTender = this.tenderList.filter((x: any) => x.tender_id == this.documentForm.value.tender_id)[0];
  }

  getTenderListByCompany(): void {
    this.tenderList = [];
    this.selectTender();
    const apiLink = `/biding/api/v1/getTenderlist?company_id=${this.documentForm.value.company_id}`
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderList = res.result;
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
    this.attachment = [];
    this.attachmentName = [];
    const files = event.target.files;
    for( let file of files) {
      this.attachment.push(file);
      this.attachmentName.push({name: file.name, size: file.size, date: new Date(file.lastModified).toISOString()});
    }
    event.target.value = '';
  }

  deleteFile(index: number): void {
    this.attachment.splice(index, 1);
    this.attachmentName.splice(index, 1);
  }

  get f() { return this.documentForm.controls; }

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
    formData.append('tender_id', this.documentForm.value.tender_id);
    formData.append('company_id', this.documentForm.value.company_id);
    formData.append('tender_completion_period', this.documentForm.value.total_tenure);
    formData.append('description', this.documentForm.value.description);
    this.apiService.l1DocumentUpload(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.documentForm.reset();
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
        this.getData();
      } else {
        this.alertService.warning(res.message);
      }
      this.isSubmitted = false;
    }),
    (error: any) => {
      console.error(error);
      this.isSubmitted = false;
      this.alertService.error("Error: Unknown Error!");
    }
  }
}

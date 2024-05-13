import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-drawing-list',
  templateUrl: './master-drawing-list.component.html',
  styleUrls: ['./master-drawing-list.component.css']
})
export class MasterDrawingListComponent {
  isOpen: boolean = false;
  searchText: any
  docListData: any = [];
  p: number = 1;
  limit = environment.pageLimit;
  form!: FormGroup;
  selectedTender: any;
  companyData: any = [];
  tenderList: any = [];
  attachment: any = [];
  listOfFiles: any = [];
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      client: [null, Validators.required],
      tender_id: [null, Validators.required],
      drawingList: new FormArray([]),
      document_title: [null, Validators.required],
      document_number: [null, Validators.required],
      description: [null, Validators.required],
      discipline: [null, Validators.required],
      sub_discipline: [null, Validators.required],
      stage: [null, Validators.required],
      category: [null, Validators.required],
      planned_submission: [null],
      remarks: [null]
    });
  }

  get f() { return this.form.controls; }

  addDrawingList(): void {
    let match: any = {
      document_title: this.form.value.document_title,
      document_number: this.form.value.document_number,
      description: this.form.value.description,
      discipline: this.form.value.discipline,
      sub_discipline: this.form.value.sub_discipline,
      stage: this.form.value.stage,
      category: this.form.value.category,
      planned_submission: this.form.value.planned_submission,
      remarks: this.form.value.remarks
    };
    this.form.value.drawingList.push(match);
    this.form.patchValue({
      document_title: null,
      document_number: null,
      description: null,
      discipline: null,
      sub_discipline: null,
      stage: null,
      category: null,
      planned_submission: null,
      remarks: null
    });
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
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
    const apiLink = `/biding/api/v1/getTenderlist?comapany_id=${this.form.value.client}`;
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
    this.selectedTender = this.tenderList.filter((tender: any) => tender.tender_id == this.form.value.tender_id)[0];
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

  onSubmit() {
    delete this.form.value.document_title;
    delete this.form.value.document_number;
    delete this.form.value.description;
    delete this.form.value.discipline;
    delete this.form.value.sub_discipline;
    delete this.form.value.stage;
    delete this.form.value.category;
    delete this.form.value.planned_submission;
    delete this.form.value.remarks;
    console.log(JSON.stringify(this.form.value));
    // const formData: FormData = new FormData();
    // for (let i = 0; i < this.attachment.length; i++) {
    //   formData.append('attachment', this.attachment[i]);
    // }
    // formData.append('bank_name', this.form.value.bank_name);
    // formData.append('bgnumber', this.form.value.bgnumber);
    // formData.append('bgamount', this.form.value.bgamount);
    // formData.append('start_date', this.form.value.start_date);
    // formData.append('end_date', this.form.value.end_date);
    // formData.append('submission_date', this.form.value.submission_date);
    // formData.append('extend_date', this.form.value.extend_date);
    // formData.append('publish_date', this.form.value.publish_date);
    // formData.append('tender_ref_no', this.form.value.tender_ref_no);
    // formData.append('tender_title', this.form.value.tender_title);
    // formData.append('utility', this.form.value.utility);
    // formData.append('description', this.form.value.description);
    // this.isSubmitted = true;
    // this.apiService.createDocuments(formData).subscribe((res: any) => {
    //   if (res.status == 200) {
    //     this.form.reset();
    //     this.alertService.success(res.message);
    //     document.getElementById('cancel')?.click();
    //   } else {
    //     this.alertService.warning(res.message);
    //   }
    // }),
    // (error: any) => {
    //   this.alertService.error(error);
    // }
    // this.isSubmitted = false;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

}

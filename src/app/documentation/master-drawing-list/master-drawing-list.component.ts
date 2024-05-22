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
    searchText: any
  p: number = 1;
  limit = environment.pageLimit;
  apiURL = environment.apiUrl;
  form!: FormGroup;
  approvalForm!: FormGroup;
  selectedTender: any;
  selectMDLRow: any;
  companyData: any = [];
  tenderList: any = [];
  attachment: any = [];
  listOfFiles: any = [];
  mdlData: any = [];
  isSubmitted: boolean = false;
  isNotFound: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
    this.getMDLList();
  }

  formInit(): void {
    this.form = this.fb.group({
      client: [null, Validators.required],
      tender_id: [null, Validators.required],
      mdl_no: [null, Validators.required],
      drawingList: new FormArray([]),
      drawing_title: [null, Validators.required],
      drawing_no: [null, Validators.required],
      discipline: [null, Validators.required],
      stage: [null, Validators.required],
      category: [null, Validators.required],
      planned_submission_date: [null],
      remarks: [null]
    });
    this.approvalForm = this.fb.group({
      approval_file: [null, Validators.required],
      remarks: [null]
    });
  }

  get f() { return this.form.controls; }

  get a() { return this.approvalForm.controls; }

  addDrawingList(): void {
    let match: any = {
      drawing_title: this.form.value.drawing_title,
      drawing_no: this.form.value.drawing_no,
      discipline: this.form.value.discipline,
      stage: this.form.value.stage,
      category: this.form.value.category,
      planned_submission_date: this.form.value.planned_submission_date,
      remarks: this.form.value.remarks
    };
    if(match.drawing_title && match.drawing_no && match.discipline && match.stage && match.category) {
      this.form.value.drawingList.push(match)
      this.form.controls['drawing_title'].reset();
      this.form.controls['drawing_no'].reset();
      this.form.controls['discipline'].reset();
      this.form.controls['stage'].reset();
      this.form.controls['category'].reset();
      this.form.controls['planned_submission_date'].reset();
      this.form.controls['remarks'].reset();
    }
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getMDLRow(data: any): void {
    this.selectMDLRow = data;
  }

  getMDLList(): void {
    this.mdlData = [];
    this.isNotFound = false;
    const apiLink = `/drawing/api/v1/getMDLList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.mdlData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.mdlData = undefined;
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.isNotFound = true;
      this.mdlData = undefined;
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
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
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getTenderList(): void {
    this.tenderList = [];
    const apiLink = `/biding/api/v1/getTenderlist?company_id=${this.form.value.client}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
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

  selectTender(): void {
    this.selectedTender = this.tenderList.filter((tender: any) => tender.tender_id == this.form.value.tender_id)[0];
  }

  deleteDrawingList(index: number): void {
    this.form.value.drawingList.splice(index, 1);
  }

  onFileChanged(event: any) {
    const files: any = (event.target as HTMLInputElement).files;
    this.attachment = files[0];
  }

  onSubmit() {
    delete this.form.value.drawing_title;
    delete this.form.value.drawing_no;
    delete this.form.value.discipline;
    delete this.form.value.stage;
    delete this.form.value.category;
    delete this.form.value.planned_submission_date;
    delete this.form.value.remarks;
    console.log(JSON.stringify(this.form.value));
    this.isSubmitted = true;
    this.apiService.addMDLList(this.form.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.getMDLList();
        this.form.reset();
        this.alertService.success(res.message);
        document.getElementById('cancelApprovalModel')?.click();
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.isSubmitted = false;
  }

  onApprovalSubmit() {
    console.log(JSON.stringify(this.selectMDLRow));
    const formData = new FormData();
    formData.append('drawing_id', this.selectMDLRow.drawing_id);
    formData.append('remarks', this.approvalForm.value.remarks);
    formData.append('approval_file', this.attachment);
    this.isSubmitted = true;
    this.apiService.uploadAndApprovedMDL(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.getMDLList();
        this.form.reset();
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

}

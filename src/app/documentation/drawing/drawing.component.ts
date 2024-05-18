import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent {
    searchText: any
  docListData: any = [];
  p: number = 1;
  limit = environment.pageLimit;
  apiURL = environment.apiUrl;
  form!: FormGroup;
  selectedTender: any;
  companyData: any = [];
  tenderList: any = [];
  imageUploadFile: any = [];
  uploadFile: any = [];
  mdlData: any = [];
  isSubmitted: boolean = false;
  isInHouse: boolean = false;
  isNotFound: boolean = false;
  selectRow: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.getMDLList();
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      doc_id: [null, Validators.required],
      drawingFrom: [null, Validators.required],
      artist: [null],
      drawingApprovedBy: [null],
      drawing: [null, Validators.required],
      file: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  get f() { return this.form.controls }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getMDLList(): void {
    this.mdlData = [];
    this.isNotFound = true;
    const apiLink = `/drawing/api/v1/getMDLList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.mdlData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = false;
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      this.isNotFound = false;
      this.alertService.error(error);
    }
  }

  getDrawingList(data: any): void {
    this.selectRow = data;
  }

  selectDrawingFrom(): void {
    this.form.controls['artist'].clearValidators();
    this.form.controls['drawingApprovedBy'].clearValidators();
    this.isInHouse = this.form.value.drawingFrom === 'In House';
    if (this.isInHouse) {
        this.form.controls['artist'].setValidators([Validators.required]);
        this.form.controls['drawingApprovedBy'].setValidators([Validators.required]);
    } else {
        this.form.controls['artist'].setValue(null);
        this.form.controls['drawingApprovedBy'].setValue(null);
    }
    this.form.controls['artist'].updateValueAndValidity();
    this.form.controls['drawingApprovedBy'].updateValueAndValidity();
  }

  onImageUpload(event: Event) {
    const files: any = (event.target as HTMLInputElement).files;
    this.imageUploadFile = files[0];
  }

  onFileUpload(event: Event) {
    const files: any = (event.target as HTMLInputElement).files;
    this.uploadFile = files[0];
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
    const formData: FormData = new FormData();
    formData.append('doc_id', this.form.value.doc_id);
    formData.append('drawing', this.imageUploadFile);
    formData.append('drawingFrom', this.form.value.drawingFrom);
    formData.append('file', this.uploadFile);
    formData.append('description', this.form.value.description);
    if(this.isInHouse) {
      formData.append('artist', this.form.value.artist);
      formData.append('drawingApprovedBy', this.form.value.drawingApprovedBy);
    }
    this.apiService.addDrawingDocument(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.form.reset();
        this.getMDLList();
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

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
}

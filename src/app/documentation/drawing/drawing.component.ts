import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent {
  isOpen: boolean = false;
  searchText: any
  docListData: any = [];
  p: number = 1;
  limit = environment.pageLimit;
  form!: FormGroup;
  selectedTender: any;
  companyData: any = [];
  tenderList: any = [];
  imageUploadFile: any = [];
  uploadFile: any = [];
  isSubmitted: boolean = false;
  isInHouse: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      client: [null, Validators.required],
      tender_id: [null, Validators.required],
      drawingFrom: [null, Validators.required],
      artist: [null],
      drawingApprovedBy: [null],
      drawing: [null, Validators.required],
      file: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  get f() { return this.form.controls }

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
    formData.append('client', this.form.value.client);
    formData.append('tender_id', this.form.value.tender_id);
    formData.append('drawing', this.imageUploadFile);
    formData.append('drawingFrom', this.form.value.drawingFrom);
    formData.append('file', this.uploadFile);
    formData.append('description', this.form.value.description);
    if(this.isInHouse) {
      formData.append('artist', this.form.value.artist);
      formData.append('drawingApprovedBy', this.form.value.drawingApprovedBy);
    }
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
    this.isSubmitted = false;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
}

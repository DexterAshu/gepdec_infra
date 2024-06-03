import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService, SharedService } from 'src/app/_services';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

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

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private elementRef: ElementRef, private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
    this.getMDLList();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  formInit(): void {
    this.approvalForm = this.fb.group({
      approval_file: [null, Validators.required],
      remarks: [null]
    });
  }

  get a() { return this.approvalForm.controls; }

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

  onFileChanged(event: any) {
    const files: any = (event.target as HTMLInputElement).files;
    this.attachment = files[0];
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

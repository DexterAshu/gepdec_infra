import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-l2-schedule-bulkdata',
  templateUrl: './l2-schedule-bulkdata.component.html',
  styleUrls: ['./l2-schedule-bulkdata.component.css']
})

export class L2ScheduleBulkdataComponent {
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  limits: any = [];
  loading: boolean = false;
  selectedRowData: any;
  l1ScheduleData: any = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      company_name: [null, Validators.required],
      tender_ref_no: [null, Validators.required]
    });
  }

  selectedRow(data: any) {
    this.selectedRowData = data;
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.isSubmitted = true;
    console.log(this.form.value);
  }
}

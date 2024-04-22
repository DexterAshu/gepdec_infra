import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService, ApiService, SharedService } from 'src/app/_services';

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

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.formInit();
    this.getL2ScheduleData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  formInit(): void {
    this.form = this.fb.group({
      company_name: [null, Validators.required],
      tender_ref_no: [null, Validators.required]
    });
  }

  getL2ScheduleData(): void {
    const apiLink = `/document/api/v1/getL2ScheduleList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.l1ScheduleData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.log(error);
      this.alertService.error(`Error: ${error.message}`);
    }
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

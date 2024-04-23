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
  editTaskForm!: FormGroup;
  editSubTaskForm!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  limits: any = [];
  loading: boolean = false;
  selectedRowData: any;
  l1ScheduleData: any;
  l2ScheduleData: any = [];
  companyList: any = [];
  tenderList: any = [];
  selectedTaskForEdit: any;
  selectedSubTaskForEdit: any;

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
      company_id: [null, Validators.required],
      tender_id: [null, Validators.required]
    });
    this.editTaskForm = this.fb.group({
      task_id: [null, Validators.required],
      parent_task_id: [null],
      task: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      childtasks: this.fb.array([])
    });
    this.editSubTaskForm = this.fb.group({
      task_id: [null, Validators.required],
      parent_task_id: [null, Validators.required],
      task: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    });
  }

  updateTask(): void {
    this.l1ScheduleData.data = this.l1ScheduleData.data.map((task: any) => {
      if (task.task_id === this.editTaskForm.value.task_id) {
        let match: any = task;
        match.task = this.editTaskForm.value.task;
        match.start_date = new Date(this.editTaskForm.value.start_date).toISOString();
        match.end_date = new Date(this.editTaskForm.value.end_date).toISOString();
        match.update = true;
        return match;
      } else {
        return task;
      }
    });
  }

 updateSubTask(): void {
   this.l1ScheduleData.data = this.l1ScheduleData.data.map((task: any) => {
     if (task.task_id === this.editSubTaskForm.value.parent_task_id) {
        task.childtasks = task.childtasks.map((subtask: any) => {
         if (subtask.task_id === this.editSubTaskForm.value.task_id) {
           debugger;
           let match: any = subtask;
           match.task = this.editSubTaskForm.value.task;
           match.start_date = new Date(this.editSubTaskForm.value.start_date).toISOString();
           match.end_date = new Date(this.editSubTaskForm.value.end_date).toISOString();
           match.update = true;
           return match;
         } else {
           return subtask;
         }
       });
       return task;
     } else {
       return task;
     }
   });
 }

  getCompanyList(): void {
    const apiLink = `/company/api/v1/getComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.companyList = res.result;
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.log(error);
      this.alertService.error(`Error: ${error.message}`);
    }
  }

  getTenderListByCompany(): void {
    this.tenderList = [];
    this.apiService.getTenderLisById(this.form.value.company_id).subscribe((res: any) => {
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

  getL1ScheduleDataByTender(): void {
    this.l1ScheduleData = null;
    const apiLink = `/document/api/v1/getL1ScheduleListByTender/${this.form.value.tender_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.l1ScheduleData = res.result[0];
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      this.alertService.error(`Error: ${error.message}`);
    }
  }

  getL2ScheduleData(): void {
    const apiLink = `/document/api/v1/getL2ScheduleList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.l2ScheduleData = res.result;
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

  get etf() { return this.editTaskForm.controls; }

  get estf() { return this.editSubTaskForm.controls; }

  editTaskRow(task: any) {
    this.selectedTaskForEdit = task;
    task.start_date = this.formatDate(new Date(task.start_date));
    task.end_date = this.formatDate(new Date(task.end_date));
    this.editTaskForm.patchValue(task);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {
      return `${num < 10 ? '0' : ''}${num}`;
  }

  editSubTaskRow(task: any, subTask: any) {
    console.log(task, subTask);
    this.selectedSubTaskForEdit = subTask;
    subTask.start_date = this.formatDate(new Date(subTask.start_date));
    subTask.end_date = this.formatDate(new Date(subTask.end_date));
    this.editSubTaskForm.patchValue(subTask);
  }

  onSubmit() {
    this.isSubmitted = true;
    let match: any = {
      l1schedule_id: this.l1ScheduleData.l1schedule_id,
      tender_id: this.l1ScheduleData.tender_id,
      l1_start_date: this.l1ScheduleData.l1_start_date,
      l1_end_date: this.l1ScheduleData.l1_end_date,
      tender_completion_period: this.l1ScheduleData.tender_completion_period,
      description: this.l1ScheduleData.description,
      publish_date: this.l1ScheduleData.publish_date,
      data: this.l1ScheduleData.data
    };
    console.log(match);
    this.apiService.l2ScheduleCreate(match).subscribe((res:any) => {
      if(res.status === 200) {
        this.alertService.success(res.message);
        this.getL2ScheduleData();
        document.getElementById('closed')?.click();
      } else {
        this.alertService.error(res.message);
      }
      this.isSubmitted = false;
    }),
    (error: any) => {
      this.alertService.error(`Error: ${error.message}`);
      this.isSubmitted = false;
    }
  }
}

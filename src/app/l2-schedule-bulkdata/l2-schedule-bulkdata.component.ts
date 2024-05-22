import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService, ApiService, SharedService } from 'src/app/_services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-l2-schedule-bulkdata',
  templateUrl: './l2-schedule-bulkdata.component.html',
  styleUrls: ['./l2-schedule-bulkdata.component.css']
})

export class L2ScheduleBulkdataComponent {
  form!: FormGroup;
  today: any = new Date();
  editTaskForm!: FormGroup;
  addTaskForm!: FormGroup;
  editSubTaskForm!: FormGroup;
  addSubTaskForm!: FormGroup;
  documentForm!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  update: boolean = false;
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  limits: any = [];
  loading: boolean = false;
  selectedRowData: any;
  l1ScheduleData: any;
  l2ScheduleData: any = [];
  companyList: any = [];
  selectedTender: any;
  tenderList: any = [];
  selectedTaskForEdit: any;
  selectedSubTaskForEdit: any;
  addNewSubTaskInSelectedTask: any;
  attachment: any = [];
  attachmentName: any = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.formInit();
    this.getL2ScheduleData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  formInit(): void {
    this.documentForm = this.fb.group({
      company_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      total_tenure: [null, Validators.required],
      attachment: [null],
      description: [null]
    });
    this.form = this.fb.group({
      company_id: [null, Validators.required],
      tender_id: [null, Validators.required]
    });
    this.editTaskForm = this.fb.group({
      task_id: [null, Validators.required],
      parent_task_id: [null],
      task: [null, Validators.required],
      task_start_date: [null, Validators.required],
      task_end_date: [null, Validators.required],
      childtasks: this.fb.array([])
    });
    this.addSubTaskForm = this.fb.group({
      parent_task_id: [null, Validators.required],
      task: [null, Validators.required],
      task_start_date: [null, Validators.required],
      task_end_date: [null, Validators.required]
    });
    this.editSubTaskForm = this.fb.group({
      task_id: [null, Validators.required],
      parent_task_id: [null, Validators.required],
      task: [null, Validators.required],
      task_start_date: [null, Validators.required],
      task_end_date: [null, Validators.required]
    });
    this.addTaskForm = this.fb.group({
      task: [null, Validators.required],
      start_date: [null, Validators.required],
      task_start_date: [null, Validators.required],
      task_end_date: [null],
    });
  }

  get lu() { return this.documentForm.controls; }

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

  updateTask(): void {
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((task: any) => {
      if (task.task_id === this.editTaskForm.value.task_id) {
        let match: any = task;
        match.task = this.editTaskForm.value.task;
        match.task_start_date = new Date(this.editTaskForm.value.task_start_date).toISOString();
        match.task_end_date = new Date(this.editTaskForm.value.task_end_date).toISOString();
        match.days_difference = this.calculateAgeInDays(new Date(this.editTaskForm.value.task_start_date), new Date(this.editTaskForm.value.task_end_date));
        task.is_added = false;
        match.is_updated = true;
        task.is_deleted = false;
        return match;
      } else {
        return task;
      }
    });
  }

  createTask(): void {
    this.addTaskForm.value.task_start_date = new Date(this.addTaskForm.value.task_start_date).toISOString();
    this.addTaskForm.value.task_end_date = new Date(this.addTaskForm.value.task_end_date).toISOString();
    this.addTaskForm.value.days_difference = this.calculateAgeInDays(new Date(this.addTaskForm.value.task_start_date), new Date(this.addTaskForm.value.task_end_date));
    this.addTaskForm.value.is_added = true;
    this.addTaskForm.value.is_updated = false;
    this.addTaskForm.value.is_deleted = false;
    this.l1ScheduleData.tasks.push(this.addTaskForm.value);
  }

  removeTask(task: any): void {
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((t: any) => {
      if (t.task_id === task.task_id) {
        t.is_added = false;
        t.is_updated = false;
        t.is_deleted = true;
        return t;
      } else {
        return t;
      }
    });
  }

  addSubTask(task: any): void {
    console.log(task);
    this.addNewSubTaskInSelectedTask = task;
  }

  updateSubTask(): void {
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((task: any) => {
      if (task.task_id === this.editSubTaskForm.value.parent_task_id) {
        task.childtasks = task.childtasks.map((subtask: any) => {
          if (subtask.task_id === this.editSubTaskForm.value.task_id) {
            let match: any = subtask;
            match.task = this.editSubTaskForm.value.task;
            match.task_start_date = new Date(this.editSubTaskForm.value.task_start_date).toISOString();
            match.task_end_date = new Date(this.editSubTaskForm.value.task_end_date).toISOString();
            match.days_difference = this.calculateAgeInDays(new Date(this.editSubTaskForm.value.task_start_date), new Date(this.editSubTaskForm.value.task_end_date));
            subtask.is_added = false;
            match.is_updated = true;
            subtask.is_deleted = false;
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

  createSubTask(): void {
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((task: any) => {
      if (task.task_id === this.addNewSubTaskInSelectedTask.task_id) {
        this.addSubTaskForm.value.task_start_date = new Date(this.addSubTaskForm.value.task_start_date).toISOString();
        this.addSubTaskForm.value.task_end_date = new Date(this.addSubTaskForm.value.task_end_date).toISOString();
        this.addSubTaskForm.value.days_difference = this.calculateAgeInDays(new Date(this.addSubTaskForm.value.task_start_date), new Date(this.addSubTaskForm.value.task_end_date));
        this.addSubTaskForm.value.parent_task_id = this.addNewSubTaskInSelectedTask.task_id;
        this.addSubTaskForm.value.is_added = true;
        this.addSubTaskForm.value.is_updated = false;
        this.addSubTaskForm.value.is_deleted = false;
        if (task?.childtasks?.length) {
          task.childtasks.push(this.addSubTaskForm.value);
        } else {
          task.childtasks = [this.addSubTaskForm.value];
        }
        return task;
      } else {
        return task;
      }
    });
    this.addSubTaskForm.reset();
    this.addNewSubTaskInSelectedTask = null;
  }

  removeSubTask(task: any, subTask: any): void {
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((t: any) => {
      if (t.task_id === task.task_id) {
        t.childtasks = t.childtasks.map((s: any) => {
          if (s.task_id === subTask.task_id) {
            s.is_added = false;
            s.is_updated = false;
            s.is_deleted = true;
            return s;
          } else {
            return s;
          }
        });
        return t;
      } else {
        return t;
      }
    });
  }

  getCompanyList(): void {
    this.update = false;
    const apiLink = `/company/api/v1/getComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.companyList = res.result;
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getTenderListByCompany(): void {
    this.tenderList = [];
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

  getL1ScheduleDataByTender(): void {
    this.l1ScheduleData = null;
    const apiLink = `/document/api/v1/getL1ScheduleListByTender/${this.form.value.tender_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.l1ScheduleData = res.result[0];
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  selectTender(): void {
    this.selectedTender = this.tenderList.filter((x: any) => x.tender_id == this.documentForm.value.tender_id)[0];
    this.getL1ScheduleData(this.selectedTender.tender_id);
  }

  getL1ScheduleData(tender_id: number): void {
    this.l1ScheduleData = [];
    const apiLink = `/document/api/v1/getL1ScheduleList?tender_id=${tender_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.l1ScheduleData = res.result;
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }

  getL2ScheduleData(): void {
    this.isNotFound = false;
    this.l2ScheduleData = [];
    const apiLink = `/document/api/v1/getL2ScheduleList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.l2ScheduleData = res.result;
      } else {
        this.isNotFound = true;
        this.l2ScheduleData = undefined;
        this.alertService.error(res.message);
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.l2ScheduleData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  selectedRow(data: any) {
    this.selectedRowData = data;
  }

  updateSelectedRow(data: any) {
    this.update = true;
    this.l1ScheduleData = data;
    this.l1ScheduleData.tasks = this.l1ScheduleData.tasks.map((task: any) => {
      if(task?.childtasks) {
        task.childtasks = task.childtasks.map((subtask: any) => {
          subtask.is_added = false;
          subtask.is_updated = false;
          return subtask;
        });
      }
      task.is_added = false;
      task.is_updated = false;
      return task;
    });
  }

  get f() { return this.form.controls; }

  get etf() { return this.editTaskForm.controls; }

  get estf() { return this.editSubTaskForm.controls; }

  editTaskRow(task: any) {
    this.selectedTaskForEdit = task;
    task.task_start_date = this.formatDate(new Date(task.task_start_date));
    task.task_end_date = this.formatDate(new Date(task.task_end_date));
    this.editTaskForm.patchValue(task);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculateAgeInDays(startDate: Date, endDate: Date): number {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  editSubTaskRow(task: any, subTask: any) {
    this.selectedSubTaskForEdit = subTask;
    subTask.task_start_date = this.formatDate(new Date(subTask.task_start_date));
    subTask.task_end_date = this.formatDate(new Date(subTask.task_end_date));
    this.editSubTaskForm.patchValue(subTask);
  }

  onSubmit() {
    this.isSubmitted = true;
    let match: any = {
      schedule_id: this.l1ScheduleData.schedule_id,
      tender_id: this.l1ScheduleData.tender_id,
      level: this.l1ScheduleData.level,
      schedule_start_date: this.l1ScheduleData.schedule_start_date,
      schedule_end_date: this.l1ScheduleData.schedule_end_date,
      tender_completion_period: this.l1ScheduleData.tender_completion_period,
      description: this.l1ScheduleData.description,
      publish_date: this.l1ScheduleData.publish_date,
      tasks: this.l1ScheduleData.tasks
    };
    console.log(match);
    this.apiService.l2ScheduleCreate(match).subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.success(res.message);
        this.getL2ScheduleData();
        document.getElementById('createModelClose')?.click();
      } else {
        this.alertService.error(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.isSubmitted = false;
  }

  updateSubmit() {
    this.isSubmitted = true;
    let match: any = {
      schedule_id: this.l1ScheduleData.schedule_id,
      tender_id: this.l1ScheduleData.tender_id,
      level: this.l1ScheduleData.level,
      schedule_start_date: this.l1ScheduleData.schedule_start_date,
      schedule_end_date: this.l1ScheduleData.schedule_end_date,
      tender_completion_period: this.l1ScheduleData.tender_completion_period,
      description: this.l1ScheduleData.description,
      publish_date: this.l1ScheduleData.publish_date,
      tasks: this.l1ScheduleData.tasks
    };
    console.log(match);
    this.apiService.l2ScheduleUpdate(match).subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.success(res.message);
        this.getL2ScheduleData();
        document.getElementById('updateModelClose')?.click();
      } else {
        this.alertService.error(res.message);
      }
    }),
      (error: any) => {
        console.error(error);
        this.alertService.error("Error: Unknown Error!");
      }
    this.isSubmitted = false;
    this.update = false;
  }

  onL2UploadSubmit() {
    console.log(this.documentForm.value);
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
    formData.append('tender_id', this.documentForm.value.tender_id);
    formData.append('company_id', this.documentForm.value.company_id);
    formData.append('l1_start_date', this.documentForm.value.start_date);
    formData.append('l1_end_date', this.documentForm.value.end_date);
    formData.append('schedule_id', this.l1ScheduleData[0].schedule_id);
    formData.append('tender_completion_period', this.documentForm.value.total_tenure);
    formData.append('description', this.documentForm.value.description);
    this.apiService.l1ScheduleUpload(formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.documentForm.reset();
        this.alertService.success(res.message);
        document.getElementById('cancel')?.click();
        this.getL2ScheduleData();
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

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
}

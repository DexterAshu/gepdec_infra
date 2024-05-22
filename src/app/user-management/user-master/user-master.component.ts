import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  form!: FormGroup;

  p: number = 1;
  limit = environment.pageLimit;
  // meterPort = environment.meterPort;
  meterData: any = [];
  isNotFound: boolean = false;
  isData: boolean = false;
  isDataList: boolean = false;
  isPulling: boolean = false;
  meterDetailData: any;
  meterDataList: any;
  meterIndexData: any;
  filterNumber: any;
  filterData: any = [];
  titleData: any;
  filterType: any = 'PC';
  singleMeterData: any;
  dateForFilter: any;
  searchText: any;
  isUpdate: boolean = false;
  button: string = 'Create';
  // formData: any;
  isSubmitted: boolean = false;
  loadermsg: any;
  waitmsg: boolean = false;
  loading: boolean = false;
  tabledata: any;
  limits: any = [];
  userDetails: any;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  dropdownData: any;
  selectedRow: any;
  rowData: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usctit_id: [null, Validators.required],
      first_name: [null, Validators.required],
      middle_name: [null],
      last_name: [null, Validators.required],
      empid: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      res_phone: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailid: [null, [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]],
      usdt_id: [null, Validators.required],
      usdg_id: [null, Validators.required],
      reporting_to: [null, Validators.required],
      usrl_id: [null, Validators.required],
      isemployee: [null, Validators.required],
      sallary: [null, Validators.required],
    });
    this.getDataList();
    this.getUserData();
  }

  get f() { return this.form.controls; }

  getDataList(): void {
    this.tabledata = [];
    this.isNotFound = false;
    this.masterService.getUserList().subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.tabledata = res.result;
        this.limits.push({ key: 'ALL', value: this.tabledata.length });
      } else {
        this.isNotFound = true;
        this.tabledata = undefined;
        this.alertService.warning('Looks like no data available.');
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.tabledata = undefined;
      this.alertService.error('Error: Unknown Error!');
    });
  }

  //All dropdown API'S
  getUserData() {
    this.dropdownData = [];
    this.masterService.getUserMaster().subscribe((res: any) => {
      if(res.status == 200) {
        this.dropdownData = res;
      } else {
        this.alertService.warning('Looks like no data available in list.');
      }
    });
  }

  userDetail(data: any) {
    this.selectedRow = data;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  createForm() {
    this.isSubmitted = false;
    this.isUpdate = false;
    this.form.reset();
  }

  editUser(data: any) {
    this.rowData = data;
    this.isSubmitted = false;
    this.isUpdate = true;
    this.form.patchValue(this.rowData);
  }

  decisionFun() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.onSubmit();
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      this.form.controls['isemployee'].setValue(this.form.value.isemployee == 'true' ? true : false);

      if(this.isUpdate) {
        var formData = {
          ...this.form.value,
          user_id: this.rowData?.user_id
        };
      } else {
        var formData = {
          ...this.form.value
        };
      }

      (this.isUpdate ? this.masterService.userUpdate(formData) : this.masterService.userCreation(formData)).subscribe((res: any) => {
        this.isSubmitted = false;
        document.getElementById('closed')?.click();
        if (res.status == 200) {
          this.getDataList();
          this.form.reset();
          this.alertService.success(res.message);
        } else {
          this.alertService.warning('Something went wrong.');
        }
      }, error => {
        this.isSubmitted = false;
        document.getElementById('closed')?.click();
        this.alertService.error('Error: Unknown Error!');
      });
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

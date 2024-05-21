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
  tableHeight: any;
  filterNumber: any;
  filterData: any = [];
  titleData: any;
  filterType: any = 'PC';
  singleMeterData: any;
  dateForFilter: any;
  searchText: any;
  update: boolean = false;
  button: string = 'Create';
  formData: any;
  submitted: boolean = false;
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

    this.tableHeight = `${window.innerHeight * 0.65}px`;
    this.listData();
    this.getUserData();
  }
  createForm() {
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the table height when the window is resized
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  get f() { return this.form.controls; }

  listData(): void {
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
    this.masterService.getUserMaster().subscribe((res: any) => {
      // if(res.result ==)
      this.dropdownData = res;
    });
  }

  userDetail(data: any) {
    // this.form.controls['password'].clearValidators();
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.masterService.getuserdetail(data.user_id).subscribe((res: any) => {
      this.userDetails = res.result[0];
      // this.form.controls['usctit_id'].setValue(this.userDetails.usctit_id);
      this.form.patchValue({
        user_id: this.userDetails.user_id,
        first_name: this.userDetails.first_name,
        middle_name: this.userDetails.middle_name,
        last_name: this.userDetails.last_name,
        // loginname: this.userDetails.loginname,
        empid: this.userDetails.empid,
        emailid: this.userDetails.emailid,
        mobile: this.userDetails.mobile,
        res_phone: this.userDetails.res_phone,
        usctit_id: this.userDetails.usctit_id,
        usdt_id: this.userDetails.usdt_id,
        reporting_to: this.userDetails.reporting_to,
        usrl_id: this.userDetails.usrl_id,
      });
    });
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      this.button = 'Create';
      this.submitted = true;

      this.formData = this.form.value;

      //passing all values
      if (this.formData.empid != '') {
        this.formData.empid == '';
      } else {
        this.formData.empid = null;
      }
      if (this.formData.middle_name == "") {
        this.formData.middle_name = null;
      }
      if (this.formData.loginname == "") {
        this.formData.loginname = null;
      }
      if (this.formData.password == "") {
        this.formData.password = null;
      }
      if (this.formData.mobile == "") {
        this.formData.mobile = null;
      }
      if (this.formData.emailid == "") {
        this.formData.emailid = null;
      }
      if (this.formData.res_phone == "") {
        this.formData.res_phone = null;
      }

      this.loading = true;
      if (this.update) {

        this.userUpdate();
      } else {
        this.createUser();
      }
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  createUser() {
    this.formData.active = null,
      this.formData.inactive = null
    this.masterService.userCreation(this.formData).subscribe((res: any) => {

      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('closed')?.click();
        this.alertService.success(res.message);
      } else if (res.status == 201) {
        this.alertService.error(res.message);
      } else {
        this.alertService.error('Error, Something went wrong please check');
      }
    });

  }

  userUpdate(): void {
    // this.opac=0;
    // this.formData.status=this.status
    // this.formData.active=null,
    // this.formData.inactive=null
    this.formData.user_id = this.userDetails.user_id;
    this.loadermsg = "Updating..."
    this.masterService.userUpdation(this.formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.ngOnInit();
        // this.form.controls['password'].setValidators([Validators.required]);
        document.getElementById('closed')?.click();
        this.alertService.success('User Updated Successfully');
      } else {
        this.alertService.error('Something went wrong please try again');
      }
    });
  }
}

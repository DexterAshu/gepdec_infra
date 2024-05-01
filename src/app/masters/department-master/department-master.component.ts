import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css']
})
export class DepartmentMasterComponent {
  form!: FormGroup;
  p: number = 1;
  searchText:any;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  deptData: any = [];
  deptCount: any;
  inserteddata: any;
  discardeddata: any;
  userList: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      deptname: [null, Validators.required],
      // deptheadid: [null, Validators.required],

    });
    this.departmentData();

    this.masterService.getUserList().subscribe((res:any) =>{
        console.log("userlist", res);
       this.userList = res.result;
  })

  }

  get f() { return this.form.controls; }

  departmentData() {
    this.isNotFound = true;
    this.masterService.getUserMaster().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.deptCount = res;
      this.deptData = res.department;
          //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.deptData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }


  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      let params = {
        deptname: this.form.value.deptname,
        // deptheadid: this.form.value.deptheadid,
      };
      this.apiService.createMasterDepartment( params).subscribe((res:any) => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.departmentData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error:any) => {
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
     }
  }
}

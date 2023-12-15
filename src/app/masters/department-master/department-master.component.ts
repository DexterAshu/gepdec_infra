import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
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

  deptData: any;
  deptCount: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      deptname: [null, Validators.required],
     
    });
    this.departmentData();
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



  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      // if (this.form.value.deptname !== null) {
      //   var countryVal = this.countryData.filter((item: any) => {
      //     return item.deptheadid == this.form.value.deptname;
      //   });
      //   this.form.value.deptname = countryVal[0]['deptheadid'];
      // }
      // else {
      //   this.form.value.deptname = null;
      // } 

      let params = {
        deptname: this.form.value.deptname,
      };
      this.apiService.createMasterDepartment( params).subscribe((res:any) => {
        console.log(res);
        
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

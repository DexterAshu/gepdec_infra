import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {
  form!: FormGroup;
  p: number = 1;
  searchText:any;
  limit = environment.pageLimit;
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;

  designCount: any;
  designData: any = [];
  inserteddata: any;
  discardeddata: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designationname: [null, Validators.required],

    });

    this.designationData();

  }

  get f() { return this.form.controls; }

  designationData() {
    this.isNotFound = true;
    this.masterService.getUserMaster().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.designCount = res;
      this.designData = res.designation;
          //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.designData = [];
      this.isNotFound = false;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      // if (this.form.value.country_id !== null) {
      //   var countryVal = this.countryData.filter((item: any) => {
      //     return item.country_id == this.form.value.country_id;
      //   });
      //   this.form.value.country_id = countryVal[0]['country_id'];
      // }
      // else {
      //   this.form.value.country_id = null;
      // }

      let params = {
        designationname: this.form.value.designationname,
      };
      this.apiService.createMasterDesignation( params).subscribe((res:any) => {

        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.designationData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error:any) => {
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: Unknown Error!");
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
     }
  }
}

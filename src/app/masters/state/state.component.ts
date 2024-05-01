import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  form!: FormGroup;
  p: number = 1;
  searchText:any;
  limit = environment.pageLimit;
  stateData: any = [];
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  stateCount: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  rowData: any;
  update: boolean = false;
  button: string = 'Create';
  loading: boolean = false;
  districtDetails: any;
  stateDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      state_name: [null, Validators.required],
      state_code: [null, Validators.required],
      country_id: [null, Validators.required],
    });

    this.getStateData();
     this.getCountryData();
  }

  get f() { return this.form.controls; }

  getDetails(data:any){
    this.rowData = [];
    this.rowData = data;
  }

  getdatapatch(data:any){
    this.button = 'Update';
    this.update = true;
      this.stateDetails = data;
        this.form.patchValue({
          country_id: this.stateDetails.country_id,
          state_code: this.stateDetails.state_code,
          state_name: this.stateDetails.state_name,
        });
  }

  getStateData() {
    this.isNotFound = true;
    this.masterService.getStateData().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.stateCount = res;
      this.stateData = res.result;
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.stateData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
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

  createForm(){
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }


  onSubmit() {
    if (this.form.valid) {
        this.isSubmitted = true;
        this.loading = true;
    if (this.update) {
      this.stateUpdate();
    } else {
      this.createState();
    }
    }
  }

  createState() {
    let params = {
      country_id: this.form.value.country_id,
      state_name: this.form.value.state_name,
      state_code: this.form.value.state_code.toUpperCase(),
    };
    this.apiService.createMasterState( params).subscribe((res:any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.getStateData();
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error:any) => {
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: " + error.statusText);
      })
  }
  stateUpdate(): void {
    this.form.value.country_id =  this.stateDetails.country_id;
    this.form.value.state_id =  this.stateDetails.state_id;
    this.apiService.stateMasterUpdation(this.form.value).subscribe((res: any) => {
      document.getElementById('cancel')?.click();
      this.getStateData();
       this.isSubmitted = false;
       if (res.status == 200) {
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
  }, (error) => {
    this.isSubmitted = false;
    document.getElementById('cancel')?.click();
    this.alertService.error("Error: " + error.statusText);
  });
  }

}

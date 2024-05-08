import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent {
  form!: FormGroup;
  p: number = 1;
  searchText:any;
  limit = environment.pageLimit;
  stateData: any = [];
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  stateCount: any;
  countCount: any;
  countData: any = [];
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  countryDetails: any;
  rowData: any;
  update: boolean = false;
  button: string = 'Create';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country_code: [null, Validators.required],
      name: [null, Validators.required],
    });

    this.getCountryList();

  }

  get f() { return this.form.controls; }
  getDetails(data:any){
    this.rowData = [];
    this.rowData = data;
  }

  getdatapatch(data:any){
    this.button = 'Update';
    this.update = true;
      this.countryDetails = data;
        this.form.patchValue({
          country_code: this.countryDetails.country_code,
          name: this.countryDetails.name,
        });
  }

  getCountryList() {
    this.isNotFound = true;
    this.apiService.getCountryDataList().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.countCount = res;
      this.countData = res.result;
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.countData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
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
      this.countryUpdate();
    } else {
      this.createCountry();
    }
    }
  }

  createCountry() {
    let params = {
      name: this.form.value.name,
      country_code: this.form.value.country_code.toUpperCase(),
    };
    this.apiService.createMasterCountry( params).subscribe((res:any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('closed')?.click();
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
    }, error => {
      this.countData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    })
  }
  countryUpdate(): void {
    this.form.value.country_id =  this.countryDetails.country_id;
    this.apiService.countryMasterUpdation(this.form.value).subscribe((res: any) => {
      document.getElementById('cancel')?.click();
      this.getCountryList();
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

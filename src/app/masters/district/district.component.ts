import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  districtData:any = [];
  isNotFound:boolean = false;
  stateData: any;
  countryData: any;
  isSubmitted:boolean = false
  searchText:any;
  distCount: any;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  rowData: any;
  update: boolean = false;
  button: string = 'Create';
  loading: boolean = false;
  districtDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      state_id: [null, Validators.required],
      district_name: [null, Validators.required],
    });

    this.getDistrictData();
    this.getStateData();
    // this.getCountryData();
  }

  get f() { return this.form.controls; }
  getDetails(data:any){
    this.rowData = [];
    this.rowData = data;
   
  }

  getdatapatch(data:any){
    this.button = 'Update';
    this.update = true;
      this.districtDetails = data;
      console.log( this.districtDetails);
      
        this.form.patchValue({
          state_id: this.districtDetails.state_id,
          district_name: this.districtDetails.district_name,

        });
 
  }
  getStateData() {
    this.masterService.getStateData().subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected state.`);
      }
    });
  }
 

  getDistrictData() {
    this.districtData = [];
    this.isNotFound = false;
    this.masterService.getDistrictData().subscribe((res:any) => {
      if (res.status == 200) {
        this.distCount = res;
        this.districtData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.districtData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.districtData = undefined;
      this.alertService.error("Error: Unknown Error!")
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
        if (this.form.value.state_id != '') {
          if (this.form.value.state_id) {
            var stat = this.stateData.filter((item: any) => {
              return item.state_id == this.form.value.state_id;
            });
            this.form.value.state_id = stat[0]['state_id'];
          }
        } else {
          this.form.value.state_id = null;
        }
    if (this.update) {  
      this.districtUpdate();
    } else {
      this.createDistrict();
    }

    }
  }

  createDistrict() {
    let params = {
        state_id: this.form.value.state_id,
        district_name: this.form.value.district_name,
    };
    this.apiService.addMasterDistrict(params).subscribe((res:any )=> {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.getDistrictData();
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error) => {
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        this.alertService.error("Error: Unknown Error!");
      })
  } 
  
  districtUpdate(): void {
    this.form.value.state_id =  this.districtDetails.state_id;
    this.form.value.district_id =  this.districtDetails.district_id;
    this.apiService.districtMasterUpdation(this.form.value).subscribe((res: any) => {
      document.getElementById('cancel')?.click();
      this.getDistrictData();
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
    this.alertService.error("Error: Unknown Error!");
  });
  }
}

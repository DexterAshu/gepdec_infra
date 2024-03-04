import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  districtData:any;
  isNotFound:boolean = false;
  stateData: any;
  countryData: any;
  isSubmitted:boolean = false
  searchText:any;
  distCount: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
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
      state_id: [null, Validators.required],
      district_name: [null, Validators.required],
    });

    this.getDistrictData();
    this.getStateData();
    // this.getCountryData();
  }

  get f() { return this.form.controls; }

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
    this.isNotFound = true;
    this.masterService.getDistrictData().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.distCount = res;
      this.districtData = res.result;
        // this.districtData = res.data.filter((data:any) => data.active == 'Y');
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.districtData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    }); 
  }


  exportAsXLSX1(){
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
     var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);          
    var wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");  
     XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");        
    XLSX.writeFile(wb, "Data_File.xlsx");
               
        }
downloadPdf() {
  const pdfUrl = './assets/tamplate/dist_bulkload_template_file.xlsx';
  const pdfName = 'dist_bulkload_template_file.xlsx';
  FileSaver.saveAs(pdfUrl, pdfName);
}

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }


  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      //passing state id
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
      let params = {
        state_id: this.form.value.state_id,
        district_name: this.form.value.district_name,
      };
      // let apiLink = '/master/district/createDistrict';
      this.apiService.addMasterDistrict(params).subscribe((res:any )=> {
        console.log(res);
        
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
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

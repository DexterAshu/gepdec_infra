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
  stateData: any ;
  isNotFound:boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  stateCount: any;
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
      state_name: [null, Validators.required],
      state_code: [null, Validators.required],
      country_id: [null, Validators.required],
    });
    
    this.getStateData();
     this.getCountryData();
  }

  get f() { return this.form.controls; }

  getStateData() {
    this.isNotFound = true;
    this.masterService.getStateData().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.stateCount = res;
      this.stateData = res.result;
          //   this.stateData = res.result.filter((data:any) => data.active == 'Y');
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

  exportAsXLSX1(){
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
     var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);          
    var wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");  
     XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");        
    XLSX.writeFile(wb, "Data_File.xlsx");
               
        }
downloadPdf() {
  const pdfUrl = './assets/tamplate/state_bulkload_template_file.xlsx';
  const pdfName = 'state_bulkload_template_file.xlsx';
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

      if (this.form.value.country_id !== null) {
        var countryVal = this.countryData.filter((item: any) => {
          return item.country_id == this.form.value.country_id;
        });
        this.form.value.country_id = countryVal[0]['country_id'];
      }
      else {
        this.form.value.country_id = null;
      } 

      let params = {
        country_id: this.form.value.country_id,
        state_name: this.form.value.state_name,
        state_code: this.form.value.state_code.toUpperCase(),
      };
      // let apiLink = '/master/state/createState';
      this.apiService.createMasterState( params).subscribe((res:any) => {
        console.log(res);
        
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
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
     }
  }
}

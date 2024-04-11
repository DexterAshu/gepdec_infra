import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-our-company-finanace-data',
  templateUrl: './our-company-finanace-data.component.html',
  styleUrls: ['./our-company-finanace-data.component.css']
})
export class OurCompanyFinanaceDataComponent {
  form!: FormGroup;  
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any = [];
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country:any;
  limits: any = [];

  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
  contDetails: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  financialData: any;
  finDetails: any;
  discardeddata: any = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      financialyear_id:[null, Validators.required],
      annual_turnover: [null, Validators.required],
      net_worth: [null, Validators.required],
      bidder_id: [null, Validators.required]
    });

    this.apiService.getourCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
    })

  this.finYearData();
  }

  get f() { return this.form.controls; }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res:any) => {
      this.isNotFound = false;
      if (res.status == 200) {
      this.financialData = res.result;
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
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

  // getDetails(data:any){
  //   this.form.reset();
  //   this.button = 'Update';
  //   this.update = true;
  //   this.apiService.ourcompanyDetails(data.bidder_id).subscribe((res: any) => {
  //     this.finDetails = res.result[0];
  //       this.form.patchValue({
  //         financialyear_id: this.finDetails.financialyear_id,
  //         annual_turnover: this.finDetails.annual_turnover,
  //         net_worth: this.finDetails.net_worth,
  //         bidder_id: this.finDetails.bidder_id
  //       }); 
  // })
  // }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        financialyear_id: this.finDetails.financialyear_id,
        annual_turnover: this.finDetails.annual_turnover,
        net_worth: this.finDetails.net_worth,
        bidder_id: this.finDetails.bidder_id
      };
      this.apiService.addMasterOurFinData(params).subscribe((res:any )=> {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          
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


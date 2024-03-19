import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-fin-year',
  templateUrl: './fin-year.component.html',
  styleUrls: ['./fin-year.component.css']
})
export class FinYearComponent {
  form!: FormGroup;
  p: number = 1;
  searchText: any;
  limit = environment.pageLimit;
  isNotFound: boolean = false;
  countryData: any;
  isSubmitted: boolean = false;
  designCount: any;
  designData: any = [];
  financialData: any = [];
  finCount: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData: boolean = true;
  inserteddata: any;
  discardeddata: any;

  constructor(private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    });
    this.finYearData();
  }

  get f() { return this.form.controls; }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res: any) => {
      this.isNotFound = false;
      if (res.status == 200) {
        this.finCount = res;
        this.financialData = res.result;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.designData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  exportAsXLSX1() {
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
    var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");
    XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");
    XLSX.writeFile(wb, "Data_File.xlsx");

  }
  downloadPdf() {
    const pdfUrl = './assets/tamplate/country_bulkload_template_file.xlsx';
    const pdfName = 'country_bulkload_template_file.xlsx';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        start_date: this.form.value.start_date,
        end_date: this.form.value.end_date,
      };
      this.apiService.createMasterFinYear(params).subscribe((res: any) => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.finYearData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error: any) => {
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: " + error.statusText);
      })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

}

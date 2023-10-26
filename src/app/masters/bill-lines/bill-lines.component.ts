import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-bill-lines',
  templateUrl: './bill-lines.component.html',
  styleUrls: ['./bill-lines.component.css']
})
export class BillLinesComponent implements OnInit {

  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  billLineData: any;
  searchText:any;
  isNotFound:boolean = false;
  isSubmitted:boolean = false;
  rowData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getBillLineData();
  }

  getBillLineData() {
    this.isNotFound = true;
    this.masterService.getBillLineData().subscribe((res:any) => {
      this.isNotFound = false;
      this.billLineData = [];
      if (res.status === true) {
        // this.billLineData = res.data.filter((data:any) => data.active == 'Y');
        this.billLineData = res.data;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.billLineData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  lineData(row:any) {
    debugger
    this.rowData = [];
    let keys = Object.keys(row.lines);
    this.rowData = keys.map(key => ({ key, value: row.lines[key] }));
  }

  onSubmit(){
    console.log(this.form);
  }

}

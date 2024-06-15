import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService, AlertService, MasterService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pre-sales-drawing',
  templateUrl: './pre-sales-drawing.component.html',
  styleUrls: ['./pre-sales-drawing.component.css']
})
export class PreSalesDrawingComponent {
  searchText: any
  docListData: any = [];
  p: number = 1;
  limit = environment.pageLimit;
  apiURL = environment.apiUrl;
  form!: FormGroup;
  selectedTender: any;
  companyData: any = [];
  tenderList: any = [];
  imageUploadFile: any = [];
  uploadFile: any = [];
  mdlData: any = [];
  isSubmitted: boolean = false;
  isNotFound: boolean = false;
  selectRow: any;

  constructor(private apiService: ApiService, private alertService: AlertService, private masterService: MasterService) {}

  ngOnInit(): void {
    this.getMDLList();
  }

  rowLocation(rowData: any): void {
    this.masterService.openModal(rowData?.tender_id);
  }

  getMDLList(): void {
    this.mdlData = [];
    this.isNotFound = true;
    const apiLink = `/drawing/api/v1/getMDLList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if(res.status === 200) {
        this.mdlData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = false;
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => {
      console.error(error);
      this.isNotFound = false;
      this.alertService.error(error);
    }
  }

  getDrawingList(data: any): void {
    this.selectRow = data;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
}

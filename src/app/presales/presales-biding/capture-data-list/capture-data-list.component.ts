import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService, AccountService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-data-list',
  templateUrl: './capture-data-list.component.html',
  styleUrls: ['./capture-data-list.component.css']
})
export class CaptureDataListComponent {
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
  isExcelDownload: boolean = false;
  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any;
  isExcelDownloadData: boolean = true;
  userData: any;
  statusData: any;
  rowData: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private user: AccountService,
    private router: Router,
  ) {
    const userDataString = localStorage.getItem('gdUserData');
   
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
   }

 ngOnInit(){
    this.getTenderData();
  }

  //  getDetails(data:any){
  //   console.log(data);
  //   if (data) {
  //     if (this.userData && this.userData.rolename === "Administrator") {
  //       this.router.navigate(['presales/presales-biding/management-approval',data]);
  //     } else {
  //       this.router.navigate(['/presales/presales-biding/data-capture',data]);
  //     }
  //     this.router.navigate(['/presales/presales-biding/data-capture']);
  //     this.button = 'Update';
  //     this.update = true;
  //   } else {}
   
  // }
   getDetails(data:any){
    console.log(data);
    if (data) {
        this.router.navigate(['/presales/presales-biding/data-capture',data]);
      } else {
        this.router.navigate(['/presales/presales-biding/data-capture']);
      }
      this.button = 'Update';
      this.update = true;
    } 

    rowListData(row:any) {
      this.rowData = [];
      this.rowData = row;
      console.log( this.rowData);
      
    }
   
  //button dropdown
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  get f() { return this.form.controls; }
  
  getTenderData() {
    this.apiService.getTenderList().subscribe((res: any) => {  
      this.companyData = res.result;
      this.statusData = res.counts;
    });
    this.apiService.getTenderType().subscribe((res: any) => {  
      this.tenderType = res.bidtype;
    });
 
  }
  

//status-filter
gettaball(data:any)
  {
    // this.dataSource = new MatTableDataSource(this.casetabledata);
    // this.setDataSourceAttributes()

  }
getnewcase(data:any)
{
 
  // var newCases=this.casetabledata.filter((res:any)=>{
  //   return res.status==="New"
  // })
  // console.log(newCases);
  //       this.dataSource = new MatTableDataSource(newCases);
  //       this.setDataSourceAttributes()

  
}
getopencase(data:any)
{

// var openCases=this.casetabledata.filter((res:any)=>{
//   return res.status==="Open"
// })
// console.log(openCases);
//       this.dataSource = new MatTableDataSource(openCases);
//       this.setDataSourceAttributes()

}
getholdcase(data:any)
{

// var holdcase=this.casetabledata.filter((res:any)=>{
//   return res.status==="On Hold"
// })
// console.log(holdcase);
//       this.dataSource = new MatTableDataSource(holdcase);
//       this.setDataSourceAttributes()

}
getclosecase(data:any)
{

// var closed=this.casetabledata.filter((res:any)=>{
//   return res.status==="Closed"
// })
// console.log(closed);
//       this.dataSource = new MatTableDataSource(closed);
//       this.setDataSourceAttributes()

}
underreviewdata(data:any)
{

// var closed=this.casetabledata.filter((res:any)=>{
//   return res.status==="Closed"
// })
// console.log(closed);
//       this.dataSource = new MatTableDataSource(closed);
//       this.setDataSourceAttributes()

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
const pdfUrl = './assets/tamplate/country_bulkload_template_file.xlsx';
const pdfName = 'country_bulkload_template_file.xlsx';
FileSaver.saveAs(pdfUrl, pdfName);
}

download(): void {
  let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
    display: false,
    raw: true,
  });
  XLSX.writeFile(wb, 'Data_File.xlsx');
}



}

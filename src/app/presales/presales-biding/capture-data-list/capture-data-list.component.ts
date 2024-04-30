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
  tenderData: any = [];
  isNotFound: boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country: any;
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
  tendStatus: any;
  showWorkingDetails: boolean = false;
  showPreNotes: boolean = false;
  isOpen: boolean = false;
  techDataShow: boolean = false;
  tendStatusData: any;
  data: any;

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

  ngOnInit() {
    this.form = this.formBuilder.group({
      tenderstatus_id: ['', Validators.required],
      working_notes: ['', Validators.required],
      audit_trail: [null],
    });

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

  getDetails(data: any) {
    console.log(data);
    if (data) {
      this.router.navigate(['/presales/presales-biding/data-capture', data]);
    } else {
      this.router.navigate(['/presales/presales-biding/data-capture']);
    }
    this.button = 'Update';
    this.update = true;
  }

  rowListData(row: any) {
    this.rowData = row;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  get f() { return this.form.controls; }

  getTenderData() {
    this.tenderData = [];
    this.tenderType = [];
    this.tendStatus = [];
    this.isNotFound = false;

    this.apiService.getTenderList().subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderData = res.result;
        this.statusData = res.counts;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.tenderData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.tenderData = undefined;
      this.alertService.error("Error: " + error.statusText)
    });

    this.apiService.getTenderType().subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderType = res.bidtype;
        this.tendStatus = res.roleStatus;
      } else {
        this.tenderType = undefined;
        this.tendStatus = undefined;
        // this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.tenderType = undefined;
      this.tendStatus = undefined;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  //status-filter
  gettaball(data: any) {
    // this.dataSource = new MatTableDataSource(this.casetabledata);
    // this.setDataSourceAttributes()

  }
  getnewcase(data: any) {
    // var newCases=this.casetabledata.filter((res:any)=>{
    //   return res.status==="New"
    // })
    // console.log(newCases);
    //       this.dataSource = new MatTableDataSource(newCases);
    //       this.setDataSourceAttributes()
  }

  getopencase(data: any) {
    // var openCases=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Open"
    // })
    // console.log(openCases);
    //       this.dataSource = new MatTableDataSource(openCases);
    //       this.setDataSourceAttributes()
  }

  getholdcase(data: any) {
    // var holdcase=this.casetabledata.filter((res:any)=>{
    //   return res.status==="On Hold"
    // })
    // console.log(holdcase);
    // this.dataSource = new MatTableDataSource(holdcase);
    // this.setDataSourceAttributes()
  }
  getclosecase(data: any) {

    // var closed=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Closed"
    // })
    // console.log(closed);
    // this.dataSource = new MatTableDataSource(closed);
    // this.setDataSourceAttributes()

  }

  underreviewdata(data: any) {
    // var closed=this.casetabledata.filter((res:any)=>{
    //   return res.status==="Closed"
    // })
    // console.log(closed);
    // this.dataSource = new MatTableDataSource(closed);
    // this.setDataSourceAttributes()
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
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }


  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
      this.sendApproval();
    }

    if (this.form.value.tenderstatus_id) {
      this.tendStatusData = this.tendStatus.filter((item: any) => {
        console.log(item);

        return item.tenderstatus_id == this.form.value.tenderstatus_id;
      });
      this.form.value.tenderstatus_id = this.tendStatusData[0]['tenderstatus_id'];
      console.log(this.form.value.tenderstatus_id);
    }
  }

  sendBack() {
    if (this.form.value.tenderstatus_id != '') {
      this.form.value.tenderstatus_id == '';
    } else {
      this.form.value.tenderstatus_id = null;
    }

    this.form.value.tender_id = this.tenderData[0].tender_id;
    this.apiService.createApproval(this.form.value).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, error => {
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    })
  }

  sendApproval() {
    this.form.value.tender_id = this.tenderData[0].tender_id;
    this.apiService.createApproval(this.form.value).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, error => {
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    })
  }

}

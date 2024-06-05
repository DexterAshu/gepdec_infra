import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { SharedService } from 'src/app/_services';
@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.component.html',
  styleUrls: ['./banking-details.component.css']
})
export class BankingDetailsComponent {
  documentForm!: FormGroup;
  isSubmitted: boolean = false;
  listOfFiles: string[] = [];
  fileList: any[] = [];
  tableHeight: any;
  searchText: string = '';
  isNotFound: boolean = false;
  meterData: any;
  p: number = 1;
  limit = environment.pageLimit;
  docType: any;
  docListData: any;
  inserteddata: any;
  discardeddata: any
  companyData: any;
  tenderType: any;
  bankData: any;
  tenderData: any;
  tenderDetails: any;
  tenderDetailsData: any;
  clientListData: any;
  clientList: any;
  tendDetails: any;
  data1: any;
  userData: any;
  filterTenderDetailsData: any = [];
  securityData: any;
    loading: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  rowData: any;
  bankDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private  masterService: MasterService,
    private alertService: AlertService,
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {
    const userDataString = localStorage.getItem('gdUserData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      security_id: [null,Validators.required],
      utility_id:[null, Validators.required],
      tender_id:[null, Validators.required],
      bg_amount: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      submission_date: [null, Validators.required],
      document_description: [null, Validators.required],

    });

    this.getData();
    this.bankList();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  getBankDetails(data:any){
    this.rowData = [];
    this.rowData = data;
  }

  getPatchDetails(data:any){
    this.documentForm.reset();
    this.button = 'Update';
    this.update = true;
    this.bankDetails = [];
    this.bankDetails = data;
      this.documentForm.patchValue({
        bidder_id: this.bankDetails.bidder_id,
          total_liabilities: this.bankDetails.total_liabilities,
          total_fixed_assets: this.bankDetails.total_fixed_assets,
          net_profit: this.bankDetails.net_profit,
          net_worth:this.bankDetails.net_worth,
          net_capital:this.bankDetails.net_capital,
          reserve_surplus:this.bankDetails.reserve_surplus,
          paid_upcapital:this.bankDetails.paid_upcapital,
          annual_turnover:this.bankDetails.annual_turnover,
          net_working_capital:this.bankDetails.net_working_capital,
          ebidta:this.bankDetails.ebidta,
          description:this.bankDetails.description
       
        }); 
  }


  getData() {
    this.apiService.getDocType().subscribe((res: any) => {
      if(res.status == 200) {
        this.docType = res.documenttype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getTenderType().subscribe((res: any) => {
      this.tenderType = res.bidtype;
      this.securityData = res.security;
    });
    this.masterService.getBankData().subscribe((res:any)=>{
      this.bankData = res.bank;
    })
    this.apiService.getTenderList().subscribe((res: any) => {
      this.tenderData = res.result;
    });

  }

  bankList(){
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getBankDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.docListData = undefined;
        this.isNotFound = true;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
    this.tenderDetailsData = res.result;
    });
  }

  getrefData(tender_id: any){
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x:any) => x.tender_id == tender_id);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  get f() {
    return this.documentForm.controls;
  }
 
   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    this.isSubmitted = true;
    this.loading = true;
    this.addDocument();
  }

  addDocument() {
    this.apiService.AddBank(this.documentForm.value).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.bankList();
        this.documentForm.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: Unknown Error!");
    });
  }
}

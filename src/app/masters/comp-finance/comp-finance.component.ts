import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, MasterService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-comp-finance',
  templateUrl: './comp-finance.component.html',
  styleUrls: ['./comp-finance.component.css']
})
export class CompFinanceComponent {
  documentForm!: FormGroup;
  attachment: File[] = [];
  isSubmitted = false;
  listOfFiles: string[] = [];
  fileList: any[] = [];
  tableHeight: any;
  searchText: string = '';
  isNotFound: boolean = false;
  loading: boolean = false;
  meterData: any;
  update: boolean = false;
  button: string = 'Create';
  p: number = 1;
  limit = environment.pageLimit;
  docType: any;
  docListData: any;
  companyData: any = [];
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  financialData: any;
  ourComp: any;
  isOpen: boolean = false;
  rowData: any;
  finDetails: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private masterService: MasterService,
    
  ) {}

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      bidder_id: ['',Validators.required],
      financialyear_id: ['',Validators.required],
      net_working_capital: ['',Validators.required],
      total_liabilities: ['',Validators.required],
      total_fixed_assets: ['',Validators.required],
      net_profit: ['',Validators.required],
      net_worth: ['',Validators.required],
      net_capital: ['',Validators.required],
      reserve_surplus: ['',Validators.required],
      paid_upcapital: ['',Validators.required],
      annual_turnover: ['',Validators.required],
      ebidta: [''],
      description: [''],
    });
    this.getData();
  }
  get f() {return this.documentForm.controls;}
 
  getDetails(data:any){
    this.rowData = [];
    this.rowData = data;
  }

  getPatchDetails(data:any){
    this.documentForm.reset();
    this.button = 'Update';
    this.update = true;
    this.finDetails = [];
    this.finDetails = data;
      this.documentForm.patchValue({
        bidder_id: this.finDetails.bidder_id,
          financialyear_id: this.finDetails.financialyear_id,
          total_liabilities: this.finDetails.total_liabilities,
          total_fixed_assets: this.finDetails.total_fixed_assets,
          net_profit: this.finDetails.net_profit,
          net_worth:this.finDetails.net_worth,
          net_capital:this.finDetails.net_capital,
          reserve_surplus:this.finDetails.reserve_surplus,
          paid_upcapital:this.finDetails.paid_upcapital,
          annual_turnover:this.finDetails.annual_turnover,
          net_working_capital:this.finDetails.net_working_capital,
          ebidta:this.finDetails.ebidta,
          description:this.finDetails.description
       
        }); 
  }

  getData() { 
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    })
    this.masterService.getFinData().subscribe((res:any) => {
      this.financialData = res.result;
    });
    this.apiService.getOurFinList().subscribe((res:any) => {
      if (res.status === 200) {
        this.docListData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }
   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  // addOurFinDocument() {
  //   this.apiService.createOurFinDocuments(this.documentForm.value).subscribe((res: any) => {
  //     let response: any = res;
  //     document.getElementById('cancel')?.click();
  //     this.isSubmitted = false;
  //     if (response.status == 200) {
  //       this.ngOnInit();
  //       this.documentForm.reset();
  //       this.alertService.success(response.message);
  //     } else {
  //       this.alertService.warning(response.message);
  //     }
  //   }, (error) => {
  //     this.isSubmitted = false;
  //     document.getElementById('cancel')?.click();
  //     this.alertService.error("Error: " + error.statusText);
  //   });
  // }

  createForm(){
    this.button = 'Create';
    this.update = false;
    this.documentForm.reset();
  }
  onSubmit() {
    if (this.documentForm.valid) {
        this.isSubmitted = true;
        this.loading = true;
    if (this.update) {  
      this.finUpdate();
    } else {
      this.createFin();
    }
    }
  }

  createFin() {
    this.apiService.createOurFinDocuments(this.documentForm.value).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.getData();
        this.documentForm.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: " + error.statusText);
    });
  }
  finUpdate(): void {
    this.documentForm.value.financials_id =  this.finDetails.financials_id;
     this.apiService.ourFinUpdation(this.documentForm.value).subscribe((res: any) => {
       this.isSubmitted = false;
       if (res.status == 200) {
         this.getData();
         document.getElementById('cancel')?.click();
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
  }, (error) => {
    this.isSubmitted = false;
    document.getElementById('cancel')?.click();
    this.alertService.error("Error: " + error.statusText);
  });
  }


}



import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, MasterService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-fin-balancesheet',
  templateUrl: './fin-balancesheet.component.html',
  styleUrls: ['./fin-balancesheet.component.css']
})
export class FinBalancesheetComponent {
  documentForm!: FormGroup;
  attachment: File[] = [];
  isSubmitted = false;
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
  companyData: any = [];
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  financialData: any;
  ourComp: any;
  isOpen: boolean = false;
 
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
      // itr:['',Validators.required],
      // itr_date:[''],
      // itr_number:[''],
      attachment: [''],
      description: [''],
    });
    this.getData();
  }
  get f() {return this.documentForm.controls;}
 
  getData() { 
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    })
    this.masterService.getFinData().subscribe((res:any) => {
      this.financialData = res.result;
      console.log(this.financialData);
      
    });
    this.apiService.getOurFinList().subscribe((res:any) => {
      if (res.status === 200) {
        this.docListData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }

  onFileChanged(event: any) {
    try {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.listOfFiles.push(files[i].name);
        this.attachment.push(files[i]);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

 
   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }
   formData.append('net_working_capital', this.documentForm.value.net_working_capital)
    formData.append('bidder_id', this.documentForm.value.bidder_id);
    formData.append('financialyear_id', this.documentForm.value.financialyear_id);
    formData.append('total_liabilities', this.documentForm.value.total_liabilities);
    formData.append('total_fixed_assets', this.documentForm.value.total_fixed_assets);
    formData.append('net_profit', this.documentForm.value.net_profit);
    formData.append('net_worth', this.documentForm.value.net_worth);
    formData.append('net_capital', this.documentForm.value.net_capital);
    formData.append('reserve_surplus', this.documentForm.value.reserve_surplus);
    formData.append('paid_upcapital', this.documentForm.value.paid_upcapital);
    formData.append('annual_turnover', this.documentForm.value.annual_turnover);
    formData.append('description', this.documentForm.value.description);
    formData.append('ebidta', this.documentForm.value.ebidta);
  
    this.addOurFinDocument(formData);
  }
  addOurFinDocument(formData: FormData) {
    this.apiService.createOurFinDocuments(formData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.ngOnInit();
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
}



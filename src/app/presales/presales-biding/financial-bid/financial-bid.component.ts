import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-financial-bid',
  templateUrl: './financial-bid.component.html',
  styleUrls: ['./financial-bid.component.css']
})
export class FinancialBidComponent {
  form!: FormGroup;
  filesToUpload: Array<File> = [];
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
  ourCompanyFinDataField: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  design: any;
  departMent: any;
  financialData: any;
  tenderData: any;
  clientListData: any;
  tenderDetailsData: any;
  tendDetails: any;
  docType: any;
  bankData: any;
  docListData: any;
  inserteddata: any;
  discardeddata: any;
  isExcelDownloadData: boolean = true;
  filterTenderDetailsData: any = [];
  attachment: any = [];
  annualTurnover = new FormControl();
  finData: any;
  finCalData: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) {
   
   }

 ngOnInit(){
    this.form = this.formBuilder.group({
        financialyear_id: [null, Validators.required],
       
        annual_turnover: [null, Validators.required],
        tender_id:['', Validators.required],
        utility_id:['', Validators.required],
        net_worth: [null, Validators.required],
        remark: [null, Validators.required],
        net_working_capital: [''],
        total_liabilities: [''],
        total_fixed_assets: [''],
        net_profit: [''],
        reserve_surplus: [''],
        paid_upcapital: [''],
        ebidta: [''],
        itr:[''],
        year:[''],
        check:[''],
        nclt_status: [null],
        drt: [null],
        cdr: [null]    
    });
    this.finListData();
    this.finYearData();
    this.getData();
  }

  getData() {
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
  
    this.apiService.getTenderList().subscribe((res: any) => {  
      this.tenderData = res.result;
    });
    
   
  }

  finListData(){
    this.apiService.getfinDataList().subscribe((res:any) => {
      console.log(res);
      
      if (res.status === 200) {
        this.docListData = res.result;
        console.log(this.docListData);
        
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }

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

  yearBasedCalculateData(){
    this.form.value.year;
    let year = this.form.value.year;
    let check = this.form.value.check;
    this.apiService.finCalculateData(year, check).subscribe((res:any) =>{
    this.finCalData = res.result;
    console.log(this.finCalData);
    
  })
    
  }

  finBidComprision(){
    let financialyear_id = this.form.value.financialyear_id;
      console.log(this.filterTenderDetailsData);
    let didderID = this.filterTenderDetailsData[0].bidder_id;
       this.apiService.finComprisionData(didderID, financialyear_id).subscribe((res:any) =>{
        this.finData = res.result;
       
      
    })
    // this.ourCompanyFinDataField = !this.ourCompanyFinDataField;
  }

  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
      console.log(this.tenderDetailsData);
    });
  }

  getrefData(tender_id: any){
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x:any) => x.tender_id == tender_id);
  }

  

//button dropdown
isOpen: boolean = false;

toggleDropdown() {
  this.isOpen = !this.isOpen;
}

  
  fileList: File[] = [];
  listOfFiles: any[] = [];

  onFileChanged(event: any) { 
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
    console.log(this.attachment);
  }

  removeSelectedFile(index: any) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

  createForm(){
    console.clear();
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }

  //  getDetails(data:any){
  //   this.form.reset();
  //   this.button = 'Update';
  //   this.update = true;
  //   this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
  //     this.custDetails = res.result[0];
  //       this.form.patchValue({
  //         utility: this.custDetails.utility,
  //         tender_title: this.custDetails.tender_title,
  //         tender_ref_no: this.custDetails.tender_ref_no,
  //         publish_date: this.custDetails.publish_date,
  //         net_worth: this.custDetails.net_worth,
  //         financialyear_id: this.custDetails.financialyear_id,
  //         annual_turnover: this.custDetails.annual_turnover,
  //         fin_remarks: this.custDetails.fin_remarks,
  //         nclt_status: this.custDetails.nclt_status,
  //         drt: this.custDetails.drt,
  //         cdr: this.custDetails.cdr,
  //       }); 
      
  // })
  // }

  get f() { return this.form.controls; }
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

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
        this.loading = true;
  
  
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append('net_working_capital', this.form.value.net_working_capital)
    formData.append('financialyear_id', this.form.value.financialyear_id);
    formData.append('total_liabilities', this.form.value.total_liabilities);
    formData.append('total_fixed_assets', this.form.value.total_fixed_assets);
    formData.append('net_profit', this.form.value.net_profit);
    formData.append('net_worth', this.form.value.net_worth);
    formData.append('net_capital', this.form.value.net_capital);
    formData.append('reserve_surplus', this.form.value.reserve_surplus);
    formData.append('paid_upcapital', this.form.value.paid_upcapital);
    formData.append('annual_turnover', this.form.value.annual_turnover);
    formData.append('description', this.form.value.description);
    formData.append('ebidta', this.form.value.ebidta);
    formData.append('itr', this.form.value.itr);
    formData.append('year', this.form.value.year);
    formData.append('check', this.form.value.check);
    formData.append("tender_id",this.form.value.fixed_asset);
    formData.append("utility_id",this.form.value.utility_id);
    formData.append("remark",this.form.value.remark);
    formData.append("nclt_status",this.form.value.nclt_status);
    formData.append("drt",this.form.value.drt);
    formData.append("cdr",this.form.value.cdr);
    this.addDocument(formData);
  }
}

  addDocument(formData: FormData) {
    this.apiService.addFinData(formData).subscribe((res:any )=> {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.ngOnInit();
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    });
  }

  // addTender() {
  //   this.apiService.createTender(this.form.value).subscribe((res: any) => {
  //    let response: any = res;
  //       document.getElementById('cancel')?.click();
  //       this.isSubmitted = false;
  //       if (response.status == 200) {
  //         this.getCompanyData();
  //         this.form.reset();
  //         this.alertService.success(response.message);
  //       } else {
  //         this.alertService.warning(response.message);
  //       }
  //     })
  // }
  // updateTender(): void {
  //   // this.opac=0;
  //   // this.loadermsg="Updating..."
  //    this.form.value.company_id =  this.custDetails.company_id;
  //   this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
  //      this.isSubmitted = false;
  //     if (res.status == 200) {
  //       this.ngOnInit();
  //       document.getElementById('cancel')?.click();
  //     this.alertService.success('Company Updated Successfully');
  //   } else {
  //     this.alertService.error('Something went wrong please try again');
  //   }
  // });
  // }
}


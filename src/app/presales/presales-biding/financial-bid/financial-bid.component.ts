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
  isOpen: boolean = false;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  data: any = null;
  data1: any;
  data2: any;
  liabVal: any;
  assetVal: any;
  netProf: any;
  netCapitalVal: any;
  rAnds: any;
  paiCapitalVal: any;
  ebidtaVal: any;
  isSuccess: boolean = false;
  isNetWorth: boolean = false;
  isNetWorkingCap: boolean = false;
  isLiability: boolean = false;
  isTotaAsset: boolean = false;
  isNetProfit: boolean = false;
  isEbidta: boolean = false;
  isNetCapital: boolean = false;
  isRS: boolean = false;
  isPaidupCapital: boolean = false;
  rowData: any;


  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) {}

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
        ebidta:  [''],
        itr: [''],
        year:[''],
        check: [''],
        year1: [''],
        check1: [''],
        year2: [''],
        check2: [''],
        year3: [''],
        check3: [''],
        year4: [''],
        check4: [''],
        year5: [''],
        check5: [''],
        year6: [''],
        check6: [''],
        year7: [''],
        check7: [''],
        year8: [''],
        check8: [''],
        year9: [''],
        check9: [''],
        year10: [''],
        check10: [''],
       
    });
    this.finListData();
    this.finYearData();
    this.getData();
  }

  getData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      console.log(error);
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }

    this.apiService.getTenderList().subscribe((res: any) => {
      this.tenderData = res.result;
    });


  }
  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
  }

  finListData(){
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getfinDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.docListData = undefined;
        this.isNotFound = true;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
      this.docListData = undefined;
      this.isNotFound = true;
      this.alertService.error("Error: " + error.statusText)
    });
  }

  finYearData() {
    this.masterService.getFinData().subscribe((res:any) => {
      if (res.status == 200) {
      this.financialData = res.result;
      }else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.alertService.error("Error: " + error.statusText)
    });

  }

  //Annuval data
  annuvalTurnVal(year:any, check:any, annual:any){
    if(check != '') {
      this.apiService.finAnnuvalTournover(year, check).subscribe((res:any) =>{
        this.data = res.result;
        this.comparisonData(annual);
       })
    }
  }

  comparisonData(annual: any) {
    if(this.data != null) {
      if(parseInt(annual) < parseInt(this.data)) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    }
  }

//networth data
  netWorthVal(year1:any, check1:any, networth:any){
    if(check1 != '') {
      this.apiService.finNetWorth(year1, check1).subscribe((res:any) =>{
        this.data1 =res.result;
        this.comparisonNetWorthData(networth);
       })
    }
  }

  comparisonNetWorthData(networth: any) {
    if(this.data1 != null) {
      if(parseInt(networth) < parseInt(this.data1)) {
        this.isNetWorth = true;
      } else {
        this.isNetWorth = false;
      }
    }
  }

//networking capital data
  netWorkingCapitalVal(year2:any, check2:any, networkCap:any){
    if(check2 != '') {
      this.apiService.finNetWorkingCap(year2, check2).subscribe((res:any) =>{
        this.data2 =res.result;
        this.comparisonNetWorkData(networkCap);
       })
    }
   
  }
  comparisonNetWorkData(networkCap: any) {
    if(this.data2 != null) {
      if(parseInt(networkCap) < parseInt(this.data2)) {
        this.isNetWorkingCap = true;
      } else {
        this.isNetWorkingCap = false;
      }
    }
  }

//Liability data
  totalLiabilityVal(year3:any, check3:any, libi:any){
    if(check3 != '') {
      this.apiService.finLiability(year3, check3).subscribe((res:any) =>{
        this.liabVal =res.result;
        this.comparisonNetWorkData(libi);
       })
    }
  }
  comparisonLibData(libi: any) {
    if(this.liabVal != null) {
      if(parseInt(libi) < parseInt(this.liabVal)) {
        this.isLiability = true;
      } else {
        this.isLiability = false;
      }
    }
  }

  //fixed asset data
  fixAsset(year4:any, check4:any, fixedasset:any){
    if(check4 != '') {
      this.apiService.finFixedAsset(year4, check4).subscribe((res:any) =>{
        this.assetVal =res.result;
        this.comparisonAssetData(fixedasset);
       })
    }
    // year = this.form.value.year
    // check = this.form.value.check
    // this.apiService.finFixedAsset(year, check).subscribe((res:any) =>{
    //   this.assetVal =res.result;
    //  })
  }
  comparisonAssetData(fixedasset: any) {
    if( this.assetVal != null) {
      if(parseInt(fixedasset) < parseInt(this.assetVal)) {
        this.isTotaAsset = true;
      } else {
        this.isTotaAsset = false;
      }
    }
  }

  //net profit data
  netProfitData(year5:any, check5:any, netprofit:any){
    if(check5 != '') {
      this.apiService.finNetProfit(year5, check5).subscribe((res:any) =>{
        this.netProf =res.result;
        this.comparisonNetProfitData(netprofit);
       })
    }
  }
  comparisonNetProfitData(netprofit: any) {
    if( this.netProf != null) {
      if(parseInt(netprofit) < parseInt(this.netProf)) {
        this.isNetProfit = true;
      } else {
        this.isNetProfit = false;
      }
    }
  }

//netcapital data
  natCapitalData(year6:any, check6:any, netcapital:any){
    if(check6 != '') {
      this.apiService.finNetCapital(year6, check6).subscribe((res:any) =>{
        this.netCapitalVal =res.result;
        this.comparisonNetCapitalData(netcapital);
       })
    }
  }
  comparisonNetCapitalData(netcapital: any) {
    if( this.netCapitalVal != null) {
      if(parseInt(netcapital) < parseInt(this.netCapitalVal)) {
        this.isNetCapital = true;
      } else {
        this.isNetCapital = false;
      }
    }
  }

  //RS Data
  resAndsurplus(year7:any, check7:any, rsVal:any){
    if(check7 != '') {
      this.apiService.finRS(year7, check7).subscribe((res:any) =>{
        this.rAnds =res.result;
        this.comparisonRSData(rsVal);
       })
    }
  }
  comparisonRSData(rsVal: any) {
    if(this.rAnds != null) {
      if(parseInt(rsVal) < parseInt(this.rAnds)) {
        this.isRS = true;
      } else {
        this.isRS = false;
      }
    }
  }

  //paidupcapital data
  paidUpCapital(year8:any, check8:any, paiupcapi:any){
    if(check8 != '') {
      this.apiService.finPaidupCapital(year8, check8).subscribe((res:any) =>{
        this.paiCapitalVal =res.result;
        this.comparisonPaidupData(paiupcapi);
       })
    }
  }
  comparisonPaidupData(paiupcapi: any) {
    if(this.paiCapitalVal != null) {
      if(parseInt(paiupcapi) < parseInt(this.paiCapitalVal)) {
        this.isPaidupCapital = true;
      } else {
        this.isPaidupCapital = false;
      }
    }
  }

  //ebidta data
  ebidtaData(year9:any, check9:any, ebdt:any){
    if(check9 != '') {
      this.apiService.finAbidta(year9, check9).subscribe((res:any) =>{
        this.ebidtaVal =res.result;
        this.comparisonEbidtaData(ebdt);
       })
    }
  }
  comparisonEbidtaData(ebdt: any) {
    if( this.ebidtaVal != null) {
      if(parseInt(ebdt) < parseInt(this.ebidtaVal)) {
        this.isEbidta = true;
      } else {
        this.isEbidta = false;
      }
    }
  }

  // yearBasedCalculateData(year:any,checkVal:any,column:any){
  //   let data={
  //     year:this.form.value[year],
  //     check:this.form.value[checkVal],
  //     column:name,
  //   }
  //  console.log(data);
  //    this.apiService.finAnnuvalTournover(data).subscribe((res:any) =>{
  //     console.log(res);
  //     this.data =res.result;
  //    })



  //   // this.apiService.finCalculateData(year, check).subscribe((res:any) =>{
  //   // this.finCalData = res.result;
  //   // console.log(this.finCalData);
  //   // console.log(this.form.value.annual_turnover);
  // }

  finBidComprision(){
    let financialyear_id = this.form.value.financialyear_id;
    let didderID = this.filterTenderDetailsData[0].bidder_id;
      this.apiService.finComprisionData(didderID, financialyear_id).subscribe((res:any) =>{
      this.finData = res.result;
    })
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

toggleDropdown() {
  this.isOpen = !this.isOpen;
}
  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
  }

  removeSelectedFile(index: any) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

  createForm(){
    console.clear();
    // this.button = 'Create';
    // this.update = false;
    this.form.reset();
  }


  get f() { return this.form.controls; }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }



  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
    // const formData: any = new FormData();
    // const files: Array<File> = this.filesToUpload;
    // for (let i = 0; i < this.attachment.length; i++) {
    //   formData.append("attachment", this.attachment[i]);
    // }
    // formData.append('net_working_capital', this.form.value.net_working_capital)
    // formData.append('financialyear_id', this.form.value.financialyear_id);
    // formData.append('total_liabilities', this.form.value.total_liabilities);
    // formData.append('total_fixed_assets', this.form.value.total_fixed_assets);
    // formData.append('net_profit', this.form.value.net_profit);
    // formData.append('net_worth', this.form.value.net_worth);
    // formData.append('net_capital', this.form.value.net_capital);
    // formData.append('reserve_surplus', this.form.value.reserve_surplus);
    // formData.append('paid_upcapital', this.form.value.paid_upcapital);
    // formData.append('annual_turnover', this.form.value.annual_turnover);
    // formData.append('description', this.form.value.description);
    // formData.append('ebidta', this.form.value.ebidta);
    // formData.append('itr', this.form.value.itr);
    // formData.append('year', this.form.value.year);
    // formData.append('check', this.form.value.check);
    // formData.append("tender_id",this.form.value.fixed_asset);
    // formData.append("utility_id",this.form.value.utility_id);
    // formData.append("remark",this.form.value.remark);
    // formData.append("nclt_status",this.form.value.nclt_status);
    // formData.append("drt",this.form.value.drt);
    // formData.append("cdr",this.form.value.cdr);
    this.addFinancial();
  }
}

  addFinancial() {
    this.apiService.addFinData(this.form.value).subscribe((res:any )=> {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      this.finListData();
      if (response.status == 200) {
        this.form.reset();
        this.alertService.success(response.message);
     
      } else {
        this.alertService.warning(response.message);
      }
    }, error => {
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: " + error.statusText);
    });
  }
}


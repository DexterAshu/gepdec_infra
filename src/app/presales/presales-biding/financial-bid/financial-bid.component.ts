import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

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
  isNotFound: boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country: any;
  limits: any = [];
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
  discardeddata: any
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
  liabilityData: any;
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
  date: any;
  netDate: any;
  ebitdaDate: any;
  netWorthDate: any;
  libDate: any;
  assetDate: any;
  rsDate: any;
  paidDate: any;
  annuvalTDate: any;


  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tender_id: [null, Validators.required],
      utility_id: [null, Validators.required],
      financialyear_id: [''],
      annual_turnover: [''],
      annual_turnover_year: [''],
      annual_turnover_check: [''],
      annual_turnover_status: [''],
      our_annual_turnover: [''],
      annual_turnover_fin: [''],
      net_worth: [''],
      net_worth_year: [''],
      net_worth_check: [''],
      net_worth_status: [''],
      our_net_worth: [''],
      net_worth_fin: [''],
      net_working_capital: [''],
      net_working_capital_year: [''],
      net_working_capital_check: [''],
      net_working_status: [''],
      our_net_working_capital: [''],
      net_working_capital_fin: [''],
      total_liabilities: [''],
      total_liabilities_year: [''],
      total_liabilities_check: [''],
      our_total_liabilities: [''],
      total_liabilities_status: [''],
      total_liabilities_fin: [''],
      total_fixed_assets: [''],
      total_fixed_assets_year: [''],
      total_fixed_assets_check: [''],
      our_total_fixed_assets: [''],
      total_fixed_assets_status: [''],
      total_fixed_assets_fin: [''],
      net_profit: [''],
      net_profit_year: [''],
      net_profit_check: [''],
      our_net_profit: [''],
      net_profit_status: [''],
      net_profit_fin: [''],
      // net_capital: [''],
      // net_capital_year: [''],
      // net_capital_check: [''],
      // our_net_capital: [''],
      // net_capital_status: [''],
      reserve_surplus: [''],
      reserve_surplus_year: [''],
      reserve_surplus_check: [''],
      our_reserve_surplus: [''],
      reserve_surplus_status: [''],
      reserve_surplus_fin:[''],
      paid_upcapital: [''],
      paid_upcapital_year: [''],
      paid_upcapital_check: [''],
      our_paid_upcapital: [''],
      paid_upcapital_status: [''],
      paid_upcapital_fin:[''],
      ebidta: [''],
      ebidta_year: [''],
      ebidta_check: [''],
      our_ebidta: [''],
      ebidta_status: [''],
      ebidta_fin: [''],
      remark: [null, Validators.required],

    });
    this.finListData();
    this.finYearData();
    this.getData();
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status == 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
      (error: any) => {
        this.alertService.error("Error: Unknown Error!");
      }

    this.apiService.getTenderList().subscribe((res: any) => {
      this.tenderData = res.result;
    });
  }

  rowListData(row: any) {
    this.rowData = [];
    this.rowData = row;
    console.log(this.rowData)
  }

  finListData() {
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getfinDataList().subscribe((res: any) => {
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
      this.alertService.error("Error: Unknown Error!");
    });
  }

  finYearData() {
    this.masterService.getFinData().subscribe((res: any) => {
      if (res.status == 200) {
        this.financialData = res.result;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.alertService.error("Error: Unknown Error!");
    });

  }

  //Annuval data
  annuvalTurnVal(year: any, check: any, annual: any) {
    debugger
    this.data = null;
    this.annuvalTDate = null;
    if (check) {
      if(check == '1') {
        var yearVal = check;
        var checkVal = null;
        this.form.controls["annual_turnover_year"].setValue('');
      } else {
        var yearVal = year;
        var checkVal = check;
      }
      this.apiService.finAnnuvalTournover(yearVal, checkVal).subscribe((res: any) => {
        this.data = res;
        this.comparisonData(annual);
      })
    }
  }

  comparisonData(annual: any) {
    if (this.data.result != null) {
      if (parseInt(annual) < parseInt(this.data.result)) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    }

    this.form.controls['our_annual_turnover'].setValue(this.data.result);
    this.form.controls['annual_turnover_status'].setValue(this.isSuccess);
  }

  //networth data
  netWorthVal(year1: any, check1: any, networth: any) {
    if (year1) {
      this.apiService.finNetWorth(year1, check1).subscribe((res: any) => {
        this.netWorthDate = res.date;
        this.data1 = res.result;
        this.comparisonNetWorthData(networth);
      })
    }
  }
  comparisonNetWorthData(networth: any) {
    if (this.data1 != null) {
      this.isNetWorth = parseInt(networth) < parseInt(this.data1);
    } else {
      this.isNetWorth = false;
    }

    this.form.controls['our_net_worth'].setValue(this.data1);
    this.form.controls['net_worth_status'].setValue(this.isNetWorth);
  }

  // comparisonNetWorthData(networth: any) {
  //   if(this.data1 != null ) {
  //     if(parseInt(networth) < parseInt(this.data1)) {
  //       this.isNetWorth = true;
  //     } else {
  //       this.isNetWorth = false;
  //     }
  //   }

  //   this.form.controls['our_net_worth'].setValue(this.data1); 
  //   this.form.controls['net_worth_status'].setValue(this.isNetWorth);
  // }

  //networking capital data
  netWorkingCapitalVal(year2: any, check2: any, networkCap: any) {
    if (year2) {
      this.apiService.finNetWorkingCap(year2, check2).subscribe((res: any) => {
        this.date = res.date;
        this.data2 = res.result;
        this.comparisonNetWorkData(networkCap);
      })
    }

  }
  comparisonNetWorkData(networkCap: any) {
    if (this.data2 != null) {
      this.isNetWorkingCap = parseInt(networkCap) < parseInt(this.data2);
    } else {
      this.isNetWorkingCap = false;
    }

    this.form.controls['our_net_working_capital'].setValue(this.data2);
    this.form.controls['net_working_status'].setValue(this.isNetWorkingCap);
  }

  //Liability data
  totalLiabilityVal(year3: any, check3: any, libi: any) {
    if (year3) {
      this.apiService.finLiability(year3, check3).subscribe((res: any) => {
        this.libDate = res.date;
        this.liabilityData = res.result;
        this.comparisonLibData(libi);
      })
    }
  }
  comparisonLibData(libi: any) {

    if (this.liabilityData != null) {
      if (parseInt(libi) < parseInt(this.liabilityData)) {
        this.isLiability = true;
      } else {
        this.isLiability = false;
      }
    }
    this.form.controls['our_total_liabilities'].setValue(this.liabilityData);
    this.form.controls['total_liabilities_status'].setValue(this.isLiability);
  }

  //fixed asset data
  fixAsset(year4: any, check4: any, fixedasset: any) {
    if (year4) {
      this.apiService.finFixedAsset(year4, check4).subscribe((res: any) => {
        this.assetDate = res.date;
        this.assetVal = res.result;
        this.comparisonAssetData(fixedasset);
      })
    }
  }
  comparisonAssetData(fixedasset: any) {
    if (this.assetVal != null) {
      if (parseInt(fixedasset) < parseInt(this.assetVal)) {
        this.isTotaAsset = true;
      } else {
        this.isTotaAsset = false;
      }
    }

    this.form.controls['our_total_fixed_assets'].setValue(this.assetVal);
    this.form.controls['total_fixed_assets_status'].setValue(this.isTotaAsset);
  }

  //net profit data
  netProfitData(year5: any, check5: any, netprofit: any) {
    if (year5) {
      this.apiService.finNetProfit(year5, check5).subscribe((res: any) => {
        this.netDate = res.date;
        this.netProf = res.result;
        this.comparisonNetProfitData(netprofit);
      })
    }
  }
  comparisonNetProfitData(netprofit: any) {
    if (this.netProf != null) {
      if (parseInt(netprofit) < parseInt(this.netProf)) {
        this.isNetProfit = true;
      } else {
        this.isNetProfit = false;
      }
    }

    this.form.controls['our_net_profit'].setValue(this.netProf);
    this.form.controls['net_profit_status'].setValue(this.isNetProfit);
  }

  //netcapital data
  // natCapitalData(year6: any, check6: any, netcapital: any) {
  //   if (year6) {
  //     this.apiService.finNetCapital(year6, check6).subscribe((res: any) => {
  //       this.date = res.date;
  //       this.netCapitalVal = res.result;
  //       this.comparisonNetCapitalData(netcapital);
  //     })
  //   }
  // }
  // comparisonNetCapitalData(netcapital: any) {
  //   if (this.netCapitalVal != null) {
  //     if (parseInt(netcapital) < parseInt(this.netCapitalVal)) {
  //       this.isNetCapital = true;
  //     } else {
  //       this.isNetCapital = false;
  //     }
  //   }

  //   this.form.controls['our_net_capital'].setValue(this.netCapitalVal);
  //   this.form.controls['net_capital_status'].setValue(this.isNetCapital);

  // }

  //RS Data
  resAndsurplus(year7: any, check7: any, rsVal: any) {
    if (year7) {
      this.apiService.finRS(year7, check7).subscribe((res: any) => {
        this.rsDate = res.date;
        this.rAnds = res.result;
        this.comparisonRSData(rsVal);
      })
    }
  }
  comparisonRSData(rsVal: any) {
    if (this.rAnds != null) {
      if (parseInt(rsVal) < parseInt(this.rAnds)) {
        this.isRS = true;
      } else {
        this.isRS = false;
      }
    }
    this.form.controls['our_reserve_surplus'].setValue(this.rAnds);
    this.form.controls['reserve_surplus_status'].setValue(this.isRS);

  }

  //paidupcapital data
  paidUpCapital(year8: any, check8: any, paiupcapi: any) {
    if (year8) {
      this.apiService.finPaidupCapital(year8, check8).subscribe((res: any) => {
        this.paidDate = res.date;
        this.paiCapitalVal = res.result;
        this.comparisonPaidupData(paiupcapi);
      })
    }
  }
  comparisonPaidupData(paiupcapi: any) {
    if (this.paiCapitalVal != null) {
      if (parseInt(paiupcapi) < parseInt(this.paiCapitalVal)) {
        this.isPaidupCapital = true;
      } else {
        this.isPaidupCapital = false;
      }
    }

    this.form.controls['our_paid_upcapital'].setValue(this.paiCapitalVal);
    this.form.controls['paid_upcapital_status'].setValue(this.isPaidupCapital);
  }

  //ebidta data
  ebidtaData(year9: any, check9: any, ebdt: any) {
    if (year9) {
      this.apiService.finAbidta(year9, check9).subscribe((res: any) => {
        this.ebitdaDate = res.date;
        this.ebidtaVal = res.result;
        this.comparisonEbidtaData(ebdt);
      })
    }

  }
  comparisonEbidtaData(ebdt: any) {
    if (this.ebidtaVal != null) {
      if (parseInt(ebdt) < parseInt(this.ebidtaVal)) {
        this.isEbidta = true;
      } else {
        this.isEbidta = false;
      }
    }

    this.form.controls['our_ebidta'].setValue(this.ebidtaVal);
    this.form.controls['ebidta_status'].setValue(this.isEbidta);
  }

  // yearBasedCalculateData(year:any,checkVal:any,column:any){
  //   let data={
  //     year:this.form.value[year],
  //     check:this.form.value[checkVal],
  //     column:name,
  //   }
  //    this.apiService.finAnnuvalTournover(data).subscribe((res:any) =>{
  //     this.data =res.result;
  //    })
  //   // this.apiService.finCalculateData(year, check).subscribe((res:any) =>{
  //   // this.finCalData = res.result;
  // }





  finBidComprision() {
    let financialyear_id = this.form.value.financialyear_id;
    let didderID = this.filterTenderDetailsData[0].bidder_id;
    this.apiService.finComprisionData(didderID, financialyear_id).subscribe((res: any) => {
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

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }


  get f() { return this.form.controls; }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  onSubmit() {
   
    if (this.form.value) {
      this.isSubmitted = true;
      this.loading = true;
      this.form.value.annual_turnover_fin = this.data?.date;
      this.form.value.ebidta_fin = this.ebitdaDate;
      this.form.value.net_worth_fin = this.netWorthDate;
      this.form.value.net_working_capital_fin = this.date;
      this.form.value.total_liabilities_fin = this.libDate;
      this.form.value.total_fixed_assets_fin = this.assetDate;
      this.form.value.net_profit_fin = this.netDate;
      this.form.value.paid_upcapital_fin = this.paidDate;
      this.form.value.reserve_surplus_fin = this.rsDate;
      this.addFinancial(this.form.value);
    }
  }

  addFinancial(formValues: any) {
    for (const key in formValues) {
      if (formValues[key] === '') {
        formValues[key] = null;
      }
    }
    var finValueData = {
      tender_id: formValues.tender_id || null,
      utility_id: formValues.utility_id || null,
      financialyear_id: formValues.financialyear_id || null,
      annual_turnover: formValues.annual_turnover || null,
      annual_turnover_year: (formValues.annual_turnover_check == '1' ? '1' : formValues.annual_turnover_year) || null,
      annual_turnover_check: (formValues.annual_turnover_check == '1' ? null : formValues.annual_turnover_check) || null,
      annual_turnover_status: formValues.annual_turnover_status || null,
      our_annual_turnover: formValues.our_annual_turnover || null,
      annual_turnover_fin: formValues.annual_turnover_fin || null,
      net_worth: formValues.net_worth || null,
      net_worth_year: formValues.net_worth_year || null,
      net_worth_check: formValues.net_worth_check || null,
      net_worth_status: formValues.net_worth_status || null,
      our_net_worth: formValues.our_net_worth || null,
      net_worth_fin: formValues.net_worth_fin || null,
      net_working_capital: formValues.net_working_capital || null,
      net_working_capital_year: formValues.net_working_capital_year || null,
      net_working_capital_check: formValues.net_working_capital_check || null,
      net_working_status: formValues.net_working_status || null,
      our_net_working_capital: formValues.our_net_working_capital || null,
      net_working_capital_fin: formValues.net_working_capital_fin || null,
      total_liabilities: formValues.total_liabilities || null,
      total_liabilities_year: formValues.total_liabilities_year || null,
      total_liabilities_check: formValues.total_liabilities_check || null,
      our_total_liabilities: formValues.our_total_liabilities || null,
      total_liabilities_status: formValues.total_liabilities_status || null,
      total_liabilities_fin: formValues.total_liabilities_fin || null,
      total_fixed_assets: formValues.total_fixed_assets || null,
      total_fixed_assets_year: formValues.total_fixed_assets_year || null,
      total_fixed_assets_check: formValues.total_fixed_assets_check || null,
      our_total_fixed_assets: formValues.our_total_fixed_assets || null,
      total_fixed_assets_status: formValues.total_fixed_assets_status || null,
      total_fixed_assets_fin: formValues.total_fixed_assets_fin || null,
      net_profit: formValues.net_profit || null,
      net_profit_year: formValues.net_profit_year || null,
      net_profit_check: formValues.net_profit_check || null,
      our_net_profit: formValues.our_net_profit || null,
      net_profit_status: formValues.net_profit_status || null,
      net_profit_fin: formValues.net_profit_fin || null,
      // net_capital: formValues.net_capital || null,
      net_capital_year: formValues.net_capital_year || null,
      net_capital_check: formValues.net_capital_check || null,
      our_net_capital: formValues.our_net_capital || null,
      net_capital_status: formValues.net_capital_status || null,
      reserve_surplus: formValues.reserve_surplus || null,
      reserve_surplus_year: formValues.reserve_surplus_year || null,
      reserve_surplus_check: formValues.reserve_surplus_check || null,
      our_reserve_surplus: formValues.our_reserve_surplus || null,
      reserve_surplus_status: formValues.reserve_surplus_status || null,
      reserve_surplus_fin: formValues.reserve_surplus_fin || null,
      paid_upcapital: formValues.paid_upcapital || null,
      paid_upcapital_year: formValues.paid_upcapital_year || null,
      paid_upcapital_check: formValues.paid_upcapital_check || null,
      our_paid_upcapital: formValues.our_paid_upcapital || null,
      paid_upcapital_status: formValues.paid_upcapital_status || null,
      paid_upcapital_fin: formValues.paid_upcapital_fin || null,
      ebidta: formValues.ebidta || null,
      ebidta_year: formValues.ebidta_year || null,
      ebidta_check: formValues.ebidta_check || null,
      our_ebidta: formValues.our_ebidta || null,
      ebidta_status: formValues.ebidta_status || null,
      ebidta_fin: formValues.ebidta_fin || null,
      remark: formValues.remark || null,
    };


    this.apiService.addFinData(finValueData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.form.reset();
        this.finListData();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, error => {
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: Unknown Error!");
    });
  }
}


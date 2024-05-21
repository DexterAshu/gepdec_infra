import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mangagement-tender-approval',
  templateUrl: './mangagement-tender-approval.component.html',
  styleUrls: ['./mangagement-tender-approval.component.css']
})
export class MangagementTenderApprovalComponent {
  form!: FormGroup;
  payment: any;
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
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  design: any;
  departMent: any;
  financialData: any;
  showTenderDetails: boolean = true;
  showClientDetails: boolean = false;
  showEligibility: boolean = false;
  showL1Schedule: boolean = false;
  bankData: any;
  contactDetails: any;
  addressDetails: any;
  meetingMode: any;
  emdExp: any;
  selectedEmdexemption: boolean = false;
  tenderData: any
  companyDetails: any;
  update: boolean = false;
  button: string = 'Save & Continue';

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.tenderData = params;
    });
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      company_id: [null, Validators.required],
      tender_title: [null, Validators.required],
      tender_ref_no: [null, Validators.required],
      bidtype_id: [null, Validators.required],
      tender_location: [null, Validators.required],
      publish_date: [null, Validators.required],
      // prebid_submission_date:[null, Validators.required],
      prebid_date: [null, Validators.required],
      prebidmeetingmode_id: [null, Validators.required],
      tender_submission_date: [null, Validators.required],
      tender_description: [null],
      tender_detail_link: [null],

      opening_date: [null, Validators.required],
      tech_bid_date: [null, Validators.required],
      fin_bid_opening_date: [null, Validators.required],
      tender_doc_cost: [null, Validators.required],
      tender_fee: [null, Validators.required],
      exemption_id: [null, Validators.required],
      ecv: [null, Validators.required],
      emd_amount: [null],
      emd_payment: [null],
      emd_submission_date: [null],
      termsCheckbox: [null, Validators.required]
    });


    this.getCompanyData();
    this.getCountryData();
    this.getDesignDeptData();
    this.finYearData();
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res: any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }

  getStateData() {
    let countrydata = this.form.value.country_id;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }

  getDistrictData() {
    this.districtData = [];
    let data = this.form.value.state_id;
    let dist = this.form.value.district_id;
    this.apiService.getDistData(data, dist).subscribe((res: any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }

  getDesignDeptData() {
    this.masterService.getUserMaster().subscribe((res: any) => {
      this.design = res.designation;
      this.departMent = res.department;
    })
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res: any) => {

      this.financialData = res.result;
    })
  }

  toggleEmdField(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;
    if (selectedValue == '401') {
      this.form.get('emd_amount')!.setValidators([Validators.required]);
      this.form.get('emd_payment')!.setValidators([Validators.required]);
      this.form.get('emd_submission_date')!.setValidators([Validators.required]);
      this.selectedEmdexemption = !this.selectedEmdexemption;
    }
    else {
      this.form.get('emd_amount')!.clearValidators();
      this.form.get('emd_payment')!.clearValidators();
      this.form.get('emd_submission_date')!.clearValidators();


    }
  }

  ngAfterViewInit(): void {
    this.button = 'Save & Continue';
    this.update = false;
    if (this.tenderData?.id) {
      this.button = 'Update';
      this.update = true;

      this.apiService.tenderDetails(this.tenderData.id).subscribe((res: any) => {
        this.custDetails = res.result[0];
        this.form.patchValue({
          bidder_name: this.custDetails.bidder_name,
          bidtype_id: this.custDetails.bidtype_id,
          company_id: this.custDetails.company_id,
          exemption_id: this.custDetails.exemption_id,
          fin_bid_opening_date: this.custDetails.fin_bid_opening_date,
          opening_date: this.custDetails.opening_date,
          prebid_date: this.custDetails.prebid_date,
          prebid_submission_date: this.custDetails.prebid_submission_date,
          prebidmeetingmode_id: this.custDetails.prebidmeetingmode_id,
          publish_date: this.custDetails.publish_date,
          tech_bid_date: this.custDetails.tech_bid_date,
          tender_description: this.custDetails.tender_description,
          tender_detail_link: this.custDetails.tender_detail_link,
          tender_doc_cost: this.custDetails.tender_doc_cost,
          tender_fee: this.custDetails.tender_fee,
          tender_location: this.custDetails.tender_location,
          tender_ref_no: this.custDetails.tender_ref_no,
          tender_status: this.custDetails.tender_status,
          tender_submission_date: this.custDetails.tender_submission_date,
          tender_title: this.custDetails.tender_title,
          ecv: this.custDetails.ecv,

        });

      })
    }
  }

  fileList: File[] = [];
  listOfFiles: any[] = [];
  attachment: any = [];

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

  getDetails(data: any) {
    this.apiService.companyDetails(data).subscribe((res: any) => {
      this.custDetails = res.result;
      this.contactDetails = res.result[0].contact;
      this.addressDetails = res.result[0].adderss;
    })
  }


  get f() { return this.form.controls; }

  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status == 200) {
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
      this.meetingMode = res.mettingmode;
      this.emdExp = res.emdexemption;
      this.payment = res.paymentmethod;
    });


  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      //1-passing Comany id
      //  if (this.form.value.company_name != '') {
      //   if (this.form.value.company_name) {
      //     var compName = this.companyData.filter((item: any) => {
      //       return item.company_name == this.form.value.company_name;
      //     });
      //     this.form.value.company_name = compName[0]['company_id'];
      //   }
      // } else {
      //   this.form.value.company_name = null;
      // }



      this.loading = true;
      if (this.update) {
        this.updateTender();
      } else {
        this.addTender();
      }
    }


    //   const formData: any = new FormData();
    //   for (let i = 0; i < this.attachment.length; i++) {
    //     formData.append("attachment", this.attachment[i]);
    //   }

    // formData.append("eligibility",this.form.value.eligibility);
    // formData.append("technical_qualification",this.form.value.technical_qualification);
    // formData.append("tender_company_name",this.form.value.tender_company_name);
    // formData.append("tender_title",this.form.value.tender_title);
    // formData.append("tender_ref_no",this.form.value.tender_ref_no);
    // formData.append("remarks",this.form.value.remarks);

  }

  addTender() {
    this.button = 'Save & Continue';
    this.update = false;
    this.apiService.createTender(this.form.value).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;

      if (response.status == 200) {
        this.getCompanyData();
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    })
  }
  updateTender(): void {

    this.form.value.tender_id = this.custDetails.tender_id;
    this.apiService.tenderUpdation(this.form.value).subscribe((res: any) => {
      this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        // document.getElementById('closed')?.click();
        this.alertService.success(res.message);
      } else if (res.status == 201) {
        this.alertService.error(res.message);
      } else {
        this.alertService.error('Error, Something went wrong please check');
      }
    });
  }
}

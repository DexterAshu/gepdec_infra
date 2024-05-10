import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-data-capturing',
  templateUrl: './data-capturing.component.html',
  styleUrls: ['./data-capturing.component.css']
})
export class DataCapturingComponent {
  form!: FormGroup;
  form1!: FormGroup;
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
  showWorkingDetails: boolean = false;
  showL1Schedule: boolean = false;
  bankData: any;
  contactDetails: any = [];
  addressDetails: any;
  meetingMode: any;
  emdExp: any;
  selectedEmdexemption: boolean = false;
  selectSecurityField: boolean = false;
  selectPGField: boolean = false;
  selectPrebidField: boolean = false;
  tenderData: any
  companyDetails: any;
  update: boolean = false;
  button: string = 'Save & Continue';
  payment: any;
  userData: any;
  tendStatus: any;
  previousData: any = [];
  performanceGuarntee: any;
  securityDeposit: any;
  removeContact: any[] = [];
  today: any = new Date();
  isContactFound: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.route.params.subscribe((params: Params) => {
      this.tenderData = params;
    });
    const userDataString = localStorage.getItem('gdUserData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }
  get f() { return this.form.controls; }
  get f1() { return this.form1.controls }
  ngOnInit() {
    this.form = this.formBuilder.group({
      company_id: [null, Validators.required],
      tender_title: [null, Validators.required],
      tender_ref_no: [null, Validators.required],
      bidtype_id: [null, Validators.required],
      tender_location: [null, Validators.required],
      publish_date: [null, Validators.required],
      contact: this.formBuilder.array([]),
      // prebid_submission_date:[null, Validators.required],
      prebid_date: [null],
      completion_period: [null, Validators.required],
      pre_meeting: [null, Validators.required],
      prebidmeetingmode_id: [null],
      tender_submission_date: [null, Validators.required],
      tenderhardcopysubmission_date: [null],
      tender_description: [null, Validators.required],
      tender_detail_link: [null],
      bid_validity: [null, Validators.required],
      reserve_auction: [null, Validators.required],
      closing_date: [null, Validators.required],
      tech_bid_date: [null, Validators.required],
      fin_bid_opening_date: [null],
      tender_doc_cost: [null, Validators.required],
      tender_fee: [null, Validators.required],
      tenderpayment_terms: [null, Validators.required],
      exemption_id: [null, Validators.required],
      ecv: [null, Validators.required],
      emd_ammount: [null],
      paymentmethod_id: [null],
      emd_submission_date: [null],
      forfeiture_condition: [null],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      city:[null],
      financialyear_id: [null, Validators.required],

      //securitydeposit
      securitydeposit_id: [null, Validators.required],
      security_amount: [null],
      securitysubmission_date: [null],
      //performance guarantee
      performanceguarantee_id: [null, Validators.required],
      pg_amount: [null],
      // pgsubmission_date:[null],

      contactperson_check: [null, Validators.required],
      termscheckbox: [false, Validators.required],
      tenderstatus_id: [null],
      working_notes: [null],
      audit_trail: [null],
      remarks: [null],
    });

    this.form1 = this.formBuilder.group({
      company_id: [null],
      name: [null, Validators.required],
      usdg_id: [null],
      usdt_id: [null],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailid: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });

    this.getCompanyData();
    this.getCountryData();
    this.getDesignDeptData();
    this.finYearData();
  }
  patchClient() {
    console.log(this.custDetails)
    this.form1.patchValue({
      company_id: this.custDetails[0]?.company_name
    })
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
      console.log(res);
      
      this.financialData = res.result;
      console.log( this.financialData);
      
    })
  }

  toggleEmdField(val: any): void {
    if (val == '401') {
      this.form.get('emd_ammount')!.setValidators([Validators.required]);
      this.form.get('paymentmethod_id')!.setValidators([Validators.required]);
      this.form.get('emd_submission_date')!.setValidators([Validators.required]);
      // this.form.get('forfeiture_condition')!.setValidators([Validators.required]);
      this.form.controls['emd_ammount'].reset();
      this.form.controls['paymentmethod_id'].reset();
      this.form.controls['emd_submission_date'].reset();
      this.form.controls['forfeiture_condition'].reset();
    }
    else {
      this.form.controls['emd_ammount'].clearValidators();
      this.form.controls['paymentmethod_id'].clearValidators();
      this.form.controls['emd_submission_date'].clearValidators();
      // this.form.controls['forfeiture_condition'].clearValidators();
      this.form.controls['emd_ammount'].reset();
      this.form.controls['paymentmethod_id'].reset();
      this.form.controls['emd_submission_date'].reset();
      this.form.controls['forfeiture_condition'].reset();
    }
  }
  //
  toggleSecurityField(val: any): void {
    if (val == '1001') {
      this.form.get('security_amount')!.setValidators([Validators.required]);
      this.form.get('securitysubmission_date')!.setValidators([Validators.required]);
      this.form.controls['security_amount'].reset();
      this.form.controls['securitysubmission_date'].reset();
    }
    else {
      this.form.controls['security_amount'].clearValidators();
      this.form.controls['securitysubmission_date'].clearValidators();
      this.form.controls['security_amount'].reset();
      this.form.controls['securitysubmission_date'].reset();
    }
  }

  togglePGField(val: any): void {
    if (val == '1001') {
      this.form.get('pg_amount')!.setValidators([Validators.required]);
      this.form.controls['pg_amount'].reset();
      // this.form.get('pgsubmission_date')!.setValidators([Validators.required]);
    }
    else {
      this.form.controls['pg_amount'].clearValidators();
      this.form.controls['pg_amount'].reset();
      // this.form.get('pgsubmission_date')!.clearValidators();
    }
  }

  togglePrebidField(val: any): void {
    if (val == 'Yes') {
      this.form.get('prebidmeetingmode_id')!.setValidators([Validators.required]);
      this.form.get('prebid_date')!.setValidators([Validators.required]);
      this.form.controls['prebidmeetingmode_id'].reset();
      this.form.controls['prebid_date'].reset();
    }
    else {
      this.form.controls['prebidmeetingmode_id'].clearValidators();
      this.form.controls['prebid_date'].clearValidators();
      this.form.controls['prebidmeetingmode_id'].reset();
      this.form.controls['prebid_date'].reset();
    }
  }

  ngAfterViewInit(): void {
    this.button = 'Save & Continue';
    this.update = false;
    if (this.tenderData?.id) {
      this.button = 'Update';
      this.update = true;

      this.apiService.tenderDetails(this.tenderData.id).subscribe((res: any) => {

        console.log(res);
        this.custDetails = res.result[0];
        this.form.patchValue({
          bidder_name: this.custDetails.bidder_name,
          bidtype_id: this.custDetails.bidtype_id,
          company_id: this.custDetails.company_id,
          paymentmethod_id: this.custDetails.paymentmethod_id,
          fin_bid_opening_date: this.custDetails.fin_bid_opening_date,
          // opening_date: this.custDetails.opening_date,
          reserve_auction: this.custDetails.reserve_auction,
          closing_date: this.custDetails.closing_date,
          prebid_date: this.custDetails.prebid_date,
          pre_meeting: this.custDetails.pre_meeting,
          prebid_submission_date: this.custDetails.prebid_submission_date,
          prebidmeetingmode_id: this.custDetails.prebidmeetingmode_id,
          publish_date: this.custDetails.publish_date,
          tech_bid_date: this.custDetails.tech_bid_date,
          tender_description: this.custDetails.tender_description,
          completion_period: this.custDetails.completion_period,
          bid_validity: this.custDetails.bid_validity,
          tender_detail_link: this.custDetails.tender_detail_link,
          tender_doc_cost: this.custDetails.tender_doc_cost,
          tender_fee: this.custDetails.tender_fee,
          tenderpayment_terms: this.custDetails.tenderpayment_terms,
          tender_location: this.custDetails.tender_location,
          tender_ref_no: this.custDetails.tender_ref_no,
          tender_status: this.custDetails.tender_status,
          tender_submission_date: this.custDetails.tender_submission_date,
          tenderhardcopysubmission_date: this.custDetails.tenderhardcopysubmission_date,
          tender_title: this.custDetails.tender_title,
          ecv: this.custDetails.ecv,
          //Security Details
          securitydeposit_id: this.custDetails.securitydeposit_id,
          security_amount: this.custDetails.security_amount,
          securitysubmission_date: this.custDetails.securitysubmission_date,
          //performance Details
          performanceguarantee_id: this.custDetails.performanceguarantee_id,
          pg_amount: this.custDetails.pg_amount,
          // pgsubmission_date: this.custDetails.pgsubmission_date,
          //exemption details
          exemption_id: this.custDetails.exemption_id,
          emd_ammount: this.custDetails.emd_ammount,
          emd_submission_date: this.custDetails.emd_submission_date,
          forfeiture_condition: this.custDetails.forfeiture_condition,
          city:this.custDetails.city,
          country_id: this.custDetails.country_id,
          state_id: this.custDetails.state_id,
          district_id: this.custDetails.district_id,
          financialyear_id: this.custDetails.financialyear_id,
          remarks: this.custDetails.remarks,
          audit_trail: this.custDetails.audit_trail,
        });
debugger
        // this.form.controls['country_id'].setValue(this.custDetails.country_id);
        // this.form.controls['state_id'].setValue(this.custDetails.state_id);
        // this.form.controls['district_id'].setValue(this.custDetails.district_id);
        setTimeout(() => {
          this.getStateData();
          this.getDistrictData();
        }, 500);
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
  }
  removeSelectedFile(index: any) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

  getDetails(data: any) {
    this.isContactFound = false;
    this.custDetails = []
    this.contactDetails = []
    this.addressDetails = []
    this.apiService.companyDetails(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.custDetails = res.result;
        this.contactDetails = res.result[0].contact;
        this.addressDetails = res.result[0].adderss;
        this.isContactFound = false;
      } else {
        this.isContactFound = true;
        this.custDetails = undefined;
        this.contactDetails = undefined;
        this.addressDetails = undefined;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
        this.isContactFound = true;
        this.custDetails = undefined;
        this.contactDetails = undefined;
        this.addressDetails = undefined;
        this.alertService.error("Error: " + error.statusText);
    });
  }


  getCompanyData() {
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
    this.apiService.getTenderType().subscribe((res: any) => {
      this.tenderType = res.bidtype;
      this.meetingMode = res.mettingmode;
      this.emdExp = res.emdexemption;
      this.performanceGuarntee = res.performanceguarantee;
      this.securityDeposit = res.securitydeposit;
      this.payment = res.paymentmethod;
      this.tendStatus = res.tenderstatus;
    });


  }


  // handleCheckboxChange(e: any, data: any) {
  //   if(e.target.checked == true) {
  //     let match = { contact_id: data.contact_id };
  //     this.form.value.contact.push(match);
  //   } else {
  //     let remainData = this.form.value.contact.filter((x: any) => x.contact_id != data.contact_id);
  //     this.form.controls['contact'].setValue(remainData);
  //   }
  //   if(this.form.value.contact.length == 0) {
  //     this.form.controls['contact'].reset();
  //   }
  // }

  handleCheckboxChange(event: any, data: any) {
    const contactArray = this.form.get('contact') as FormArray;
    const contactId = data.contact_id;

    if (event.target.checked) {
      // Checkbox is checked, add item to contact array
      contactArray.push(this.formBuilder.group({ contact_id: contactId }));
    } else {
      // Checkbox is unchecked, remove item from contact array
      const index = contactArray.controls.findIndex((x:any) => x.value.contact_id === contactId);
      if (index !== -1) {
        contactArray.removeAt(index);
      }
    }

    // Reset contact control if array is empty
    if (contactArray.length === 0) {
      this.form.controls['contact'].reset;
    }
  }

  onSubmit1() {
    if (this.form1.valid) {
      this.isSubmitted = true;
      this.loading = true;
      this.createCont();
    }
  }

  createCont() {
    let modID = this.form1.value;
    modID.module_id = "409";
    let match = this.form1.value;
    match.Action = "add";
    var custID = this.custDetails[0].company_id;
    console.log(custID);

    this.form1.value.company_id = this.custDetails[0].company_id;
    this.apiService.createContacts(match).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel1')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.getDetails(custID);
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, error => {
      this.alertService.error("Error: " + error.statusText);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
      if (this.update) {
        this.updateTender();
        // this.form.get('working_notes')!.setValidators([Validators.required]);
        this.form.get('working_notes')!.setValidators([Validators.required]);
        this.form.controls['working_notes'].reset();
      }
      else {
        this.addTender();
        this.form.controls['working_notes'].clearValidators();
        this.form.controls['working_notes'].reset();
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
    }, error => {
      this.alertService.error("Error: " + error.statusText);
    });
  }

  updateTender(): void {
    this.form.value.tender_id = this.tenderData.id;
    console.log(this.form.value.tender_id);

    this.apiService.tenderUpdation(this.form.value).subscribe((res: any) => {
      this.update = true;
      this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        this.router.navigate(['/presales/presales-biding/data-capture-list']);
        this.alertService.success(res.message);
      } else if (res.status == 201) {
        this.alertService.error(res.message);
      } else {
        this.alertService.error('Error, Something went wrong please check');
      }
    });
  }
}

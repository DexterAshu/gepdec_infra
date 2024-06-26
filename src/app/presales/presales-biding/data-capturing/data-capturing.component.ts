import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-data-capturing',
  templateUrl: './data-capturing.component.html',
  styleUrls: ['./data-capturing.component.css']
})
export class DataCapturingComponent implements OnDestroy {
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
  // companyDetails: any;
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
  categoryData: any;
  subCategoryData: any;
  capacityData: any;
  apiLink: any;
  tendContDetails: any;
  multiLocation:any;
  // addCustomLocation:any;
  selectedUserIds:any = [];
  ecvData:any
  private destroy$ = new Subject<void>();

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
      capacity_id: [null],
      qacatagory_id: [null],
      subqacatagory_id: [null],
      bidtype_id: [null, Validators.required],
       tender_location: [null, Validators.required],
      //  tender_location: new FormArray([]),
      // tender_location_type: [null, Validators.required],
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
      // financialyear_id: [null, Validators.required],

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
    this.getCategoryData();
  }
  patchClient() {
    console.log(this.custDetails)
    this.form1.patchValue({
      company_id: this.custDetails[0]?.company_name
    })
  }

  getCountryData() {
    this.apiService.getCountryDataList().pipe(takeUntil(this.destroy$)).subscribe(
      {next: (res: any) => {
        if (res.status === 200) {
          this.countryData = res.result;
        } else {
          this.alertService.warning("Looks like no data available in country data.");
        }
      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    });
  }

  addCustomLocation = (term:any) => ({id: term, tender_location: term});

  getStateData() {
    let countrydata = this.form.value.country_id;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).pipe(takeUntil(this.destroy$)).subscribe(
      {next: (res: any) => {
        if (res.status === 200) {
          this.stateData = res.result;
        } else {
          this.alertService.warning(`Looks like no state available related to the selected country.`);
        }
      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    }
    );
  }

  getDistrictData() {
    this.districtData = [];
    let data = this.form.value.state_id;
    let dist = this.form.value.district_id;
    this.apiService.getDistData(data, dist).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.districtData = res.result;
        } else {
          this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
        }
      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    });
  }

  getDesignDeptData() {
    this.masterService.getUserMaster().pipe(takeUntil(this.destroy$)).subscribe({
      next:(res: any) => {
        this.design = res.designation;
        this.departMent = res.department;
      },error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    })
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.financialData = res.result;
        console.log( this.financialData);
        
      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
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
        this.tendContDetails = [];
        this.custDetails = res.result[0];
        this.tendContDetails = res.result[0].tendercontact;
        console.log(this.tendContDetails);
        this.multiLocation = this.custDetails.tender_location;
       
        this.form.patchValue({
          bidder_name: this.custDetails.bidder_name,
          bidtype_id: this.custDetails.bidtype_id,
          company_id: this.custDetails.company_id,
          paymentmethod_id: this.custDetails.paymentmethod_id,
        
          // opening_date: this.custDetails.opening_date,
          reserve_auction: this.custDetails.reserve_auction,
     
          pre_meeting: this.custDetails.pre_meeting,
          prebidmeetingmode_id: this.custDetails.prebidmeetingmode_id,
          publish_date: this.custDetails.publish_date ? new Date(this.custDetails.publish_date).toISOString().split('T')[0] : null,
          tech_bid_date: this.custDetails.tech_bid_date ? new Date(this.custDetails.tech_bid_date).toISOString().split('T')[0] : null,
          tender_description: this.custDetails.tender_description,
          completion_period: this.custDetails.completion_period,
          bid_validity: this.custDetails.bid_validity,
          tender_detail_link: this.custDetails.tender_detail_link,
          tender_doc_cost: this.custDetails.tender_doc_cost,
          tender_fee: this.custDetails.tender_fee,
          tenderpayment_terms: this.custDetails.tenderpayment_terms,
          tender_location: this.custDetails.tender_location,
          tender_ref_no: this.custDetails.tender_ref_no,
          qacatagory_id: this.custDetails.qacatagory_id,
          subqacatagory_id: this.custDetails.subqacatagory_id,
          capacity_id: this.custDetails.capacity_id,
          tender_status: this.custDetails.tender_status,
          tender_submission_date: this.custDetails.tender_submission_date ? new Date(this.custDetails.tender_submission_date).toISOString().split('T')[0] : null,
          tenderhardcopysubmission_date: this.custDetails.tenderhardcopysubmission_date ? new Date(this.custDetails.tenderhardcopysubmission_date).toISOString().split('T')[0] : null,
          tender_title: this.custDetails.tender_title,
          ecv: this.custDetails.ecv,
          //Security Details
          securitydeposit_id: this.custDetails.securitydeposit_id,
          security_amount: this.custDetails.security_amount,
       
          //performance Details
          performanceguarantee_id: this.custDetails.performanceguarantee_id,
          pg_amount: this.custDetails.pg_amount,
          // pgsubmission_date: this.custDetails.pgsubmission_date,
          //exemption details
          exemption_id: this.custDetails.exemption_id,
          emd_ammount: this.custDetails.emd_ammount,
          forfeiture_condition: this.custDetails.forfeiture_condition,
          city:this.custDetails.city,
          country_id: this.custDetails.country_id,
          state_id: this.custDetails.state_id,
          district_id: this.custDetails.district_id,
          // financialyear_id: this.custDetails.financialyear_id,
          remarks: this.custDetails.remarks ? this.custDetails.remarks.join('\n') : '',
          audit_trail: this.custDetails.audit_trail ? this.custDetails.audit_trail.join('\n') : '',
          contactperson_check: this.custDetails.contactperson_check,

          fin_bid_opening_date: this.custDetails.fin_bid_opening_date ? new Date(this.custDetails.fin_bid_opening_date).toISOString().split('T')[0] : null,
          closing_date: this.custDetails.closing_date ? new Date(this.custDetails.closing_date).toISOString().split('T')[0] : null,
          prebid_date: this.custDetails.prebid_date ? new Date(this.custDetails.prebid_date).toISOString().split('T')[0] : null,
          prebid_submission_date: this.custDetails.prebid_submission_date ? new Date(this.custDetails.prebid_submission_date).toISOString().split('T')[0] : null,
          securitysubmission_date: this.custDetails.securitysubmission_date ? new Date(this.custDetails.securitysubmission_date).toISOString().split('T')[0] : null,
          emd_submission_date: this.custDetails.emd_submission_date ? new Date(this.custDetails.emd_submission_date).toISOString().split('T')[0] : null

        });
       
          // setTimeout(()=>{
          //   this.form.patchValue({
          //     subqacatagory_id: this.custDetails.subqacatagory_id,
          //     capacity_id: this.custDetails.capacity_id,

          //   })
          // },400);
        
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
    this.apiService.companyDetails(data).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.custDetails = res.result;
          const arr = this.custDetails[0].contact;
          console.log(this.custDetails[0].contact);
           arr.forEach((data:any) => {
           data.isChecked = true;
          });
          this.contactDetails = arr;
          console.log( this.contactDetails);
          
          // this.contactDetails = res.result[0].contact;
          this.addressDetails = res.result[0].adderss;
          this.isContactFound = false;
        } else {
          this.isContactFound = true;
          this.custDetails = undefined;
          this.contactDetails = undefined;
          this.addressDetails = undefined;
          this.alertService.warning(res.message);
        }
      },error: (error: any) => {
        this.isContactFound = true;
        this.custDetails = undefined;
        this.contactDetails = undefined;
        this.addressDetails = undefined;
        this.alertService.error("Error: Unknown Error!");
    }
    });
  }

  getCategoryData() {
    this.categoryData = [];
    this.subCategoryData = [];
    this.capacityData = [];
    this.form.controls['qacatagory_id'].setValue(null);
    this.form.controls['subqacatagory_id'].setValue(null);
    this.form.controls['capacity_id'].setValue(null);
    let apiLink = "/biding/api/v1/getQualificationDropdown";
    this.apiService.getData(apiLink).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.categoryData = res.catagory;
      }, error: (error: any) => {
        this.categoryData = undefined;
        this.alertService.error("Error: Unknown Error!");
      }
    });
  }

  getSubData(data:any) {
    this.subCategoryData = [];
    this.capacityData = [];
    this.form.controls['subqacatagory_id'].setValue(null);
    this.form.controls['capacity_id'].setValue(null);
    if(data == '1002' || data == '1003') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?qacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.subCategoryData = res.subcatagory;
        }, error: (error: any) => {
          this.subCategoryData = undefined;
          this.alertService.error("Error: Unknown Error!");
        }
      });
    } else if(data == '1001') {
        this.getCapacityData(data);
    }
  }
  
  getCapacityData(data:any) {
    this.capacityData = [];
    if(data == '2001' || data == '2002') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?subqacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.capacityData = res.capacity;
        }, error:  (error: any) => {
          this.capacityData = undefined;
          this.alertService.error("Error: Unknown Error!");
        }
      });
    } else if (data == '1001') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?qacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.capacityData = res.capacity;
        }, error: (error: any) => {
          this.capacityData = undefined;
          this.alertService.error("Error: Unknown Error!");
        }
      });

    }
  }

  getCompanyData() {
    this.apiService.getCompanyList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if(res.status == 200) {
          this.companyData = res.result;
        } else {
          this.alertService.warning(res.message);
        }
      }, error:  (error: any) => { 
        this.alertService.error("Error: Unknown Error!");
      }
    })
   
    this.apiService.getTenderType().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.tenderType = res.bidtype;
        this.meetingMode = res.mettingmode;
        this.emdExp = res.emdexemption;
        this.performanceGuarntee = res.performanceguarantee;
        this.securityDeposit = res.securitydeposit;
        this.payment = res.paymentmethod;
        this.tendStatus = res.tenderstatus;
      }, error:  (error: any) => { 
        this.alertService.error("Error: Unknown Error!");
      }
    });
  }

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
    this.apiService.createContacts(match).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        let response: any = res;
        document.getElementById('cancel1')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.getDetails(custID);
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, error: (error: any) => {
        this.alertService.error("Error: Unknown Error!");
      }
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
  }

  addTender() {
    this.button = 'Save & Continue';
    this.update = false;
    this.apiService.createTender(this.form.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.router.navigate(['/presales/presales-biding/data-capture-list']);
          // this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, error:  (error: any) => {
        this.alertService.error("Error: Unknown Error!");
      }
    });
  }

  updateTender(): void {
   
    this.form.value.tender_id = this.tenderData.id;
    this.apiService.tenderUpdation(this.form.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.update = true;
        this.isSubmitted = false;
        if (res.status == 200) {
          this.router.navigate(['/presales/presales-biding/data-capture-list']);
          this.alertService.success(res.message);
        } else if (res.status == 201) {
          this.alertService.error(res.message);
        } else {
          this.alertService.error('Error, Something went wrong please check');
        }
      }, error: (error: any) => { 
        console.error(error);
        this.alertService.error("Error: Unknown Error!");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

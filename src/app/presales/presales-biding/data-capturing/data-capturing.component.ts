import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  contactDetails: any;
  addressDetails: any;
  meetingMode: any;
  emdExp: any;
  selectedEmdexemption: boolean = false;
  selectSecurityField: boolean = false;
  selectPGField: boolean = false;
  tenderData:any
  companyDetails: any;
  update: boolean = false;
  button: string = 'Save & Continue';
  payment: any;
  userData: any;
  tendStatus: any;
  previousData: any = [];
  performanceGuarntee: any;
  securityDeposit: any;
  removeContact:any[]=[];
  today: any = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  
  ) {
    // const todayDate = new Date();
    // todayDate.setDate(todayDate.getDate() - 1);
    // this.today = todayDate.toISOString().slice(0, 10);
    // this.openingDateControl.setValue(this.today);

    this.route.params.subscribe((params: Params) => {
      this.tenderData = params;
    });
    const userDataString = localStorage.getItem('gdUserData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
   }


 ngOnInit(){
    this.form = this.formBuilder.group({
      company_id: [null, Validators.required],
      tender_title:[null, Validators.required],
      tender_ref_no:[null, Validators.required],
      bidtype_id:[null, Validators.required],
      tender_location:[null, Validators.required],
      publish_date:[null, Validators.required],
      contact: this.formBuilder.array([]),
      // prebid_submission_date:[null, Validators.required],
      prebid_date:[null, Validators.required],
      prebidmeetingmode_id:[null, Validators.required],
      tender_submission_date:[null, Validators.required],
      tenderhardcopysubmission_date: [null],
      tender_description:[null],
      tender_detail_link:[null],  
      
      opening_date: [null, Validators.required],
      closing_date: [null, Validators.required],
      tech_bid_date: [null, Validators.required],
      fin_bid_opening_date: [null],
      tender_doc_cost: [null, Validators.required],
      tender_fee: [null, Validators.required],
      tenderpayment_terms: [null, Validators.required],
      exemption_id: [null, Validators.required],
      ecv: [null, Validators.required],
      emd_ammount:[null],
      paymentmethod_id:[null],
      emd_submission_date:[null],
      forfeiture_condition:[null],

      //securitydeposit
      securitydeposit_id:[null, Validators.required] , 
      security_amount:[null],
      securitysubmission_date:[null],
      //performance guarantee
      performanceguarantee_id:[null, Validators.required],
      pg_amount: [null],
      pgsubmission_date:[null],

      
      termscheckbox:[null, Validators.required],
      tenderstatus_id:[null],
      working_notes:[null],
      audit_trail:[null],
      remarks:[null],
    });

    this.form1 = this.formBuilder.group({
      company_id: [null],
      name: [null, Validators.required],
      usdg_id:[null],
      usdt_id:[null],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailid: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });

   
    // this.form.get('termscheckbox')!.setValidators([Validators.required]);
    // this.form.get('termscheckbox')!.clearValidators();

    this.getCompanyData();
    this.getCountryData();
    this.getDesignDeptData();
    this.finYearData();
  }
  patchClient()
  {
    console.log(this.custDetails)
    this.form1.patchValue({
      company_id:this.custDetails[0]?.company_name
    })
  }
  termsCheckbox = new FormControl(false);
  textColor = 'red'; // Initial text color
  toggleTextColor(checked: boolean) {
    this.textColor = checked ? 'green' : 'red';
  }

  onCheckboxChange(event: Event) {
    if (event.target instanceof HTMLInputElement) { // Check if the event target is an input element
      const isChecked = event.target.checked; // Access the checked property safely
      this.toggleTextColor(isChecked);
    }
  }

  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
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
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }

  getDesignDeptData(){
      this.masterService.getUserMaster().subscribe((res:any)=>{
      this.design = res.designation;
      this.departMent = res.department;
      })
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res:any) => {
    this.financialData = res.result;
  })
}

toggleEmdField(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement)?.value;
  if(selectedValue == '401'){
    this.form.get('emd_ammount')!.setValidators([Validators.required]);
    this.form.get('paymentmethod_id')!.setValidators([Validators.required]);
    this.form.get('emd_submission_date')!.setValidators([Validators.required]);
    this.form.get('forfeiture_condition')!.setValidators([Validators.required]);
    this.selectedEmdexemption = !this.selectedEmdexemption;
  }
  else{
    this.form.get('emd_ammount')!.clearValidators();
    this.form.get('paymentmethod_id')!.clearValidators();
    this.form.get('emd_submission_date')!.clearValidators();
    this.form.get('forfeiture_condition')!.clearValidators();
  }
}
//
toggleSecurityField(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement)?.value;
  if(selectedValue == '1001'){
    this.form.get('security_amount')!.setValidators([Validators.required]);
    this.form.get('securitysubmission_date')!.setValidators([Validators.required]);
    this.selectSecurityField = !this.selectSecurityField;
  }
  else{
    this.form.get('security_amount')!.clearValidators();
    this.form.get('securitysubmission_date')!.clearValidators();
  }
}
togglePGField(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement)?.value;
  if(selectedValue == '1001'){
    this.form.get('pg_amount')!.setValidators([Validators.required]);
    this.form.get('pgsubmission_date')!.setValidators([Validators.required]);
    this.selectPGField = !this.selectPGField;
  }
  else{
    this.form.get('pg_amount')!.clearValidators();
    this.form.get('pgsubmission_date')!.clearValidators();
  }
}

ngAfterViewInit() : void{
  this.button = 'Save & Continue';
    this.update = false;
  if(this.tenderData?.id){
    this.button = 'Update';
    this.update = true;

    this.apiService.tenderDetails(this.tenderData.id).subscribe((res: any) => {
     
      console.log(res);
        this.custDetails = res.result[0];
        this.form.patchValue({
          bidder_name: this.custDetails.bidder_name,
          bidtype_id: this.custDetails.bidtype_id,
          company_id: this.custDetails.company_id,
          fin_bid_opening_date: this.custDetails.fin_bid_opening_date,
          opening_date: this.custDetails.opening_date,
          closing_date: this.custDetails.closing_date,
          prebid_date: this.custDetails.prebid_date,
          prebid_submission_date: this.custDetails.prebid_submission_date,
          prebidmeetingmode_id: this.custDetails.prebidmeetingmode_id,
          publish_date: this.custDetails.publish_date,
          tech_bid_date: this.custDetails.tech_bid_date,
          tender_description: this.custDetails.tender_description,
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
          pgsubmission_date: this.custDetails.pgsubmission_date,
      //exemption details
          exemption_id: this.custDetails.exemption_id,
          emd_ammount: this.custDetails.emd_ammount,
          emd_submission_date: this.custDetails.emd_submission_date,
          forfeiture_condition: this.custDetails.forfeiture_condition,

          remarks:this.custDetails.remarks,
          audit_trail: this.custDetails.audit_trail,
        }); 


      //   console.log(this.custDetails.remarks);
      //   const remarksData = this.custDetails.map((item: any) => {
      //     console.log(item.remarks.split("."));
      //     return item.remarks.split(".");
          
      // });
      
      // console.log(remarksData);
      
        // const dataArray = this.custDetails.remarks.split('\n');
        //  const newData = dataArray.join(',\n');
        // console.log(newData);

      //   this.custDetails = this.custDetails.remarks.map((item: any) => ({
      //     data: `\n${item}`
      // }));
      // console.log(this.custDetails);
      // for (const iterator of this.custDetails) {
      //     this.previousData.push(iterator.data);
      // }
      // console.log(this.custDetails);
      
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

  getDetails(data:any) {
    this.apiService.companyDetails(data).subscribe((res: any) => {
      console.log(res);
      
      this.custDetails = res.result;
      this.contactDetails = res.result[0].contact;
      console.log(this.contactDetails);
      
      this.addressDetails = res.result[0].adderss;
  })
  }


  get f() { return this.form.controls; }
  get f1(){return this.form1.controls}

  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
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


  handleCheckboxChange(data:any) {
    debugger
    let dataLength = this.form.value.contact.filter((x:any)=>x.contact_id == data.contact_id)
    if(dataLength.length === 1){
      this.form.value.contact = this.form.value.contact.filter((x:any)=>x.contact_id !== data.contact_id)
    } 
    else{
      let match ={
        contact_id : data.contact_id
      }
      this.form.value.contact.push(match);
    }
    console.log(this.form.value);
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
    
    this.form1.value.company_id =  this.custDetails[0].company_id;
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
      })
  }
  onSubmit() {
    if (this.form.valid) {
        this.isSubmitted = true;
        this.loading = true;
    if (this.update) {  
        this.updateTender();
        // this.form.get('tenderstatus_id')!.setValidators([Validators.required]);
        this.form.get('working_notes')!.setValidators([Validators.required]);
    } 
    else {
        this.addTender();
        // this.form.get('tenderstatus_id')!.clearValidators();
        this.form.get('working_notes')!.clearValidators();
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
     this.form.value.tender_id =  this.tenderData.id;
     console.log( this.form.value.tender_id);
     
    this.apiService.tenderUpdation(this.form.value).subscribe((res: any) => {
      this.update = true;
      this.isSubmitted = false;
       if (res.status == 200) {
        this.ngOnInit();
        this.router.navigate(['/presales/presales-biding/data-capture-list']);
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
  });
  }
}

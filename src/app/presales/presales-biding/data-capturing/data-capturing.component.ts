import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-data-capturing',
  templateUrl: './data-capturing.component.html',
  styleUrls: ['./data-capturing.component.css']
})
export class DataCapturingComponent {
  form!: FormGroup;
   
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
  showTenderDetails: boolean = true;
  showClientDetails: boolean = false;
  showEligibility: boolean = false;
  showL1Schedule: boolean = false;
  bankData: any;
  contactDetails: any;
  addressDetails: any;
  meetingMode: any;
  emdExp: any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }




 ngOnInit(){
    this.form = this.formBuilder.group({
      company_id: [null, Validators.required],
      tender_title:[null, Validators.required],
      tender_ref_no:[null, Validators.required],
      bidtype_id:[null, Validators.required],
      tender_location:[null, Validators.required],
      publish_date:[null, Validators.required],
      // prebid_submission_date:[null, Validators.required],
      prebid_date:[null, Validators.required],
      prebidmeetingmode_id:[null, Validators.required],
      tender_submission_date:[null, Validators.required],
      tender_description:[null],
      tender_detail_link:[null],  
      
      opening_date: [null, Validators.required],
      tech_bid_date: [null, Validators.required],
      fin_bid_opening_date: [null, Validators.required],
      tender_doc_cost: [null, Validators.required],
      tender_fee: [null, Validators.required],
      exemption_id: [null, Validators.required],
      ecv: [null, Validators.required],

//tendering company
      
      // company_type:[null],
      // gst:[null],
      // pan:[null],
      // doi:[null],
      // country_id:[null],
      // state_id:[null],
      // district_id:[null],
      // city:[null],
      // web_url:[null],
      // cin_no:[null],
      // pincode:[null],
      // area: [null],
      // address_line1: [null],
      // address_line2: [null],
//tendering contacts
      // name: [null],
      // usdg_id: [null],
      // usdt_id: [null],
      // contactno1: [null],  
      // contactno2: [null],
      // email: [null],

     
    });

  
    this.getCompanyData();
    this.getCountryData();
    this.getDesignDeptData();
    this.finYearData();
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

  createForm(){
    console.clear();
    this.button = 'Create';
    
    
    this.update = false;
    this.form.reset();
  }

  getDetails(data:any) {
    this.apiService.companyDetails(data).subscribe((res: any) => {
      this.custDetails = res.result;
      this.contactDetails = res.result[0].contact;
      this.addressDetails = res.result[0].adderss;
  })
  }


  get f() { return this.form.controls; }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
    this.apiService.getTenderType().subscribe((res: any) => {  
      this.tenderType = res.bidtype;
      this.meetingMode = res.mettingmode;
      this.emdExp = res.emdexemption;
    });
   
 
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      this.isSubmitted = true;
  
       //1-passing Comany id
      //  if (this.form.value.company_name != '') {
      //   if (this.form.value.company_name) {
      //     var compName = this.companyData.filter((item: any) => {
      //       return item.company_name == this.form.value.company_name;
      //     });
      //     console.log(compName);
          
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
 
     this.form.value.company_id =  this.custDetails.company_id;
    this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
       this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('cancel')?.click();
      this.alertService.success('Company Updated Successfully');
    } else {
      this.alertService.error('Something went wrong please try again');
    }
  });
  }
}

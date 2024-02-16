import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

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
  companyData: any;
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any;
  isSubmitted: boolean = false;
  val: any;
  country:any;
  limits: any;
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
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      tender_title:[null, Validators.required],
      tender_ref_no:[null, Validators.required],
      bidtype:[null, Validators.required],
      tender_location:[null, Validators.required],
      publish_date:[null, Validators.required],
      prebid_submission_date:[null, Validators.required],
      prebid_date:[null, Validators.required],
      prebid_meeting_mode:[null, Validators.required],
      tender_submission_date:[null, Validators.required],
      tender_description:[null, Validators.required],
      tender_detail_link:[null],         
//tendering company
      company_name: [null, Validators.required],
      category:[null, Validators.required],
      gst:[null, Validators.required],
      pan:[null, Validators.required],
      doi:[null],
      country_id:[null, Validators.required],
      state_id:[null, Validators.required],
      district_id:[null, Validators.required],
      city:[null, Validators.required],
      web_url:[null],
      cin_no:[null],
      pincode:[null, Validators.required],
      area: [null, Validators.required],
      address_line2: [null],
      address_line3: [null],
//tendering contacts
      cont_name: [null, Validators.required],
      usdg_id: [null, Validators.required],
      usdt_id: [null, Validators.required],
      contactno1: [null, Validators.required],  
      contactno2: [null],
      email: [null, Validators.required],
    
    });

    //Financial Data
      const financialsData = {
      Financials: [
        {
         
          net_worth: [null, Validators.required],
          financialyear_id: [null, Validators.required],
          annual_turnover: [null, Validators.required],
          fin_remarks:[null,'']
        }
      ]
    };
    //Technical Data
      const technicalData = {
      Technical: [
        {
          technical_qualification: [null, Validators.required],
          eligibility: [null, Validators.required],
          attachment: [null],
        }
      ]
    };
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
      console.log(res);
      this.design = res.designation;
      this.departMent = res.department;
  
      
      })
  }

  finYearData() {
    this.isNotFound = true;
    this.masterService.getFinData().subscribe((res:any) => {
      console.log(res);
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
    console.log( this.button);
    
    this.update = false;
    this.form.reset();
  }

   getDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
        this.form.patchValue({
          name: this.custDetails.name,
          company_name: this.custDetails.company_name,
          company_type: this.custDetails.company_type,
          contactno1: this.custDetails.contactno1,
          contactno2: this.custDetails.contactno2,
          email: this.custDetails.email,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          doi: this.custDetails.doi,
          area: this.custDetails.area,
          pincode: this.custDetails.pincode,
          
        }); 
        // this.form.controls['country_id'].setValue(this.custDetails.country_id);
        // this.form.controls['state_id'].setValue(this.custDetails.state_id);
        // this.form.controls['district_id'].setValue(this.custDetails.district_id);
        // setTimeout(() => {
        //   this.getStateData();
        //   this.getDistrictData();
        // }, 500);
  })
  }
  OnlyNumbersAllowed(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is ' + charCode);
      return false;
    }
    return true;
  }

  get f() { return this.form.controls; }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {  
      this.companyData = res.result;
    });
    this.apiService.getTenderType().subscribe((res: any) => {  
      this.tenderType = res.bidtype;
    });
 
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
     
  
       //1-passing Comany id
       if (this.form.value.company_name != '') {
        if (this.form.value.company_name) {
          var compName = this.companyData.filter((item: any) => {
            return item.company_id == this.form.value.company_name;
          });
          console.log(compName);
          
          this.form.value.company_name = compName[0]['company_id'];
        }
      } else {
        this.form.value.company_name = null;
      }
       //2-passing Tender type id
       if (this.form.value.bidtype != '') {
        if (this.form.value.bidtype) {
          var bidTp = this.tenderType.filter((item: any) => {
            return item.bidtype_id == this.form.value.bidtype;
          });
          console.log(bidTp);
          
          this.form.value.bidtype = bidTp[0]['bidtype_id'];
        }
      } else {
        this.form.value.bidtype = null;
      }
     
  
     

        this.loading = true;
    if (this.update) {  
      this.updateTender();
    } else {
      this.addTender();
    }
    }


    const formData: any = new FormData();
    // const files: Array<File> = this.fileList;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }

  formData.append("eligibility",this.form.value.eligibility);
  formData.append("technical_qualification",this.form.value.technical_qualification);
  formData.append("tender_company_name",this.form.value.tender_company_name);
  formData.append("tender_title",this.form.value.tender_title);
  formData.append("tender_ref_no",this.form.value.tender_ref_no);
  formData.append("remarks",this.form.value.remarks);
  // formData.append("bid_condition",this.form.value.bid_condition);
  // formData.append("dependency",this.form.value.dependency);


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
    // this.opac=0;
    // this.loadermsg="Updating..."
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

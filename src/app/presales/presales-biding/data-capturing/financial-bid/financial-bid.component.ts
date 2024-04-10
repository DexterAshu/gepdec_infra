import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-financial-bid',
  templateUrl: './financial-bid.component.html',
  styleUrls: ['./financial-bid.component.css']
})
export class FinancialBidComponent {
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
  tenderData: any;
  clientListData: any;
  tenderDetailsData: any;
  tendDetails: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
        // publish_date: ['', Validators.required],
        // tender_ref_no:['', Validators.required],
        tender_id:['', Validators.required],
        utility_id:['', Validators.required],
        net_worth: [null, Validators.required],
        financialyear_id: [null, Validators.required],
        annual_turnover: [null, Validators.required],
        fin_remarks: [null, Validators.required],
        nclt_status: [null],
        drt: [null],
        cdr: [null]    
    });
    this.getCompanyData();
    this.finYearData();

    this.apiService.getTenderList().subscribe((res: any) => {  
      this.tenderData = res.result;
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

  gettendDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.tenderDetails(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
      this.tendDetails = this.tenderDetailsData[0];
      console.log(this.tenderDetailsData);
    });
  }

  
  // getDetails(event:any) {
  //   debugger
  //   this.data1 = this.clientList; // Assuming this assignment is necessary
  //   this.apiService.tenderDetails(this.data1).subscribe((res: any) => {
  //     this.tenderDetailsData = res.result;
  //     this.tendDetails = this.tenderDetailsData[0];
  //   });
  // }

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

   getDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
        this.form.patchValue({
          utility: this.custDetails.utility,
          tender_title: this.custDetails.tender_title,
          tender_ref_no: this.custDetails.tender_ref_no,
          publish_date: this.custDetails.publish_date,
          net_worth: this.custDetails.net_worth,
          financialyear_id: this.custDetails.financialyear_id,
          annual_turnover: this.custDetails.annual_turnover,
          fin_remarks: this.custDetails.fin_remarks,
          nclt_status: this.custDetails.nclt_status,
          drt: this.custDetails.drt,
          cdr: this.custDetails.cdr,
        }); 
      
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
    // if (this.update) {  
    //   this.updateTender();
    // } else {
    //   this.addTender();
    // }
    }
    const formData: any = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
  formData.append("publish_date",this.form.value.publish_date);
  formData.append("tender_ref_no",this.form.value.tender_ref_no);
  formData.append("tender_title",this.form.value.tender_title);
  formData.append("utility",this.form.value.utility);
  formData.append("net_worth",this.form.value.net_worth);
  formData.append("financialyear_id",this.form.value.financialyear_id);
  formData.append("annual_turnover",this.form.value.annual_turnover);
  formData.append("fin_remarks",this.form.value.fin_remarks);
  formData.append("nclt_status",this.form.value.nclt_status);
  formData.append("drt",this.form.value.drt);
  formData.append("cdr",this.form.value.cdr);
  this.addDocument(formData);
  }

  addDocument(formData: FormData) {
    this.apiService.createDocuments(formData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    });
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


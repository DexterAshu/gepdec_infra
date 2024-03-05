import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.component.html',
  styleUrls: ['./banking-details.component.css']
})
export class BankingDetailsComponent {
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
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  //banking data
  bankData: any[] = [
    {
      Bank: {
        bank_name: [null],
        bank_guarantee: [null],
        bank_guarantee_validity: [null],
        security_deposit: [null],
        security_deposit_validity: [null]
      }
    }
  ];

 ngOnInit(){
    this.form = this.formBuilder.group({
      bank_name: [null],
      bank_guarantee: [null],
      bank_guarantee_validity: [null],
      security_deposit: [null],
      security_deposit_validity: [null]  
    });

  
    this.getCompanyData();
  
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

   getDetails(data:any){
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
        this.form.patchValue({
          bank_name: this.custDetails.bank_name,
          bank_guarantee: this.custDetails.bank_guarantee,
          bank_guarantee_validity: this.custDetails.company_type,
          security_deposit: this.custDetails.security_deposit,
          security_deposit_validity: this.custDetails.security_deposit_validity,
        
          
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

  formData.append("bank_name",this.form.value.bank_name);
  formData.append("bank_guarantee",this.form.value.bank_guarantee);
  formData.append("bank_guarantee_validity",this.form.value.bank_guarantee_validity);
  formData.append("security_deposit",this.form.value.security_deposit);
  formData.append("security_deposit_validity",this.form.value.security_deposit_validity);

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-presales-biding',
  templateUrl: './presales-biding.component.html',
  styleUrls: ['./presales-biding.component.css']
})
export class PresalesBidingComponent {
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
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      // companyId: [null, Validators.required],
      // name: [null, Validators.required],
      company_name: [null, Validators.required],
      bidtype: [null, Validators.required],
      tender_no: [null, [Validators.required]],
      tender_name: [null, [ Validators.required]],
      fund_source: [null, [Validators.required]],
      emd: [null, [Validators.required]] ,
      ecv: [null, Validators.required],
      due_date: [null, Validators.required],  
      compl_period: [null, Validators.required],
      location: [null, Validators.required],
      prebid_date: [null, Validators.required],
      coment_qr: [null, Validators.required],
      sbmitted_date: [null, Validators.required],
      tech_bid_date: [null, Validators.required],
      pbid_open_date: [null, Validators.required],
      qt_value: [null, Validators.required],
      biders: [null, Validators.required],
      price_gst: [null, Validators.required],
      tender_description: [null],
      jv: [null],
    });

    this.getCompanyData();
    // this.getCountryData();
    
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
     
  
      //passing all values
      if (this.form.value.company_name != '') {
        this.form.value.company_name == '';
      } else {
        this.form.value.company_name = null;
      }
      if (this.form.value.company_type != '') {
        this.form.value.company_type == '';
      } else {
        this.form.value.company_type = null;
      }
      if (this.form.value.name != '') {
        this.form.value.name == '';
      } else {
        this.form.value.name = null;
      }
      if (this.form.value.contactno1 != '') {
        this.form.value.contactno1 == '';
      } else {
        this.form.value.contactno1 = null;
      }
      if (this.form.value.contactno2 != '') {
        this.form.value.contactno2 == '';
      } else {
        this.form.value.contactno2 = null;
      }
      if (this.form.value.email != '') {
        this.form.value.email == '';
      } else {
        this.form.value.email = null;
      }
      if (this.form.value.gst != '') {
        this.form.value.gst == '';
      } else {
        this.form.value.gst = null;
      }
      if (this.form.value.pan != '') {
        this.form.value.pan == '';
      } else {
        this.form.value.pan = null;
      }
      if (this.form.value.doi != '') {
        this.form.value.doi == '';
      } else {
        this.form.value.doi = null;
      }
      if (this.form.value.area != '') {
        this.form.value.area == '';
      } else {
        this.form.value.area = null;
      }
      if (this.form.value.pincode != '') {
        this.form.value.pincode == '';
      } else {
        this.form.value.pincode = null;
      }

        this.loading = true;
    if (this.update) {  
      this.updateTender();
    } else {
      this.addTender();
    }
    }
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-capture-data-list',
  templateUrl: './capture-data-list.component.html',
  styleUrls: ['./capture-data-list.component.css']
})
export class CaptureDataListComponent {
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
      
  })
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
}

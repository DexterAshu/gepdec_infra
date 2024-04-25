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
  dataDropdownList: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      type_id: [null, Validators.required],
      expensetype_id: [null, Validators.required],
      uom: [null, [Validators.required]],
      multiplier: [null, [ Validators.required]],
      unitcost: [null, [Validators.required]],
   
    });

    this.getCompanyData();
    this.getDropdownList();
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
          type_id: this.custDetails.type_id,
          expensetype_id: this.custDetails.expensetype_id,
          multiplier: this.custDetails.multiplier,
          uom: this.custDetails.uom,
          unitcost: this.custDetails.unitcost,
        }); 
    
  })
  }
  getExpenseDetails(event: any) {
    // const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    // this.clientListData = company_id;
    // this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
    //   this.tenderDetailsData = res.result;
    //   console.log(this.tenderDetailsData);
    // });
  }

  getDropdownList() {
    this.dataDropdownList = [];
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.dataDropdownList = res;
        console.log(this.dataDropdownList);
        
      }
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

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-company-contacts',
  templateUrl: './company-contacts.component.html',
  styleUrls: ['./company-contacts.component.css']
})
export class CompanyContactsComponent {
  form!: FormGroup;
  p: number = 1;
  username1: any;
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
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
  design: any;
  departMent: any;
  inputValue: any;
  modList: any;
  module_id: any;
  modListData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      module_id: [null, Validators.required],
      company_id: [null, Validators.required],
      name: [null, Validators.required],
      usdg_id: [null],
      usdt_id: [null],
      contactno1: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailid: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
    this.getCustomerData();
    this.getCompanyData(408);



    this.masterService.getUserMaster().subscribe((res: any) => {
      this.design = res.designation;
      this.departMent = res.department;
    })

  }

  createForm() {
    console.clear();
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }

  getDetails(data: any) {
    this.form.reset();
    this.button = 'Update';
    this.update = true;
    this.apiService.companyDetails(data.company_id).subscribe((res: any) => {
      this.custDetails = res.result[0];
      this.form.patchValue({
        name: this.custDetails.name,
        company_id: this.custDetails.company_id,
        module_id: this.custDetails.module_id,
        contactno1: this.custDetails.contactno1,
        contactno2: this.custDetails.contactno2,
        emailid: this.custDetails.emailid,
        usdt_id: this.custDetails.usdt_id,
        usdg_id: this.custDetails.usdg_id,

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

  getCustomerData() {
    const apiLink = `/contact/api/v1/getContactModulesDropdowm`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.compData = res.result;
        console.log(this.compData);
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
  }
  tendComp(event: any) {
    const module_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.modListData = module_id;
    console.log(this.modListData);
    const apiLink = `/contact/api/v1/getCompanyDropdownByModule/${module_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {

      this.modList = res.result;
      //   if (res.status === 200) {
      //  } else{
      //   this.alertService.warning(res.message);
      //  }
    })
  }

  getCompanyData(data: any) {
    this.isNotFound = false;
    this.companyData = [];
    this.apiService.getContactList(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.companyData = res.result;
        this.limits.push({ key: 'ALL', value: this.companyData.length });
      } else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      //4-passing Company_id
      // if (this.form.value.module_id !== null) {
      //   var modListId = this.compData.filter((item: any) => {
      //     return item.contactmodule == this.form.value.module_id;
      //   });
      //   this.form.value.module_id = modListId[0]['module_id'];
      // }
      // else {
      //   this.form.value.module_id = null;
      // }

      // if (this.form.value.company_id !== null) {
      //   var countryType = this.modList.filter((item: any) => {
      //     return item.company_name == this.form.value.company_id;
      //   });
      //   this.form.value.company_id = countryType[0]['company_id'];
      // }
      // else {
      //   this.form.value.company_type = null;
      // }



      this.loading = true;
      if (this.update) {
        this.companyCont();
      } else {
        this.createCont();
      }
    }
  }

  createCont() {
    let match = this.form.value;
    match.Action = "add";
    this.apiService.createContacts(match).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.getCompanyData(408);
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    })
  }
  companyCont(): void {
    this.form.value.company_id = this.custDetails.company_id;
    //  this.form.value.action = "add";
    this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
      this.isSubmitted = false;

      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('closed')?.click();
        this.alertService.success(res.message);
      } else if (res.status == 201) {
        this.alertService.error(res.message);
      } else {
        this.alertService.error('Error, Something went wrong please check');
      }

    });
  }
}

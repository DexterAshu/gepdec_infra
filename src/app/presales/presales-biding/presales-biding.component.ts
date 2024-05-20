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
  companyList: any;
  tenderType: any;
  dataDropdownList: any;
  costType: any;
  expenseTypeData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      type_id: [null, Validators.required],
      expensetype_id: [null, Validators.required],
      uom: [null, [Validators.required]],
      multiplier: [null, [Validators.required]],
      unitcost: [null, [Validators.required]],
      total_cost: [null, [Validators.required]],

    });

    this.getCompanyData();
    this.getDropdownList();
  }


  getDetails(data: any) {
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


  getDropdownList() {
    this.dataDropdownList = [];
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.dataDropdownList = res;
        console.log(this.dataDropdownList);

      }
    })
  }

  get f() { return this.form.controls; }

  getCompanyData() {
    this.companyData = [];
    this.isNotFound = false;
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status == 200) {
        this.companyData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning("Looks like no data available.");
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });

    this.apiService.getCostType().subscribe((res: any) => {
      this.costType = res.costtype;
    });

  }
  getExpenseDetails(costtype_id: any) {
    this.expenseTypeData = this.costType.filter((x: any) => x.expense_type == costtype_id);
    // const costtype_id = event?.target ? (event.target as HTMLInputElement).value : event;
    // this.expenseTypeData = costtype_id;
    // this.apiService.getTenderLisById(this.expenseTypeData).subscribe((res: any) => {
    //   this.tenderDetailsData = res.result;
    // });
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
  createForm() {
    console.clear();
    this.button = 'Create';
    this.update = false;
    this.form.reset();
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
    this.form.value.company_id = this.custDetails.company_id;
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

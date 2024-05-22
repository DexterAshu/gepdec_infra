import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-bid-qualify',
  templateUrl: './bid-qualify.component.html',
  styleUrls: ['./bid-qualify.component.css']
})
export class BidQualifyComponent {
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
  isVisible: boolean = true;
  results: any;
  resumeFile: any;
  formData: any;
  attachment: any = [];



  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tender_title: [null, Validators.required],
      eligibility: [null, Validators.required],
      technical_qualification: [null, Validators.required],
      // bid_condition: [null, Validators.required],
      tender_company_name: [null, Validators.required],
      tender_ref_no: [null, Validators.required],
      remarks: [null, Validators.required],

      // dependency:[null, Validators.required],

    });


    this.getCompanyData();


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
        eligibility: this.custDetails.eligibility,
        technical_qualification: this.custDetails.technical_qualification,
        // bid_condition: this.custDetails.bid_condition,
        tender_company_name: this.custDetails.tender_company_name,
        tender_title: this.custDetails.tender_title,
        tender_ref_no: this.custDetails.tender_ref_no,
        remarks: this.custDetails.remarks,
        // dependency:this.custDetails.dependency,


      });
    })
  }
  get f() { return this.form.controls; }

  getCompanyData() {
    this.isNotFound = false;
    this.companyData = [];
    this.apiService.getCompanyList().subscribe((res: any) => {
      if (res.status === 200) {
        this.companyData = res.result;
        this.isNotFound = false;
        this.limits.push({ key: 'ALL', value: this.companyData.length });
      } else {
        this.isNotFound = true;
        this.companyData = undefined;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.isNotFound = true;
      this.companyData = undefined;
      this.alertService.warning("Error: Unknown Error!");
    });
  }

  fileList: File[] = [];
  listOfFiles: any[] = [];

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

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      this.loading = true;
      if (this.update) {
        this.bidUpdate();
      } else {
        this.createBid();
      }
    }


    const formData: any = new FormData();
    // const files: Array<File> = this.fileList;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }

    formData.append("eligibility", this.form.value.eligibility);
    formData.append("technical_qualification", this.form.value.technical_qualification);
    formData.append("tender_company_name", this.form.value.tender_company_name);
    formData.append("tender_title", this.form.value.tender_title);
    formData.append("tender_ref_no", this.form.value.tender_ref_no);
    formData.append("remarks", this.form.value.remarks);
    // formData.append("bid_condition",this.form.value.bid_condition);
    // formData.append("dependency",this.form.value.dependency);


  }


  createBid() {
    this.apiService.bidQuali(this.formData).subscribe((res: any) => {


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
  bidUpdate(): void {

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

  toggleVisibility() {
    console.log(this.companyData)
    this.isVisible = !this.isVisible;
  }




}

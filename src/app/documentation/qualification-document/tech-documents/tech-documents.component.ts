import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tech-documents',
  templateUrl: './tech-documents.component.html',
  styleUrls: ['./tech-documents.component.css']
})
export class TechDocumentsComponent {
  
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  apiUrl = environment.apiUrl;
  searchText: any;
  companyData: any = [];
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  addTech: any = [];
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  clientListData: any;
  tenderDetailsData: any;
  tenderData: any;
  docListData: any;
  inserteddata: any;
  discardeddata: any;
  techData: any = [];
  filterTenderDetailsData: any = [];
  uploadFile: any;
  isOpen: boolean = false;
  categoryData: any;
  subCategoryData: any;
  capacityData: any;
  apiLink: any;
  rowData: any;
  clientData: any;
  showAsPdf: SafeResourceUrl | undefined

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      qacatagory_id: [null, Validators.required],
      subqacatagory_id: [null],
      capacity_id: [null],
      experience: [null],
      compPeriod: [null],
      resourceUsed: [null],
      compYear: [null],
      attachment: [null, Validators.required],
      technical_points: [null, Validators.required],
      client_id: [null],
      tender_id: [null],
    });

    this.getData();
    this.getClientData();
    this.companyDataList();
    this.getCategoryData();
  }

  get f() { return this.form.controls; }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  companyDataList() {
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    })
  }

  getData() {
    this.docListData = [];
    this.isNotFound = false;
    let apiLink = "/mycompany/api/v1/getMyComapanyQualificationList"
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, error => {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.error("Error: " + error.statusText);
    });
  }

  getClientData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.clientData = res.result;
    });
  }

  getCategoryData() {
    this.categoryData = [];
    this.subCategoryData = [];
    this.capacityData = [];
    this.form.controls['qacatagory_id'].setValue(null);
    this.form.controls['subqacatagory_id'].setValue(null);
    this.form.controls['capacity_id'].setValue(null);
    let apiLink = "/biding/api/v1/getQualificationDropdown";
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.categoryData = res.catagory;
    }, error => {
      this.categoryData = undefined;
      this.alertService.error("Error: " + error.statusText);
    });
  }

  getSubData(data:any) {
    this.subCategoryData = [];
    this.capacityData = [];
    this.form.controls['subqacatagory_id'].setValue(null);
    this.form.controls['capacity_id'].setValue(null);
    if(data == '1002' || data == '1003') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?qacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).subscribe((res: any) => {
        this.subCategoryData = res.subcatagory;
      }, error => {
        this.subCategoryData = undefined;
        this.alertService.error("Error: " + error.statusText);
      });
    } else if(data == '1001') {
        this.getCapacityData(data);
    }
  }
  
  getCapacityData(data:any) {
    this.capacityData = [];
    if(data == '2001' || data == '2002') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?subqacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).subscribe((res: any) => {
        this.capacityData = res.capacity;
      }, error => {
        this.capacityData = undefined;
        this.alertService.error("Error: " + error.statusText);
      });
    } else if (data == '1001') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?qacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).subscribe((res: any) => {
        this.capacityData = res.capacity;
      }, error => {
        this.capacityData = undefined;
        this.alertService.error("Error: " + error.statusText);
      });

    }
  }
  
  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
    });
  }

  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  //button dropdown
 
  showPdf(a:any) {
    this.showAsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrl}${a?.document}`);
  }

  // download(): void {
  //   let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
  //     display: false,
  //     raw: true,
  //   });
  //   XLSX.writeFile(wb, 'Data_File.xlsx');
  // }

  // addMultiTechPoints() {
  //   let formData = {... this.form.value };
  //   // let mergedData = { ...formData, 'attachment': this.uploadFile}
  //   this.addTech.push(formData);
  //   this.form.controls['technical_points'].reset();
  //   // this.uploadFile = [];
  // }

  // deletecsdp(val: any) {
  //   this.addTech.splice(val, 1)
  // }

  onFileChanged(event: any) {
    this.uploadFile = [];
    let file = event.target.files[0];
    let type = /(\.pdf)$/i;
    if (type.exec(file.name)) {
      this.uploadFile = file;
    } else {
      this.form.controls['attachment'].setValue(null);
      this.alertService.warning("Please choose only .pdf file!");
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.loading = true;
      const formData: any = new FormData();
      formData.append(`bidder_id`, this.form.value.company);
      formData.append(`qacatagory_id`, this.form.value.qacatagory_id);
      formData.append(`subqacatagory_id`, this.form.value.subqacatagory_id);
      formData.append(`capacity_id`, this.form.value.capacity_id);
      formData.append(`total_experience`, this.form.value.experience);
      formData.append(`completion_period`, this.form.value.compPeriod);
      formData.append(`resource_used`, this.form.value.resourceUsed);
      formData.append(`completion_year`, this.form.value.compYear);
      formData.append(`technical_points`, this.form.value.technical_points);
      formData.append(`company_id`, this.form.value.client_id);
      formData.append(`tender_id`, this.form.value.tender_id);

      formData.append(`attachment`, this.uploadFile);

      let apiLink = '/mycompany/api/v1/addMyComapanyQualification'
      this.apiService.postDataFD(apiLink ,formData).subscribe((res:any) => {
        document.getElementById('cancel')?.click();
        this.getData();
        this.isSubmitted = false;
        if (res.status == 200) {
          this.form.reset();
          document.getElementById('cancel')?.click();
          this.alertService.success(res.message);
        } else {
          document.getElementById('cancel')?.click();
          this.alertService.warning(res.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: " + error.statusText);
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}



import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_services';
@Component({
  selector: 'app-technical-bid',
  templateUrl: './technical-bid.component.html',
  styleUrls: ['./technical-bid.component.css']
})
export class TechnicalBidComponent {
  
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any = [];
  isNotFound: boolean = false;
  isSubmitted: boolean = false;
  addTech: any = [];
  loading: boolean = false;
  companyList: any;
  tenderType: any;
  clientListData: any;
  tendDetails: any;
  tenderDetailsData: any;
  tenderData: any;
  docListData: any;
  inserteddata: any;
  discardeddata: any
  techData: any = [];
  filterTenderDetailsData: any = [];
  uploadFile: any;
    categoryData: any;
  subCategoryData: any;
  capacityData: any;
  apiLink: any;
  rowData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    private router: Router,
    private elementRef: ElementRef,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      client_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      qacatagory_id: [null, Validators.required],
      subqacatagory_id: [null],
      capacity_id: [null],
      total_experience: [null],
      completion_period: [null],
      resource_used: [null],
      completion_year: [null],
      technical_points: [null, Validators.required],
      qualified: [null, Validators.required],
    });

    this.getCompanyData();
    this.getData();
    this.getCategoryData();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  get f() { return this.form.controls; }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getData() {
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getTechDataList().subscribe((res: any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.error("Error: Unknown Error!");
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
    }, (error: any) => {
      this.categoryData = undefined;
      this.alertService.error("Error: Unknown Error!");
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
      }, (error: any) => {
        this.subCategoryData = undefined;
        this.alertService.error("Error: Unknown Error!");
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
      }, (error: any) => {
        this.capacityData = undefined;
        this.alertService.error("Error: Unknown Error!");
      });
    } else if (data == '1001') {
      this.apiLink = `/biding/api/v1/getQualificationDropdown?qacatagory_id=${data}`;
      this.apiService.getData(this.apiLink).subscribe((res: any) => {
        this.capacityData = res.capacity;
      }, (error: any) => {
        this.capacityData = undefined;
        this.alertService.error("Error: Unknown Error!");
      });

    }
  }
  
  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.filterTenderDetailsData = [];
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
    });
  }

  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
  }

  getrefData(tender_id: any) {
    debugger
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  //button dropdown
 
  // getDetails(event:any) {
  //   this.data1 = this.clientList; // Assuming this assignment is necessary
  //   this.apiService.tenderDetails(this.data1).subscribe((res: any) => {
  //     this.tenderDetailsData = res.result;
  //     this.tendDetails = this.tenderDetailsData[0];
  //   });
  // }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }

  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      if(res.status == 200) {
        this.companyData = res.result;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.apiService.getTenderType().subscribe((res: any) => {
      if(res.status == 200) {
        this.tenderType = res.bidtype;
      } else {
        this.alertService.warning(res.message);
      }
    }),
    (error: any) => { 
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }

  }

  addMultiTechPoints() {
    let formData = {... this.form.value };
    this.addTech.push(formData);
    this.form.controls['qacatagory_id'].reset();
    this.form.controls['subqacatagory_id'].reset();
    this.form.controls['capacity_id'].reset();
    this.form.controls['total_experience'].reset();
    this.form.controls['completion_period'].reset();
    this.form.controls['resource_used'].reset();
    this.form.controls['completion_year'].reset();
    this.form.controls['technical_points'].reset();
    this.form.controls['qualified'].reset();
  }

  deletecsdp(val: any) {
    this.addTech.splice(val, 1)
  }

  // onFileChanged(event: any) {
  //   this.uploadFile = [];
  //   let file = event.target.files[0];
  //   let type = /(\.pdf)$/i;
  //   if (type.exec(file.name)) {
  //     this.uploadFile = file;
  //   } else {
  //     this.form.controls['attachment'].setValue(null);
  //     this.alertService.warning("Please choose only .pdf file!");
  //   }
  // }

  onSubmit() {
    if (this.addTech.length > 0) {
      this.isSubmitted = true;
      this.loading = true;
      let data = this.addTech;
      this.addTech = [];
      this.apiService.addTechData(data).subscribe((res:any) => {
        document.getElementById('cancel')?.click();
        this.getData();
        this.isSubmitted = false;
        if (res.status == 200) {
          this.filterTenderDetailsData = [];
          this.form.reset();
          this.alertService.success(res.message);
        } else {
          this.alertService.warning(res.message);
        }
      }, (error) => {
          this.isSubmitted = false;
          document.getElementById('cancel')?.click();
          this.alertService.error("Error: Unknown Error!");
        })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  // onUpdateTech(): void {
  //   this.form.value.company_id = this.custDetails.company_id;
  //   this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
  //     this.isSubmitted = false;
  //     if (res.status == 200) {
  //       this.ngOnInit();
  //       document.getElementById('cancel')?.click();
  //       this.alertService.success('Company Updated Successfully');
  //     } else {
  //       this.alertService.error('Something went wrong please try again');
  //     }
  //   });
  // }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
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
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country: any;
  limits: any = [];
  addTech: any = [];
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
  clientListData: any;
  tendDetails: any;
  tenderDetailsData: any;
  tenderData: any;
  docListData: any;
  bankData: any;
  docType: any;
  inserteddata: any;
  discardeddata: any;
  isExcelDownloadData: boolean = true;
  qualifyPoints: any;
  techData: any = [];
  filterTenderDetailsData: any = [];
  uploadFile: any;
  isOpen: boolean = false;
  categoryData: any;
  subCategoryData: any;
  capacityData: any;
  apiLink: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      client_id: [null, Validators.required],
      tender_id: [null, Validators.required],
      qacatagory_id: [null, Validators.required],
      subqacatagory_id: [null],
      capacity_id: [null],
      technical_points: [null, Validators.required],
    });

    this.apiService.getTenderList().subscribe((res: any) => {
      this.tenderData = res.result;
    });

    this.getCompanyData();
    this.getData();
    this.getCategoryData();
  }

  get f() { return this.form.controls; }

  getData() {
    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
    });

    this.apiService.getTenderList().subscribe((res: any) => {
      this.tenderData = res.result;
    });

    this.apiService.getTechDataList().subscribe((res: any) => {
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

  getCategoryData() {
    // debugger
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
      console.log(this.tenderDetailsData);
    });
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x: any) => x.tender_id == tender_id);
  }

  //button dropdown
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // getDetails(event:any) {
  //   debugger
  //   this.data1 = this.clientList; // Assuming this assignment is necessary
  //   this.apiService.tenderDetails(this.data1).subscribe((res: any) => {
  //     this.tenderDetailsData = res.result;
  //     this.tendDetails = this.tenderDetailsData[0];
  //   });
  // }

  exportAsXLSX1() {
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
    var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");
    XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");
    XLSX.writeFile(wb, "Data_File.xlsx");

  }

  downloadPdf() {
    const pdfUrl = './assets/tamplate/country_bulkload_template_file.xlsx';
    const pdfName = 'country_bulkload_template_file.xlsx';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
    });
    this.apiService.getTenderType().subscribe((res: any) => {
      this.tenderType = res.bidtype;
    });

  }

  addMultiTechPoints() {
    debugger
    let formData = {... this.form.value };
    // let mergedData = { ...formData, 'attachment': this.uploadFile}
    this.addTech.push(formData);
    this.form.controls['technical_points'].reset();
    // this.uploadFile = [];
    // console.log(this.addTech); 
  }

  deletecsdp(val: any) {
    this.addTech.splice(val, 1)
  }

  // onFileChanged(event: any) {
  //   debugger
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
    debugger
    if (this.addTech.length > 0) {
      this.isSubmitted = true;
      this.loading = true;
      // const formData: any = new FormData();
      // this.addTech.forEach((obj:any, index:any) => {
      //   formData.append(`qualification[${index}][tender_id]`, obj.tender_id);
      //   formData.append(`qualification[${index}][bideligibility_criteria]`, obj.eligibility);
      //   formData.append(`qualification[${index}][technical_points]`, obj.technical_points);
      //   formData.append(`qualification[${index}][technical_remarks]`, obj.techRemarks);
      //   formData.append(`qualification[${index}][documentname]`, obj.attachment.length != 0 ? obj.attachment.name : null);
      //   formData.append('attachment', obj.attachment.length != 0 ? obj.attachment : null);
      //   formData.append(`qualification[${index}][count]`, obj.attachment.length != 0 ? 1 : 0);
      //   formData.append(`qualification[${index}][document]`, obj.attachment.length != 0 ? "true" : "false");
      // });

      let data = this.addTech;
      this.addTech = [];
      this.apiService.addTechData(data).subscribe((res:any) => {
        document.getElementById('cancel')?.click();
        this.getData();
        this.isSubmitted = false;
        if (res.status == 200) {
          // this.form.reset();
          this.alertService.success(res.message);
        } else {
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


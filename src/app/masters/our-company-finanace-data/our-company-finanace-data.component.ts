import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-our-company-finanace-data',
  templateUrl: './our-company-finanace-data.component.html',
  styleUrls: ['./our-company-finanace-data.component.css']
})
export class OurCompanyFinanaceDataComponent {
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any;
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any = [];
  isSubmitted: boolean = false;
  val: any;
  country:any;
  limits: any = [];

  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
  contDetails: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  financialData: any;
  finDetails: any;
  discardeddata: any = [];
  filterTenderDetailsData: any[] = [];
  listOfFiles: any[] = [];
  attachment: any[] = [];
  docData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bidder_id: [null, Validators.required],
      attachment:[null, Validators.required],
      issue_date:[null],
      bidderdocumenttype_id: [null, Validators.required],
    });

  this.getData();
  this.getCompanyType();
  }
  get f() { return this.form.controls; }
  getData() {
    this.apiService.getCompanyDocList().subscribe((res:any) => {
      if (res.status === 200) {
        this.docData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
    //company list data
      const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    },(error: any) => {
      console.log(error);
      this.alertService.error(`Error: ${error.statusText}`);
    })
  }

  getCompanyType() {
    const apiLink = `/mycompany/api/v1/getMyComapanyDropdown`;
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.bidderdocumenttype;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },(error: any) => {
      console.log(error);
      this.alertService.error(`Error: ${error.statusText}`);
    })
  }

  onFileChanged(event: any) {  
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
  }
  removeSelectedFile(index: any) { 
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
    display: false,
    raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
  onSubmit() {
    this.isSubmitted = true;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append('bidder_id', this.form.value.bidder_id);  
    formData.append('issue_date', this.form.value.issue_date);  
    formData.append('bidderdocumenttype_id', this.form.value.bidderdocumenttype_id);  
    this.addAttachment(formData);
}
  addAttachment(formData: FormData) {
    this.apiService.myCompanyDoc(formData).subscribe((res: any) => {
    let response: any = res;
    document.getElementById('cancel')?.click();
    this.isSubmitted = false;
    if (response.status == 200) {
      this.ngOnInit();
      this.form.reset();
      this.alertService.success(response.message);
        } else {
        this.alertService.warning(response.message);
        }
    }, (error) => {
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: " + error.statusText);
    });
  }
}
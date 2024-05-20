import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService, AlertService, MasterService } from 'src/app/_services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fin-itr',
  templateUrl: './fin-itr.component.html',
  styleUrls: ['./fin-itr.component.css']
})
export class FinItrComponent {
  documentForm!: FormGroup;
  attachment: File[] = [];
  isSubmitted: boolean = false;
  listOfFiles: string[] = [];
  fileList: any[] = [];
  tableHeight: any;
  searchText: string = '';
  isNotFound: boolean = false;
  meterData: any;
  p: number = 1;
  limit = environment.pageLimit;
  docType: any;
  docListData: any;
  companyData: any;
  tenderType: any;
  inserteddata: any;
  discardeddata: any
  financialData: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      bidder_id: ['',Validators.required],
      financialyear_id: ['',Validators.required],
      itr:['',Validators.required],
      itr_date:[''],
      itr_number:[''],
      attachment: ['', Validators.required],
      description: [''],
    });
    this.getData();
  }

  redirect(route: any) {
    if (route) {
      this.router.navigateByUrl(route.target.value);
    }
  }

  getData() { 
    const apiLink = `/mycompany/api/v1/getMyComapanyList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      this.companyData = res.result;
    })
    this.masterService.getFinData().subscribe((res:any) => {
      this.financialData = res.result;
    });

    this.docListData = [];
    this.isNotFound = false;
    this.apiService.getOurFinList().subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.docListData = res.result;
      } else {
        this.isNotFound = true;
        this.docListData = undefined;
        this.alertService.warning("Looks like no data available in type.");
      }
    }, (error: any) => {
      console.error(error);
      this.isNotFound = true;
      this.docListData = undefined;
      this.alertService.error("Error: Unknown Error!");
    });

  }

  onFileChanged(event: any) {
    try {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.listOfFiles.push(files[i].name);
        this.attachment.push(files[i]);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  

 
  get f() {
    return this.documentForm.controls;
  }

   download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {display: false, raw: true});
    XLSX.writeFile(wb, 'Export Excel File.xlsx');
  }


  onSubmit() {
    this.isSubmitted = true;
    const formData: FormData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append('attachment', this.attachment[i]);
    }

    formData.append('bidder_id', this.documentForm.value.bidder_id);
    formData.append('financialyear_id', this.documentForm.value.financialyear_id);
    formData.append('itr', this.documentForm.value.itr);
    if(this.documentForm.value.itr_number != '' || this.documentForm.value.itr_number != null){
      formData.append('itr_number', this.documentForm.value.itr_number);
    }
    if(this.documentForm.value.itr_date != '' || this.documentForm.value.itr_date != null){
      formData.append('itr_date', this.documentForm.value.itr_date);
    }
    formData.append('description', this.documentForm.value.description);
    this.addDocument(formData);
  }

  addDocument(formData: FormData) {
    this.apiService.createOurFinDocuments(formData).subscribe((res: any) => {
      let response: any = res;
      document.getElementById('cancel')?.click();
      this.isSubmitted = false;
      if (response.status == 200) {
        this.ngOnInit();
        this.documentForm.reset();
        this.alertService.success(response.message);
      } else {
        this.alertService.warning(response.message);
      }
    }, (error) => {
      this.isSubmitted = false;
      document.getElementById('cancel')?.click();
      this.alertService.error("Error: Unknown Error!");
    });
  }
}



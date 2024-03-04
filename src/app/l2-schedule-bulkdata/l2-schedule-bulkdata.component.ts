import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
//  const FileSaver = require('file-saver');
 @Component({
   selector: 'app-l2-schedule-bulkdata',
   templateUrl: './l2-schedule-bulkdata.component.html',
   styleUrls: ['./l2-schedule-bulkdata.component.css']
  })
  export class L2ScheduleBulkdataComponent {
  form!: FormGroup;  
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any;
  isNotFound:boolean = false;
  countryData: any;
  stateData: any;
  districtData: any;
  isSubmitted: boolean = false;
  val: any;
  country:any;
  limits: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  updateData: any;
  createModal: boolean = false;
  update: boolean = false;
  button: string = 'Create';
  custDetails: any;
  loadermsg: any;
  loading: boolean = false;
  compData: any;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      project:[null, Validators.required],
      milestone: [null, Validators.required],
      task: [null, Validators.required],
      unit: [null],
      quantity: [null],
      progress: [null] ,
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],  
      department: [null, Validators.required],  
     
    });

    this.getCompanyData();
    this.getCompanyType();
  
    
  }

  createForm(){
    console.clear();
    this.button = 'Create';
    console.log( this.button);
    
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
          project: this.custDetails.project,
          milestone: this.custDetails.milestone,
          task: this.custDetails.task,
          unit: this.custDetails.unit,
          progress: this.custDetails.progress,
          start_date: this.custDetails.start_date,
          end_date: this.custDetails.end_date,
          department: this.custDetails.department,
        }); 
      
  })
  }


  get f() { return this.form.controls; }
  getCompanyType() {
    this.apiService.getCompData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
      this.limits.push({ key: 'ALL', value: this.companyData.length });
      this.isExcelDownload = true;
    });
 
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data.xlsx');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
       //1-passing Country id
       if (this.form.value.country_id !== null) {
        var countryVal = this.countryData.filter((item: any) => {
          return item.country_id == this.form.value.country_id;
        });
        this.form.value.country_id = countryVal[0]['country_id'];
      }
      else {
        this.form.value.country_id = null;
      } 
    
       //2-passing State id
       if (this.form.value.state_id != '') {
        if (this.form.value.state_id) {
          var stat = this.stateData.filter((item: any) => {
            return item.state_id == this.form.value.state_id;
          });
          this.form.value.state_id = stat[0]['state_id'];
        }
      } else {
        this.form.value.state_id = null;
      }
       //3-passing District id
       if (this.form.value.district_id != '') {
        if (this.form.value.district_id) {
          var distt = this.districtData.filter((item: any) => {
            return item.district_id == this.form.value.district_id;
          });
          this.form.value.district_id = distt[0]['district_id'];
        }
      } else {
        this.form.value.district_id = null;
      }
      //4-passing Company type id
    
      if (this.form.value.company_type !== null) {
        var countryType = this.compData.filter((item: any) => {
          return item.mstcompanytype == this.form.value.company_type;
        });
        this.form.value.company_type = countryType[0]['mstcompanytype_id'];
      }
      else {
        this.form.value.company_type = null;
      } 
  
    

        this.loading = true;
    if (this.update) {  
      this.companyUpdate();
    } else {
      this.createCompany();
    }
    }
  }

  createCompany() {
    this.apiService.createCompany(this.form.value).subscribe((res: any) => {
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
  companyUpdate(): void {
 
     this.form.value.company_id =  this.custDetails.company_id;
    this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
       this.isSubmitted = false;
      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('cancel')?.click();
      this.alertService.success('L2 Bulk data Updated Successfully');
    } else {
      this.alertService.error('Something went wrong please try again');
    }
  });
  }

  //bulk-load with bulk excel download
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  validateFile(name: String) {
    var ext = name
    if (ext === 'l2_bulkload_template.xlsx') {
        return true;
    }
    else {
        return false;
    }
}
 
  bulUpload() {
      const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (!this.validateFile(files[0].name)) {
       this.alertService.error('Selected file is not supported');
      // this.onNoClick();
      // return false;
  }
    console.log(files);
    for(let i =0; i < files.length; i++){
      formData.append("attachment", files[i], files[i]['name']);
  }
 
  this.masterService.bulkattach(formData).subscribe((res:any)=>{
  console.log(res);
  if(res){
    this.alertService.success('Bulk Data uploaded successfully')
  }
  })
    }
    // onNoClick() {
    //   this.dialogRef.close();
    // }
          
   exportAsXLSX1(){
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
     var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);          
    var wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");  
     XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");        
    XLSX.writeFile(wb, " L2 BULK LOAD REPORT.xlsx");
               
        }
downloadPdf() {
  const pdfUrl = './assets/tamplate/l2_bulkload_template.xlsx';
  const pdfName = 'l2_bulkload_template.xlsx';
  FileSaver.saveAs(pdfUrl, pdfName);
}

}

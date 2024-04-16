import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
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
  contactDetails: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  addressDetails: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      // companyId: [null, Validators.required],
      name: [null],
      company_name: [null, Validators.required],
      company_type: [null, Validators.required],
      contactno1: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactno2: [null, [ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gst: [null] ,
      pan: [null],
      doi: [null, Validators.required],  
      area: [null, Validators.required],
      country_id: [null, Validators.required],
      state_id: [null, Validators.required],
      district_id: [null, Validators.required],
      city:[null],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      usdg_id:[null],
      usdt_id:[null],
      websiteurl:[null],
      cinno:[null],
      address_line2:[null],
      address_line3:[null],

      net_worth: [null],
      financialyear_id: [null],
      annual_turnover: [null]
    
    });

    // const financialsData = {
    //   Financials: [
    //     {
    //       net_worth: [null, Validators.required],
    //       financialyear_id: [null, Validators.required],
    //       annual_turnover: [null, Validators.required]
    //     }
    //   ]
    // };

    this.getCompanyData();
    this.getData();
    this.getCountryData();
    
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
      this.contactDetails = res.result[0].contact[0];
      this.addressDetails = res.result[0].adderss[0];
     
        this.form.patchValue({
          company_name: this.custDetails.company_name,
          company_type: this.custDetails.company_type,
          gst: this.custDetails.gst,
          pan: this.custDetails.pan,
          doi: this.custDetails.doi,
          websiteurl: this.custDetails.websiteurl,
          cinno:this.custDetails.cinno,
          city:this.addressDetails.city,
         
            //address-patch-details
            area: this.addressDetails.area,
          
            address_line1: this.addressDetails.address_line1,
            address_line2: this.addressDetails.address_line2,
            pincode: this.addressDetails.pincode,
          //contact-path data
          name: this.contactDetails.name,
          contactno1: this.contactDetails.contactno1,
          contactno2: this.contactDetails.contactno2,
          email: this.contactDetails.email,
          usdt_id: this.contactDetails.usdt_id,
          usdg_id: this.contactDetails.usdg_id,
        }); 

        this.form.controls['country_id'].setValue(this.addressDetails.country_id);
        this.form.controls['state_id'].setValue(this.addressDetails.state_id);
        this.form.controls['district_id'].setValue(this.addressDetails.district_id);
        setTimeout(() => {
          this.getStateData();
          this.getDistrictData();
        }, 500);
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
  getCountryData() {
    this.apiService.getCountryDataList().subscribe((res:any) => {
      if (res.status === 200) {
        this.countryData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in country data.");
      }
    });
  }
  
  getStateData() {
    let countrydata = this.form.value.country_id;
    let statedata = null;
    this.apiService.getStateData(countrydata, statedata).subscribe((res: any) => {
      if (res.status === 200) {
        this.stateData = res.result;
      } else {
        this.alertService.warning(`Looks like no state available related to the selected country.`);
      }
    });
  }
  
  getDistrictData() {
    this.districtData = [];
    let data = this.form.value.state_id;
    let dist = this.form.value.district_id;
    this.apiService.getDistData(data, dist).subscribe((res:any) => {
      if (res.status === 200) {
        this.districtData = res.result;
      } else {
        this.alertService.warning(`Looks like no district available related to ${this.form.value.state}.`);
      }
    });
  }

  getData() {
    this.apiService.getCompanyData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });

    this.masterService.getUserMaster().subscribe((res:any)=>{
    
    this.design = res.designation;
    this.departMent = res.department;

    
    })

  }
  
  getCompanyData() {
    this.apiService.getCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
      this.limits.push({ key: 'ALL', value: this.companyData.length });
      this.isExcelDownload = true;
    });
 
  }

  selfFun() {
    var inputElement = this.form.value.company_type;
    if (inputElement !== null) {
      if (inputElement === "Self" || inputElement === "4002") {
        document.getElementById('selfModel')?.click();
        // if (modal !== null) {
        //   modal.click();
        // }
      } 
    }
  }

  exportAsXLSX1(){
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
  
      //passing all values
      if (this.form.value.company_name != '') {
        this.form.value.company_name == '';
      } else {
        this.form.value.company_name = null;
      }
     
      if (this.form.value.name != '') {
        this.form.value.name == '';
      } else {
        this.form.value.name = null;
      }
      if (this.form.value.contactno1 != '') {
        this.form.value.contactno1 == '';
      } else {
        this.form.value.contactno1 = null;
      }
      if (this.form.value.contactno2 != '') {
        this.form.value.contactno2 == '';
      } else {
        this.form.value.contactno2 = null;
      }
      if (this.form.value.email != '') {
        this.form.value.email == '';
      } else {
        this.form.value.email = null;
      }
      if (this.form.value.gst != '') {
        this.form.value.gst == '';
      } else {
        this.form.value.gst = null;
      }
      if (this.form.value.pan != '') {
        this.form.value.pan == '';
      } else {
        this.form.value.pan = null;
      }
      if (this.form.value.doi != '') {
        this.form.value.doi == '';
      } else {
        this.form.value.doi = null;
      }
      if (this.form.value.area != '') {
        this.form.value.area == '';
      } else {
        this.form.value.area = null;
      }
      if (this.form.value.pincode != '') {
        this.form.value.pincode == '';
      } else {
        this.form.value.pincode = null;
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
        if (res.status == 200) {
          this.ngOnInit();
          document.getElementById('closed')?.click();
          this.alertService.success(res.message);
        } else if(res.status == 201) {
          this.alertService.error(res.message);
        }else{
          this.alertService.error('Error, Something went wrong please check');
        }
      })
  }
  companyUpdate(): void {
   
     this.form.value.company_id =  this.custDetails.company_id;
     this.form.value.contact_id =  this.contactDetails.contact_id;
     this.form.value.address_id =  this.addressDetails.address_id;
    this.apiService.companyUpdation(this.form.value).subscribe((res: any) => {
       this.isSubmitted = false;
       if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('closed')?.click();
        this.alertService.success(res.message);
      } else if(res.status == 201) {
        this.alertService.error(res.message);
      }else{
        this.alertService.error('Error, Something went wrong please check');
      }
  });
  }

}

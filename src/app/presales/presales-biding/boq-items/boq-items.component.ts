import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-boq-items',
  templateUrl: './boq-items.component.html',
  styleUrls: ['./boq-items.component.css']
})
export class BoqItemsComponent {
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
  contDetails: any;
  isExcelDownload: boolean = false;
  isExcelDownloadData:boolean = true;
  filesToUpload: Array<File> = [];
  inserteddata: any;
  discardeddata: any;
  contactData: any;
  addressDetails: any;
  countryName:any;
  

  supgrpmemb: any;
  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};
  addmember: any;

  @ViewChild('multiSelect') multiSelect: any;
  dataDropdownList: any;
  rmove: any;
  arr: any;
  dataList: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
    this.form = this.formBuilder.group({
      childItem: this.formBuilder.array([]),
   
    });

    this.getCompanyData();
    this.getCompanyType();
    this.addAnotherRow();
    this.getDropdownList();
    this.getDataList();
    

  }

  boqChildItem() : FormArray {  
    return this.form.get("childItem") as FormArray  
  }

  childItemsArray(): FormGroup {  
    return this.formBuilder.group({  
      itemCode: [null, Validators.required],
      type: [null, Validators.required],
      quantity: [null, Validators.required],
      isChild: [null, Validators.required],
      childItem: [null, Validators.required],
    })  
  } 

  addAnotherRow() { 
      this.boqChildItem().push(this.childItemsArray());  
  } 

  removeRow(i:number, type: string) { 
      this.boqChildItem().removeAt(i);
  }

  createForm(){
    console.clear();
    this.button = 'Create';
    this.update = false;
    this.form.reset();
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.arr);
   
    var a = this.arr
    var b =this.selectedItems
    
    var c = a.filter(function(objFromA:any) {
      return !b.find(function(objFromB:any) {
        return objFromA.ussg_id === objFromB.ussg_id
      })
    })
    this.arr=c;
  }

  onSelectAll(items: any) {
    console.log(items);
  
  }
  rmovemember(data:any)
  {
    console.log(data);
    //intergrate api here of delete member
    
  }
  onItemDeSelect(item: any) {
    console.log(item);
    this.rmovemember(item)
    this.rmove=item;
    console.log(this.rmove);
    this.arr.push(this.rmove);    
    console.log(this.arr);
   
  }

  getDropdownList() {
    this.dataDropdownList = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemDropdown";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      console.log(res);
      
      this.dataDropdownList = res.itemtype;
    })
  } 

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      this.dataList = res.result;
     
    });
  }

  get f() { return this.form.controls; }
  
  getCompanyType() {
    this.apiService.getourCompanyData().subscribe((res:any) => {
      if (res.status === 200) {
        this.compData = res.companytype;
        console.log(this.compData);
        
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    });
  }
  
  getCompanyData() {
    this.apiService.getourCompanyList().subscribe((res: any) => {
      this.companyData = res.result;
      this.limits.push({ key: 'ALL', value: this.companyData.length });
      this.isExcelDownload = true;
    });
 
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
  const pdfUrl = './assets/tamplate/state_bulkload_template_file.xlsx';
  const pdfName = 'state_bulkload_template_file.xlsx';
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
        this.loading = true;
    if (this.update) {  
      this.companyUpdate();
    } else {
      this.createCompany();
    }
    }
  }

  createCompany() {
   
    this.apiService.ourcreateCompany(this.form.value).subscribe((res: any) => {
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
     this.form.value.bidder_id =  this.custDetails.bidder_id;
     this.form.value.contact_id =  this.contDetails.contact_id;
    this.apiService.ourcompanyUpdation(this.form.value).subscribe((res: any) => {
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

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
  form1!: FormGroup;  
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  result:any;
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
  discardeddata: any;
  contactData: any;
  addressDetails: any;
  countryName:any;
  attachment: any = [];

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
  clientListData: any;
  tenderDetailsData: any;
  tendDetails: any;
  bankData: any;
  tenderData: any;
  tenderType: any;
  docType: any;
  docListData: any;
  refData: any;
  rowData: any;
  filterTenderDetailsData: any[] = [];
  listOfFiles: any[] = [];
  boqData: any;
  comData: any;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

 ngOnInit(){
  this.apiService.getCompanyList().subscribe((res: any) => {  
    this.comData = res.result;
    console.log(this.comData);
    
  });

    this.form = this.formBuilder.group({
       childItem: this.formBuilder.array([]),
   
    });
    this.form1 = this.formBuilder.group({
      tender_id:['', Validators.required],
      utility_id:['', Validators.required],
      attachment:['', Validators.required]
    });

   
   
  
    this.addAnotherRow();
    // this.getDropdownList();
    this.getDataList();
    this.getBoqListData();
  }


  rowListData(row:any) {
    this.rowData = [];
    this.rowData = row;
    console.log(this.rowData);
    
  }
  
  getDetails(event: any) {
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    this.clientListData = company_id;
    this.apiService.getTenderLisById(this.clientListData).subscribe((res: any) => {
      this.tenderDetailsData = res.result;
      console.log(this.tenderDetailsData);
    });
  }

  getrefData(tender_id: any){
    this.filterTenderDetailsData = this.tenderDetailsData.filter((x:any) => x.tender_id == tender_id);
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
    this.rmovemember(item)
    this.rmove=item;
    this.arr.push(this.rmove);    
   
  }

  // getDropdownList() {
  //   this.dataDropdownList = [];
  //   this.isNotFound = false;
  //   let apiLink = "/item/api/v1/getItemDropdown";
  //   this.apiService.getData(apiLink).subscribe((res:any) => {
  //     console.log(res);
      
  //     this.dataDropdownList = res.itemtype;
  //   })
  // }
  
  getBoqListData(){
    this.apiService.BOQList().subscribe((res: any) => { 
      if (res.status === 200) {
        this.boqData = res.result;
        console.log(this.boqData);
        
      } else {
        this.alertService.warning("Looks like no data available in type.");
      } 
    });
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
  get fb() { return this.form1.controls; }
  

  onFileChanged(event: any) {
    
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
    console.log(this.attachment);
    // this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index: any) {
    
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);

  }

   //bulk-load with bulk excel download
   fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  validateFile(name: String) {
    var ext = name
    if (ext === 'Data_File.xlsx') {
        return true;
    }
    else {
        return false;
    }
}
 
  // bulUpload() {
  //       const formData: FormData = new FormData();
  //       for (let i = 0; i < this.attachment.length; i++) {
  //         formData.append('attachment', this.attachment[i]);
  //       }
  //       formData.append('utility_id', this.form1.value.utility_id);
  //       formData.append('tender_id', this.form1.value.tender_id);
  //       this.addBOQ(formData);

  //     this.masterService.bulkattach(formData).subscribe((res:any)=>{
      
  //     if(res){
  //       this.alertService.success('Bulk Data uploaded successfully')
  //     }
  //     })
  //   }

  
  exportAsXLSX1(){
    var ws2 = XLSX.utils.json_to_sheet(this.inserteddata);
     var ws1 = XLSX.utils.json_to_sheet(this.discardeddata);          
    var wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws1, "Discarded Data");  
     XLSX.utils.book_append_sheet(wb, ws2, "Inserted Data");        
    XLSX.writeFile(wb, "Data_File.xlsx");
               
        }
downloadPdf() {
  const pdfUrl = './assets/tamplate/BOQ_sample_template.xlsx';
  const pdfName = 'BOQ_sample_template.xlsx';
  FileSaver.saveAs(pdfUrl, pdfName);
}

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), {
      display: false,
      raw: true,
    });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }

//create form submit
  onSubmit() {
    if (this.form.valid) {
        this.isSubmitted = true;
        this.loading = true;
  
    }
  }



  // BOQ item bulk data 
  onBOQSubmit() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    // console.log(this.form1.value);
    // const formData: FormData = new FormData();
    // for (let i = 0; i < this.attachment.length; i++) {
    //   formData.append('attachment', this.attachment[i]);
    // }
    formData.append('utility_id', this.form1.value.utility_id);
    formData.append('tender_id', this.form1.value.tender_id);
   
    this.addBOQ(formData);
}

addBOQ(formData: FormData) {
    console.log(formData);
    
    this.apiService.BOQbulkData(formData).subscribe((res: any) => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
            this.form1.reset();
            this.alertService.success(response.message);
        } else {
            this.alertService.warning(response.message);
        }
    });
}

  updateBOQ(formData: FormData){}
}

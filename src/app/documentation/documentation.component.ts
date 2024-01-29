import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  // meterPort = environment.meterPort;
  meterData:any=[];
  isNotFound:boolean = false;
  isData:boolean = false;
  isDataList:boolean = false;
  isPulling:boolean = false;
  meterDetailData:any;
  meterDataList:any;
  meterIndexData: any;
  tableHeight: any;
  filterNumber: any;
  filterData: any;
  titleData: any;
  filterType: any = 'PC';
  singleMeterData: any;
  dateForFilter: any;
  searchText:any;
  documentForm!: FormGroup;
  fileList: File[] = [];
  resumeFile: any;
  listOfFiles: any[] = [];
  results: any;
  attachment: any;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    ) {
   
  }

 ngOnInit(){
  this.documentForm = this.fb.group({
    docName: ['', Validators.required],
    docDate: ['', Validators.required],
    docType: ['', Validators.required],
    descName: ['', Validators.required],
    // Add other fields as needed
  });
}

  onSubmit() {
    // Handle form submission
    console.log(this.documentForm.value);
    const formData: any = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
  formData.append("docName",this.form.value.docName);
  formData.append("docDate",this.form.value.docDate);
  formData.append("docType",this.form.value.docType);
  formData.append("descName",this.form.value.descName);

  }

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the table height when the window is resized
    this.tableHeight = `${window.innerHeight * 0.65}px`;
  }

  get f() { return this.form.controls; }
}

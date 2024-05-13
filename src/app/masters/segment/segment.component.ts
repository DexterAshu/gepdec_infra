import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  segmentData: any;
  isNotFound:boolean = false;
  searchText:any;
  isSubmitted:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
    });

    this.getSegmentData();
  }

  get f() { return this.form.controls; }

  getSegmentData() {
    this.isNotFound = true;
    this.masterService.getSegmentData().subscribe((res:any) => {
      this.isNotFound = false;
      this.segmentData = [];
      if (res.status === true) {
        // this.segmentData = res.data.filter((data:any) => data.active == 'Y');
        this.segmentData = res.data;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.segmentData = [];
      this.isNotFound = false;
      this.alertService.error("Error: Unknown Error!")
    }); 
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        code: this.form.value.code.toUpperCase(),
        name: this.form.value.name,
      };
      // let apiLink = '/master/segmentMaster/createSegment';
      // this.apiService.postData(apiLink, params).subscribe(res => {
      //   let response: any = res;
      //   document.getElementById('cancel')?.click();
      //   this.isSubmitted = false;
      //   if (response.status == true) {
      //     this.getSegmentData();
      //     this.form.reset();
      //     this.alertService.success(response.message);
      //   } else {
      //     this.alertService.warning(response.message);
      //   }
      // }, (error) => {
      //     this.isSubmitted = false;
      //     document.getElementById('cancel')?.click();
      //     this.alertService.error("Error: Unknown Error!");
      //   })
    } else { 
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

}

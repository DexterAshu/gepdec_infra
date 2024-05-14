import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-title-master',
  templateUrl: './title-master.component.html',
  styleUrls: ['./title-master.component.css']
})
export class TitleMasterComponent {
  form!: FormGroup;
  p: number = 1;
  searchText: any;
  limit = environment.pageLimit;
  isNotFound: boolean = false;
  countryData: any;
  isSubmitted: boolean = false;

  designCount: any;
  designData: any = [];
  titleCount: any;
  titlData: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],

    });

    this.titleData();

  }

  get f() { return this.form.controls; }

  titleData() {
    this.titlData = [];
    this.isNotFound = false;
    this.masterService.getUserMaster().subscribe((res: any) => {
      if (res.status == 200) {
        this.titleCount = res;
        this.titlData = res.title;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.titlData = undefined;
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.designData = undefined;
      this.alertService.error("Error: Unknown Error!")
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;

      // if (this.form.value.country_id !== null) {
      //   var countryVal = this.countryData.filter((item: any) => {
      //     return item.country_id == this.form.value.country_id;
      //   });
      //   this.form.value.country_id = countryVal[0]['country_id'];
      // }
      // else {
      //   this.form.value.country_id = null;
      // } 

      let params = {
        title: this.form.value.title,
      };
      this.apiService.createMasterTitle(params).subscribe((res: any) => {

        let response: any = res;
        document.getElementById('cancel')?.click();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.titleData();
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error: any) => {
        document.getElementById('cancel')?.click();
        this.alertService.error("Error: Unknown Error!");
      })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }
}

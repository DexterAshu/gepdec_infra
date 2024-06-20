import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proposal-one',
  templateUrl: './proposal-one.component.html',
  styleUrls: ['./proposal-one.component.css']
})
export class ProposalOneComponent {

  private destroy$ = new Subject<void>();
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  isNotFound: boolean = false;
  dataList: any;
  rowData: any;
  boqList: any;
  vendorDetails: any;
  attachment: any = [];
  listOfFiles: any = [];
  vendorPriceDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getDataList();

    this.form = this.formBuilder.group({
      attachment: ['', Validators.required]
    })
  }

  get f() { return this.form.controls; }

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    const apiLink = `/precurement/api/v1/getProposal1`;
    this.apiService.getData(apiLink).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.isNotFound = false;
          this.dataList = res.result;
        } else {
          this.isNotFound = true;
          this.dataList = undefined;
          this.alertService.warning("Looks like no data available!");
        }
      }, error: (error: any) => {
        this.isNotFound = true;
        this.dataList = undefined;
        this.alertService.error(error.error.message);
      }
    });
  }

  getBOQList(data: any) {
    this.rowData = [];
    this.boqList = data;
  }

  rowLocation(rowData: any): void {
    this.masterService.openModal(rowData?.tender_id);
  }

  getBoqItemsList(item: any) {
    this.vendorDetails = item;
    this.rowData = item.itemData?.map((mainItem: any) => ({
      ...mainItem,
      isVendorSelected: false,
      isChecked: false,
      childItemList: mainItem.childItems ? mainItem.childItems.map((childItem: any) => ({
        ...childItem,
        isVendorSelected: false,
        isChecked: false
      })) : []
    })) || [];
  }

  onFileChanged(event: any) {
    this.listOfFiles = [];
    this.attachment = [];
    const fileList = event.target.files;
    for (let file of fileList) {
      this.listOfFiles.push(file.name);
      this.attachment.push(file);
    }
  }

  vendorList(item: any) {
    console.log(item);
    this.vendorPriceDetails = item;
  }

  onCheckboxChange(data: any) {
    console.log(data);
  }

  onExcelSubmit() {
    let formData = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    this.apiService.vendorProposalOne(formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.alertService.success(res.message);
          this.getDataList();
          document.getElementById('cancelexcelmodal')?.click();
        }
      }, error: (error: any) => {
        console.log(error.error.message);
        this.alertService.error(error.error.message);
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let data = {
        // basePrice: this.form.value.basePrice,
        // gst: this.form.value.gst,
        // freightRate: this.form.value.freightRate,
        // packingCharges: this.form.value.packingCharges,
        // otherCharges: this.form.value.otherCharges,
      }

      // let apiLink = '/Item/api/v1/addItem';
      let apiLink = '';
      this.apiService.postData(apiLink, data).subscribe(res => {
        let response: any = res;
        document.getElementById('cancel')?.click();
        this.getDataList();
        this.isSubmitted = false;
        if (response.status == 200) {
          this.form.reset();
          this.alertService.success(response.message);
        } else {
          this.alertService.warning(response.message);
        }
      }, (error) => {
        this.isSubmitted = false;
        document.getElementById('cancel')?.click();
        // this.alertService.error("Error: Unknown Error!");
      })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

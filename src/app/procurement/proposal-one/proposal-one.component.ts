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
      childItems: mainItem.childItems ? mainItem.childItems.map((childItem: any) => ({
        ...childItem,
        isVendorSelected: false,
        isChecked: false
      })) : []
    })) || [];
  }

  onFileChanged(event: any) {
    this.attachment = [];
    const fileList = event.target.files;
    for (let file of fileList) {
      this.attachment.push(file);
    }
  }

  vendorList(item: any) {
    console.log(item);
    this.vendorPriceDetails = item;
  }

  onCheckboxChange(event: any, mainItem: any, childItem?: any) {
    if (childItem) {
      childItem.isChecked = !childItem.isChecked;

      if (childItem.isChecked) {
        mainItem.isChecked = true;
      } else {
        const allChildItemsUnchecked = mainItem.childItems.every((item: any) => !item.isChecked);
        if (allChildItemsUnchecked) {
          mainItem.isChecked = false;
        }
      }
    } else {
      mainItem.isChecked = !mainItem.isChecked;

      if (!mainItem.isChecked && mainItem.childItems) {
        mainItem.childItems.forEach((item: any) => item.isChecked = false);
      }
    }
  }

  onVendorCheckboxChange(vendor: any) {
    vendor.isVendorSelected = !vendor.isVendorSelected;
  }

  submitVendorSelection() {
    this.vendorPriceDetails.selected_vendors.forEach((vendor: any) => {
      if (vendor.isVendorSelected) {
        this.vendorPriceDetails.isChecked = true;
      }
    });
    console.log(this.vendorPriceDetails);
  }

  onExcelSubmit() {
    const formData: any = new FormData();
    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    this.apiService.vendorProposalOne(formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.alertService.success(res.message);
          this.getDataList();
          document.getElementById('cancelexcelmodal')?.click();
        } else {
          this.alertService.error(res.message);
        }
      }, error: (error: any) => {
        console.log(error.error.message);
        this.alertService.error(error.error.message);
      }
    })
  }

  sendSelectedItems() {
    const selectedItems = this.rowData.filter((item: any) => item.isChecked).map((item: any) => ({
      ...item,
      selected_vendors: item.selected_vendors.filter((vendor: any) => vendor.isVendorSelected),
      childItems: item.childItems ? item.childItems.filter((childItem: any) => childItem.isChecked).map((childItem: any) => ({
        ...childItem,
        selected_vendors: childItem.selected_vendors.filter((vendor: any) => vendor.isVendorSelected)
      })) : []
    }));

    console.log(selectedItems);
    if (selectedItems.length == 0) {
      this.alertService.error("Please select items!");
    }

    const itemsWithoutVendors = selectedItems.filter((item: any) => {
      if (item.selected_vendors.length === 0) {
        return true;
      }
      const childItemsWithoutVendors = item.childItems.some((childItem: any) => childItem.selected_vendors.length === 0);
      return childItemsWithoutVendors;
    }).map((item: any) => item.description);

    if (itemsWithoutVendors.length > 0) {
      this.alertService.error(`Vendors not selected for items: ${itemsWithoutVendors.join(', ')}`);
      return;
    }

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

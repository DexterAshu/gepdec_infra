import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boq',
  templateUrl: './boq.component.html',
  styleUrls: ['./boq.component.css']
})
export class BoqComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  isSubmitted: boolean = false;
  isNotFound: boolean = false;
  isDropDownDisabled: boolean = false;
  dataList: any;
  vendorDetails: any = [];
  rowData: any;
  vendorList: any = [];
  selectedVendors: any = [];
  boqList: any;

  constructor(
    private alertService: AlertService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  getDataList() {
    this.dataList = [];
    this.isNotFound = false;
    const apiLink = `/boq/api/v1/getBoqList`;
    this.apiService.getData(apiLink).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.isNotFound = false;
          this.dataList = res.result;
        } else {
          this.dataList = undefined;
          this.isNotFound = true;
          this.alertService.warning(res.message);
        }
      }, error: (error: any) => {
        console.error(error);
        this.isNotFound = true;
        this.alertService.error("Error: Unknown Error!")
      }
    }
    );
  }

  getBOQList(data: any) {
    this.rowData = [];
    this.boqList = data;
  }

  getBoqItemsList(item: any) {
    this.vendorDetails = item;
    this.rowData = item.items?.map((mainItem: any) => ({
      ...mainItem,
      isVendorSelected: false,
      isChecked: false,
      childItemList: mainItem.childItemList ? mainItem.childItemList.map((childItem: any) => ({
        ...childItem,
        isVendorSelected: false,
        isChecked: false
      })) : []
    })) || [];
    this.initializeVendorLists(this.rowData);
  }

  initializeVendorLists(items: any[]) {
    items.forEach(item => {
      this.getVendorList(item.item_id);
      if (item.childItemList) {
        this.initializeVendorLists(item.childItemList);
      }
    });
  }

  getVendorList(item_id: any) {
    this.apiService.getVendorListByItem(item_id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.vendorList[item_id] = res.result;
        } else {
          this.vendorList[item_id] = undefined;
        }
      }, error: (error: any) => {
        console.error(error);
        this.vendorList[item_id] = [];
        this.alertService.error("Error: Unknown Error!")
      }
    }
    );
  }

  onVendorSelect(item: any, event: any) {
    item.selectedVendor = event;
    item.isVendorSelected = event && event.length > 0;
  }

  onCheckboxChange(item: any, event: any) {
    item.isChecked = event.target.checked;
  }

  sendSelectedItems() {
    const selectedItems: any = this.rowData.reduce((acc: any, item: any) => {
      if (item.isChecked) {
        const selectedItem: any = {
          item_id: item.item_id,
          boq_id: item.boq_id,
          selected_vendors: item.selectedVendor.map((vendor: any) => ({ supplier_id: vendor.supplier_id }))
        };

        if (item.childItemList && item.childItemList.length > 0) {
          selectedItem['childItems'] = item.childItemList.reduce((childAcc: any, childItem: any) => {
            if (childItem.isChecked) {
              childAcc.push({
                boq_id: childItem.boq_id,
                item_id: childItem.item_id,
                selected_vendors: childItem.selectedVendor.map((vendor: any) => ({ supplier_id: vendor.supplier_id }))
              });
            }
            return childAcc;
          }, []);
        }

        acc.push(selectedItem);
      }
      return acc;
    }, []);
    console.log(selectedItems);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

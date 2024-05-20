import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-receipt',
  templateUrl: './material-receipt.component.html',
  styleUrls: ['./material-receipt.component.css']
})
export class MaterialReceiptComponent {
  date = new Date();
  fromDate: any;
  toDate: any;
  grnDateLimit: any = new Date();
  currentDate: any;
  searchText: any;
  poData: any = [];
  venderPOData: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound: boolean = false;
  update: boolean = false;
  isSubmitted: boolean = false;
  selectedPO: any = {};
  grnForm!: FormGroup;
  vendorDataList: any = [];
  tenderList: any = [];
  boqList: any = [];

  constructor(private fb: FormBuilder, private alertService: AlertService, private apiService: ApiService, private sharedService: SharedService, private elementRef: ElementRef) {
    var date = this.date.getDate();
    var month = 1 + this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate = year + "-" + (month <= 9 ? '0' : '') + month + "-" + '01';
    this.toDate = year + "-" + (month <= 9 ? '0' : '') + month + "-" + (date <= 9 ? '0' : '') + date;
    this.currentDate = year + "-" + (month <= 9 ? '0' : '') + month + "-" + (date <= 9 ? '0' : '') + date;
    this.grnDateLimit.setDate(this.grnDateLimit.getDate() - 5);
    this.grnDateLimit = year + "-" + (month <= 9 ? '0' : '') + month + "-" + (this.grnDateLimit.getDate() <= 9 ? '0' : '') + this.grnDateLimit.getDate();
    console.log(this.fromDate, this.toDate, this.grnDateLimit);
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
  }

  ngAfterViewInit() {
    this.sharedService.initializeTooltips(this.elementRef);
  }

  getGRNData(): void {
    this.getTenderList();
  }

  initForm(): void {
    this.grnForm = this.fb.group({
      tender_id: [null, Validators.required],
      boq_id: [null],
      supplier_id: [null, Validators.required],
      po_id: [null, Validators.required],
      challan_number: [null, Validators.required],
      grn_number: [null, Validators.required],
      grn_date: [null, Validators.required],
      received_qty: [null, Validators.required],
      remark: [null, Validators.required],
      remarks: [null],
      tax_invoice: [false],
      delivery_challan: [false],
      lr_copy: [false],
      packing_list: [false],
      eway_bill: [false],
      warranty_certificate: [false],
      qualityinspection_report: [false],
      operator_manual: [false],
      technicalsupport_manual: [false],
      items: this.fb.array([])
    });
  }

  get grn() { return this.grnForm.controls; }

  selectPO(data: any): void {
    this.selectedPO = data;
  }

  selectItem(data: any): void {
    let dataLength = this.grnForm.value.items.filter((x: any) => x.item_id === data.item_id);
    if (dataLength.length === 1) {
      this.grnForm.value.items = this.grnForm.value.items.filter((x: any) => x.item_id !== data.item_id);
    } else {
      let match = {
        "item_id": data.item_id,
        "unit_id": data.unit_id,
        "warehouselocation_id": data.warehouselocation_id,
        "po_qty": data.qty,
        "pobalance_qty": data.pobalance_qty ?? data.qty - data.received_qty,
        "received_qty": data.received_qty,
        "remain_qty": data.qty - data.received_qty,
        "podetail_id": data.podetail_id
      }
      this.grnForm.value.items.push(match);
    }
    delete this.grnForm.value.received_qty;
    delete this.grnForm.value.remark;
  }

  grnSubmit(): void {
    this.isSubmitted = true;
    console.log(this.grnForm.value);
    if (this.grnForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    this.apiService.createGRN(this.grnForm.value).subscribe((res: any) => {
      if (res.status === 200) {
        this.getGRNData();
        this.alertService.success(res.message);
        this.grnForm.reset();
      } else {
        this.alertService.warning(res.message);
      }
    }),
      (error: any) => {
      console.error(error);
      this.alertService.error("Error: Unknown Error!");
    }
    this.isSubmitted = false;
  }

  getTenderList(): void {
    this.apiService.getTenderList().subscribe((res: any) => {
      if (res.status === 200) {
        this.tenderList = res.result;
      } else {
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.alertService.error("Error: Unknown Error!")
      });
  }

  getVenderData(): void {
    let tender_id = this.grnForm.value.tender_id;
    const apiLink = `/precurement/api/v1/getVendorListByTender/${tender_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.vendorDataList = res.result;
      } else {
        this.vendorDataList = [];
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.vendorDataList = [];
        this.alertService.error("Error: Unknown Error!")
      });
  }

  getVenderPOData(): void {
    let tender_id = this.grnForm.value.tender_id;
    let supplier_id = this.grnForm.value.supplier_id;
    const apiLink = `/precurement/api/v1/getPoListBySupplier/${tender_id}/${supplier_id}`
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.venderPOData = res.result;
      } else {
        this.venderPOData = [];
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.venderPOData = [];
        this.alertService.error("Error: Unknown Error!")
      });
  }

  getPOData(): void {
    const apiLink = `/precurement/api/v1/getPoList?po_id=${this.grnForm.value.po_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.selectedPO = res.result[0];
        this.ngAfterViewInit();
      } else {
        this.selectedPO = [];
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.selectedPO = [];
        this.alertService.error("Error: Unknown Error!")
      });
  }

  getPODetails(po_id: any): void {
    const apiLink = `/precurement/api/v1/getPoList?po_id=${po_id}`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.selectedPO = res.result[0];
      } else {
        this.selectedPO = [];
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.selectedPO = [];
        this.alertService.error("Error: Unknown Error!")
      });
  }

  getData(): void {
    this.poData = [];
    this.isNotFound = false;
    const apiLink = `/inventory/api/v1/getGRNList`;
    this.apiService.getData(apiLink).subscribe((res: any) => {
      if (res.status === 200) {
        this.poData = res.result;
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
        this.poData = undefined;
        this.alertService.warning("Looks like no data available.");
      }
    },
      (error: any) => {
        this.isNotFound = true;
        this.poData = undefined;
        this.alertService.error("Error: Unknown Error!")
      });
  }
}

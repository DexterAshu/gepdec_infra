import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
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
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  selectedPO: any = {};
  // form!: FormGroup;
  grnForm!: FormGroup;
  received_qty: any = 0;
  vendorDataList: any = [];
  tenderList: any = [];
  boqList: any = [];

  constructor( private fb: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.grnDateLimit.setDate(this.grnDateLimit.getDate() - 5);
    this.grnDateLimit =  year+"-"+(month<=9?'0':'')+month+"-"+(this.grnDateLimit.getDate()<=9?'0':'')+this.grnDateLimit.getDate();
    console.log(this.fromDate, this.toDate, this.grnDateLimit);
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
  }

  getGRNData(): void {
    this.getDataList();
  }

  initForm(): void {
    // this.form = this.fb.group({
    //   grn_number: [null, Validators.required],
    //   date: [null, Validators.required],
    //   grn_remark: [null, Validators.required],
    //   items: this.fb.array([])
    // });
    this.grnForm = this.fb.group({
      tender_id: [null, Validators.required],
      boq_id: [null, Validators.required],
      supplier_id: [null, Validators.required],
      purchaseOrder: [null, Validators.required],
      purchaseOrderDate: [null],
      shipmentNumber: [null, Validators.required],
      grn_number: [null, Validators.required],
      grn_date: [null, Validators.required],
      grn_remark: [null, Validators.required],
      received_qty: [null],
      docs_tax_invoice: [false],
      docs_delivery_challan: [false],
      docs_lr_copy: [false],
      docs_packing_list: [false],
      docs_e_way_bill: [false],
      docs_warranty_certificate: [false],
      docs_quality_inspection: [false],
      docs_operator_manual: [false],
      docs_technical_manual: [false]
    });
    this.getTenderList();
  }

  get grn() { return this.grnForm.controls; }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.grnForm.invalid) {
      return;
    }
    console.log(this.grnForm.value);
    this.grnForm.reset();
    this.isSubmitted = false;
  }

  selectPO(data: any): void {
    this.selectedPO = data;
  }

  grnSubmit(): void {
    console.log(this.grnForm.value);
  }

  getDataList() {
    this.vendorDataList = [];
    let apiLink = "/supplier/api/v1/getSupplierList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.vendorDataList = res.result;
      } else {
        this.vendorDataList = [];
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.vendorDataList = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getTenderList(): void {
    this.apiService.getTenderList().subscribe((res:any) => {
      if (res.status === 200) {
        this.tenderList = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.alertService.error("Error: " + error.statusText)
    });
  }

  // getVendorListByTender
  getVenderData(): void {
    this.apiService.getVendorListByTender(this.grnForm.value.tender_id).subscribe((res:any) => {
      if (res.status === 200) {
        this.vendorDataList = res.result;
      } else {
        this.vendorDataList = [];
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.vendorDataList = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getVenderPOData(): void {
    this.apiService.getPoListBySupplier(this.grnForm.value.tender_id, this.grnForm.value.supplier_id).subscribe((res:any) => {
      if (res.status === 200) {
        this.venderPOData = res.result;
      } else {
        this.venderPOData = [];
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.venderPOData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getPOData(): void {
    this.apiService.getPODetail(this.grnForm.value.purchaseOrder).subscribe((res:any) => {
      if (res.status === 200) {
        console.log(res);
      } else {
        this.poData = [];
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.poData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }

  getData(): void {
    this.poData = [
      {
        "projectID": "PR0001",
        "order_number": "PO001",
        "date": "2024-03-11",
        "vendor": {
          "vendor_id": "V001",
          "name": "Vendor X",
          "address": "123 Main Street, Cityville, USA",
          "contact": "John Smith"
        },
        "items": [
          {
            "item_id": "I001",
            "itemName": "Product A",
            "quantity": 50,
            "uom": "NOS",
            "unit_price": 10.75,
            "total_price": 537.50
          },
          {
            "item_id": "I002",
            "itemName": "Product B",
            "quantity": 25,
            "uom": "NOS",
            "unit_price": 20.50,
            "total_price": 512.50
          }
        ],
        "total_amount": 1050.00,
        "remarks": "Payment due upon receipt."
      },
      {
        "projectID": "PR0002",
        "order_number": "PO002",
        "date": "2024-03-12",
        "vendor": {
          "vendor_id": "V002",
          "name": "Vendor Y",
          "address": "456 Elm Street, Townsville, USA",
          "contact": "Jane Doe"
        },
        "items": [
          {
            "item_id": "I003",
            "itemName": "Product C",
            "quantity": 100,
            "uom": "NOS",
            "unit_price": 5.25,
            "total_price": 525.00
          }
        ],
        "total_amount": 525.00,
        "remarks": "Payment due in 15 days."
      },
      {
        "projectID": "PR0003",
        "order_number": "PO003",
        "date": "2024-03-13",
        "vendor": {
          "vendor_id": "V003",
          "name": "Vendor Z",
          "address": "789 Oak Avenue, Villagetown, USA",
          "contact": "Michael Johnson"
        },
        "items": [
          {
            "item_id": "I004",
            "itemName": "Product D",
            "quantity": 75,
            "uom": "NOS",
            "unit_price": 15.00,
            "total_price": 1125.00
          }
        ],
        "total_amount": 1125.00,
        "remarks": "Net 30 terms."
      },
      {
        "projectID": "PR0001",
        "order_number": "PO004",
        "date": "2024-03-14",
        "vendor": {
          "vendor_id": "V004",
          "name": "Vendor W",
          "address": "321 Pine Street, Hamletville, USA",
          "contact": "Sarah Johnson"
        },
        "items": [
          {
            "item_id": "I005",
            "itemName": "Product E",
            "quantity": 200,
            "uom": "NOS",
            "unit_price": 8.50,
            "total_price": 1700.00
          }
        ],
        "total_amount": 1700.00,
        "remarks": "Payment due upon delivery."
      },
      {
        "projectID": "PR0002",
        "order_number": "PO005",
        "date": "2024-03-15",
        "vendor": {
          "vendor_id": "V005",
          "name": "Vendor Q",
          "address": "987 Maple Street, Riverside, USA",
          "contact": "Emily Smith"
        },
        "items": [
          {
            "item_id": "I006",
            "itemName": "Product F",
            "quantity": 150,
            "uom": "NOS",
            "unit_price": 12.75,
            "total_price": 1912.50
          }
        ],
        "total_amount": 1912.50,
        "remarks": "Payment due in 30 days."
      }
    ]
  }
}

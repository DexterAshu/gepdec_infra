import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grnnote',
  templateUrl: './grnnote.component.html',
  styleUrls: ['./grnnote.component.css']
})
export class GRNNoteComponent {
  date = new Date();
  fromDate: any;
  toDate: any;
  currentDate: any;
  searchText: any;
  poData: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  selectedPO: any = {};
  // form!: FormGroup;
  grnForm!: FormGroup;
  delivery_qty: any = 0;
  received_qty: any = 0;
  vendorDataList: any = [];

  constructor( private fb: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
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
      supplier_id: [null, Validators.required],
      purchaseOrder: [null, Validators.required],
      purchaseOrderDate: [null],
      shipmentNumber: [null, Validators.required],
      grn_number: [null, Validators.required],
      grn_date: [null, Validators.required],
      grn_remark: [null, Validators.required],
      delivery_qty: [null],
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

  getVenderPOData(): void {
    console.log(this.grnForm.value.venderName);
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

  getData(): void {
    this.poData = [
      {
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
      },
      {
        "order_number": "PO006",
        "date": "2024-03-16",
        "vendor": {
          "vendor_id": "V006",
          "name": "Vendor P",
          "address": "654 Cedar Street, Hillside, USA",
          "contact": "David Brown"
        },
        "items": [
          {
            "item_id": "I007",
            "itemName": "Product G",
            "quantity": 80,
            "uom": "NOS",
            "unit_price": 18.25,
            "total_price": 1460.00
          }
        ],
        "total_amount": 1460.00,
        "remarks": "Payment due upon receipt of goods."
      },
      {
        "order_number": "PO007",
        "date": "2024-03-17",
        "vendor": {
          "vendor_id": "V007",
          "name": "Vendor R",
          "address": "147 Birch Street, Lakeside, USA",
          "contact": "Jessica Adams"
        },
        "items": [
          {
            "item_id": "I008",
            "itemName": "Product H",
            "quantity": 120,
            "uom": "NOS",
            "unit_price": 6.50,
            "total_price": 780.00
          }
        ],
        "total_amount": 780.00,
        "remarks": "Payment due in 15 days from delivery."
      },
      {
        "order_number": "PO008",
        "date": "2024-03-18",
        "vendor": {
          "vendor_id": "V008",
          "name": "Vendor S",
          "address": "369 Walnut Street, Parkside, USA",
          "contact": "Matthew Wilson"
        },
        "items": [
          {
            "item_id": "I009",
            "itemName": "Product I",
            "quantity": 90,
            "uom": "NOS",
            "unit_price": 14.75,
            "total_price": 1327.50
          }
        ],
        "total_amount": 1327.50,
        "remarks": "Payment due in 20 days."
      },
      {
        "order_number": "PO009",
        "date": "2024-03-19",
        "vendor": {
          "vendor_id": "V009",
          "name": "Vendor T",
          "address": "852 Oak Street, Sunnyville, USA",
          "contact": "Mark Wilson"
        },
        "items": [
          {
            "item_id": "I010",
            "itemName": "Product J",
            "quantity": 60,
            "uom": "NOS",
            "unit_price": 11.25,
            "total_price": 675.00
          }
        ],
        "total_amount": 675.00,
        "remarks": "Payment due upon completion of work."
      },
      {
        "order_number": "PO010",
        "date": "2024-03-20",
        "vendor": {
          "vendor_id": "V010",
          "name": "Vendor U",
          "address": "753 Elm Street, Mountainview, USA",
          "contact": "Laura Martinez"
        },
        "items": [
          {
            "item_id": "I011",
            "itemName": "Product K",
            "quantity": 40,
            "uom": "NOS",
            "unit_price": 22.50,
            "total_price": 900.00
          }
        ],
        "total_amount": 900.00,
        "remarks": "Payment due within 15 days of invoice."
      }
    ]
  }
}

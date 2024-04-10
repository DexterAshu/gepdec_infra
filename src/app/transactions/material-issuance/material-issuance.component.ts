import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-issuance',
  templateUrl: './material-issuance.component.html',
  styleUrls: ['./material-issuance.component.css']
})
export class MaterialIssuanceComponent {
  date = new Date();
  fromDate: any;
  toDate: any;
  currentDate: any;
  searchText: any;
  materialIssuanceData: any = [];
  projects: any = [];
  itemData: any = [];
  warehouses: any = [];
  itemCategories: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  searchForm!: FormGroup;
  form!: FormGroup;
  selectedRow: any;

  constructor( private fb: FormBuilder) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
  }

  ngOnInit(): void {
    this.formInit();
    this.getData();
  }

  formInit(): void {
    this.form = this.fb.group({
      projectCode: [null, Validators.required],
      warehouseCode: [null, Validators.required],
      itemCategory: [null, Validators.required],
      contact_person: [null, Validators.required],
      contact_number: [null, Validators.required],
      isSelected: [null, Validators.required],
      remarks: [null, Validators.required],
      items: this.fb.array([])
    })
    this.searchForm = this.fb.group({
      fromDate: [this.fromDate],
      toDate: [this.toDate]
    });
  }

  get f() { return this.form.controls; }

  searchData(): void {
    console.log(this.searchForm.value);
  }

  getData(): void {
    this.materialIssuanceData = [
      {
        materialIssuanceID: "MI00001",
        projectCode: "PR0001",
        orderNumber: "OR00001",
        orderDate: '2022-01-01',
        contactPersonName: 'ABC',
        contactMobileNo: '1234567890',
        venderDetails: {
          name: 'Vender Name',
          address: 'Vender Address',
          contactNo: '1234567890'
        },
        remarks: 'Material Issuance',
        items: [
          {
            itemCode: 'ABC123',
            itemName: 'Item 1',
            quantity: 10,
            uom: 'KG'
          },
          {
            itemCode: 'XYZ456',
            itemName: 'Item 2',
            quantity: 20,
            uom: 'KG'
          },
          {
            itemCode: 'PQR789',
            itemName: 'Item 3',
            quantity: 30,
            uom: 'KG'
          }
        ]
      },
      {
        materialIssuanceID: "MI00002",
        projectCode: "PR0001",
        orderNumber: "OR00001",
        orderDate: '2022-01-01',
        contactPersonName: 'ABC',
        contactMobileNo: '1234567890',
        venderDetails: {
          name: 'Vender Name',
          address: 'Vender Address',
          contactNo: '1234567890'
        },
        remarks: 'Material Issuance',
        items: [
          {
            itemCode: 'ABC123',
            itemName: 'Item 1',
            quantity: 10,
            uom: 'KG'
          },
          {
            itemCode: 'XYZ456',
            itemName: 'Item 2',
            quantity: 20,
            uom: 'KG'
          },
          {
            itemCode: 'PQR789',
            itemName: 'Item 3',
            quantity: 30,
            uom: 'KG'
          }
        ]
      },
      {
        materialIssuanceID: "MI00003",
        projectCode: "PR0001",
        orderNumber: "OR00001",
        orderDate: '2022-01-01',
        contactPersonName: 'ABC',
        contactMobileNo: '1234567890',
        venderDetails: {
          name: 'Vender Name',
          address: 'Vender Address',
          contactNo: '1234567890'
        },
        remarks: 'Material Issuance',
        items: [
          {
            itemCode: 'ABC123',
            itemName: 'Item 1',
            quantity: 10,
            uom: 'KG'
          },
          {
            itemCode: 'XYZ456',
            itemName: 'Item 2',
            quantity: 20,
            uom: 'KG'
          }
        ]
      }
    ];
  }

  getItems(): void {
    this.itemData = [
      {
        itemCode: 'ABC123',
        itemName: 'Item 1',
        quantity: 10,
        uom: 'KG'
      },
      {
        itemCode: 'XYZ456',
        itemName: 'Item 2',
        quantity: 20,
        uom: 'KG'
      },
      {
        itemCode: 'PQR789',
        itemName: 'Item 3',
        quantity: 30,
        uom: 'KG'
      }
    ];
  }

  selectRow(data: any): void {
    this.selectedRow = data;
    console.log(this.selectedRow);
    this.update = true;
    this.isNotFound = false;
    this.form.patchValue(this.selectedRow);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.form.reset();
    this.isSubmitted = false;
  }

}

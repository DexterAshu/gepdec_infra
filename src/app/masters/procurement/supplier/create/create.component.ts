import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateSupplierComponent {

  form!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  
  ngOnInit() {

    this.form = this.formBuilder.group({
      supplierCode: [null, Validators.required],
      supplierName: [null, Validators.required],
      companyName: [null, Validators.required],
      gstNo: [null, Validators.required],
      gstDate: [null, Validators.required],
      panNo: [null, Validators.required],
      tanNo: [null, Validators.required],
      doi: [null, Validators.required],
      doiDoc: [null, Validators.required],
      category: [null, Validators.required],
      contactNo: [null, Validators.required],
      emailID: [null, Validators.required],
      address: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      pincode: [null, Validators.required],
      bankName: [null, Validators.required],
      holderName: [null, Validators.required],
      accountNo: [null, Validators.required],
      branchName: [null, Validators.required],
      ifscCode: [null, Validators.required],
      accountType: [null, Validators.required],
      bankAddress: [null, Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

  }

}

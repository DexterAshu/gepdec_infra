import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
  form!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      itemCode: [null, Validators.required],
      itemName: [null, Validators.required],
      itemType: [null, Validators.required],
      itemUOM: [null, Validators.required],
      procurementUOM: [null, Validators.required],
      itemProperty: [null, Validators.required],
      itemCategory: [null, Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

  }
}

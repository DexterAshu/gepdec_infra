import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-date-config',
  templateUrl: './bill-date-config.component.html',
  styleUrls: ['./bill-date-config.component.css']
})
export class BillDateConfigComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  meterData: any;
  isNotFound:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}

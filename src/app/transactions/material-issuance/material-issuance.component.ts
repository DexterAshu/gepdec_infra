import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  poData: any = [];
  limit = environment.pageLimit;
  p: number = 1;
  isNotFound:boolean = false;
  update:boolean = false;
  isSubmitted:boolean = false;
  searchForm!: FormGroup;

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
  }

  formInit(): void {
    this.searchForm = this.fb.group({
      fromDate: [this.fromDate],
      toDate: [this.toDate]
    });
  }

  searchData(): void {
    console.log(this.searchForm.value);
  }

}

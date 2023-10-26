import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
    form!: FormGroup;
     
    p: number = 1;
    limit = environment.pageLimit;
    isNotFound:boolean = false;
    
  constructor() { }

  ngOnInit(): void {
  }

}

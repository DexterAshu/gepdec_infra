import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meter-link',
  templateUrl: './meter-link.component.html',
  styleUrls: ['./meter-link.component.css']
})
export class MeterLinkComponent implements OnInit {
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

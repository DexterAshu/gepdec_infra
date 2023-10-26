import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-firmware-upgrade',
  templateUrl: './firmware-upgrade.component.html',
  styleUrls: ['./firmware-upgrade.component.css']
})
export class FirmwareUpgradeComponent implements OnInit {
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

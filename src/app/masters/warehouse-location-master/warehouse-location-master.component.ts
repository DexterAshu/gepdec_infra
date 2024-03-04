import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService, ApiService, MasterService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-warehouse-location-master',
  templateUrl: './warehouse-location-master.component.html',
  styleUrls: ['./warehouse-location-master.component.css']
})
export class WarehouseLocationMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  wareHouseLocationData: any = [];
  isNotFound:boolean = false;
  limits: any;
  isExcelDownload: boolean = false;
  loading: boolean = false;
  selectedWHL: any;

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getData();
  }

  createData() {
    let match = {};
    this.masterService.createWHLocation(match).subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseLocationData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  selectWHL(data: any) {
    this.selectedWHL = data;
  }

  getData() {
    this.masterService.getWHLocationData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseLocationData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { MasterService } from 'src/app/_services/master.service';
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
  companyData: any = [
    { location_Name: "Location 1", location_Code: "L0001", wh_Code: "WH0001" },
    { location_Name: "Location 2", location_Code: "L0002", wh_Code: "WH0001" },
    { location_Name: "Location 3", location_Code: "L0003", wh_Code: "WH0002" },
    { location_Name: "Location 4", location_Code: "L0004", wh_Code: "WH0002" },
    { location_Name: "Location 5", location_Code: "L0005", wh_Code: "WH0003" },
    { location_Name: "Location 6", location_Code: "L0006", wh_Code: "WH0004" },
    { location_Name: "Location 7", location_Code: "L0007", wh_Code: "WH0005" },
    { location_Name: "Location 8", location_Code: "L0008", wh_Code: "WH0006" },
    { location_Name: "Location 9", location_Code: "L0009", wh_Code: "WH0006" },
    { location_Name: "Location 10", location_Code: "L00010", wh_Code: "WH0001" }
  ];
  isNotFound:boolean = false;
  limits: any;
  isExcelDownload: boolean = false;
  loading: boolean = false;
 
  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

}

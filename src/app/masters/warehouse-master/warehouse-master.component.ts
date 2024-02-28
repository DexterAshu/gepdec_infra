import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-warehouse-master',
  templateUrl: './warehouse-master.component.html',
  styleUrls: ['./warehouse-master.component.css']
})
export class WarehouseMasterComponent {
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  wareHouseData: any = [
    { wh_Name: "warehouse", wh_Code: "WH0001", WH_Head: { name: "Person 1", mobileNo: 90000000001, eMail: "person1@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0002", WH_Head: { name: "Person 2", mobileNo: 90000000002, eMail: "person2@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0003", WH_Head: { name: "Person 3", mobileNo: 90000000003, eMail: "person3@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0004", WH_Head: { name: "Person 4", mobileNo: 90000000004, eMail: "person4@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0005", WH_Head: { name: "Person 5", mobileNo: 90000000005, eMail: "person5@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0006", WH_Head: { name: "Person 6", mobileNo: 90000000006, eMail: "person6@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0007", WH_Head: { name: "Person 7", mobileNo: 90000000007, eMail: "person7@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0008", WH_Head: { name: "Person 8", mobileNo: 90000000008, eMail: "person8@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH0009", WH_Head: { name: "Person 9", mobileNo: 90000000009, eMail: "person9@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } },
    { wh_Name: "warehouse", wh_Code: "WH00010", WH_Head: { name: "Person 10", mobileNo: 90000000010, eMail: "person10@mail.com"}, address: { state: "UP", district: "District", country: "India", pinCode: 888888, address1: "Address1", address2: "Address2" } }
  ];
  isNotFound:boolean = false;
  limits: any;
  isExcelDownload: boolean = false;
  loading: boolean = false;
  selectedWH: any;

  constructor( private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService ) { }

  selectWH(data: any) {
    this.selectedWH = data;
  }
}

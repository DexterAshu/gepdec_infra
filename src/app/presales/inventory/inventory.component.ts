import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService, AlertService, ApiService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  searchText: any;
  limit: any = environment.pageLimit;
  p: number = 1;
  isNotFound: boolean = false;
  itemData: any = [];

  constructor(private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.itemData = [];
    this.isNotFound = false;
    let apiLink = "/item/api/v1/getItemList";
    this.apiService.getData(apiLink).subscribe((res:any) => {
      if (res.status === 200) {
        this.isNotFound = false;
        this.itemData = res.result;
      } else {
        this.isNotFound = true;
        this.itemData = [];
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.isNotFound = true;
      this.itemData = [];
      this.alertService.error("Error: " + error.statusText)
    });
  }
}

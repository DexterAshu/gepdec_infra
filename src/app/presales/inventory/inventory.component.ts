import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  wareHouseData: any = [];

  constructor(private formBuilder: FormBuilder, private masterService: MasterService, private alertService: AlertService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.formInit();
    this.getData();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      warehouse_id: ["",Validators.required],
      meterCode: ["",Validators.required],
      type: ["",Validators.required],
    });
  }

  getData(): void {
    this.isNotFound = false;
    let apiLink = "/inventory/api/v1/getInventoryList";
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

  get f() { return this.form.controls; }

  onCreate(): void {
    this.getWarehouseData();
  }

  getWarehouseData() {
    this.masterService.getWarehouseData().subscribe((res:any) => {
      if (res.status === 200) {
        this.wareHouseData = res.result;
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    }),
    (error: any) => {
      this.alertService.warning(`Some technical issue: ${error.message}`);
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}

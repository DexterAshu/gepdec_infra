import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-design-module',
  templateUrl: './design-module.component.html',
  styleUrls: ['./design-module.component.css']
})
export class DesignModuleComponent {
  form!: FormGroup;
  p: number = 1;
  limit = environment.pageLimit;
  tenderBOQData:any=[];
  isNotFound:boolean = false;
  searchText:any;
  selectedRow: any;
  items: any = [
    {
        "item_id": "803",
        "itemcode": "W10001",
        "description": "WOOD",
        "qty": 10
    },
    {
        "item_id": "804",
        "itemcode": "S10001",
        "description": "sand",
        "qty": 12
    },
    {
        "item_id": "807",
        "itemcode": "B10001",
        "description": "bricks",
        "qty": 49
    },
    {
        "item_id": "809",
        "itemcode": "S10002",
        "description": "Sand 20MM",
        "qty": 78
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getTenderList();
    this.formInit();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      warehouse_id: [null,Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onView(data: any): void {
    console.log(data);
    this.selectedRow = data;
  }

  onEdit(data: any): void {
    console.log(data);
    this.selectedRow = data;
  }

  getTenderList(): void {
    this.apiService.getTenderList().subscribe((res:any) => {
      if (res.status === 200) {
        this.tenderBOQData = res.result;
        this.tenderBOQData = this.tenderBOQData.filter((x:any) => x.items = this.items);
      } else {
        this.alertService.warning("Looks like no data available in type.");
      }
    },
    (error: any) => {
      this.alertService.error("Error: " + error.statusText)
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}

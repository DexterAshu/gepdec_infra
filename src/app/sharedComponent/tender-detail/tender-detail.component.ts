import { Component, Input } from '@angular/core';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent {
  @Input() itemList: any;

  constructor(private masterService: MasterService) { }
  
  rowLocation(rowData: any): void {
    this.masterService.openModal(rowData?.tender_id);
  }
}

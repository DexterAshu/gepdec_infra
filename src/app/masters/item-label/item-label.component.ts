import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-label',
  templateUrl: './item-label.component.html',
  styleUrls: ['./item-label.component.css']
})
export class ItemLabelComponent {
  searchText: any;
  itemLocationLabelData: any = [];
  limit: any = environment.pageLimit;
  p: number = 1;
  isNotFound: boolean = false;

}

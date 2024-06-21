import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-location-section-shared',
  templateUrl: './location-section-shared.component.html',
  styleUrls: ['./location-section-shared.component.css']
})
export class LocationSectionSharedComponent {
  // @Input() tenderLocation:any = [];
  @Input() tenderLocation: string = '';
  @Input() rowData: any;
  @Output() locationClick = new EventEmitter<any>();

  handleClick() {
    this.locationClick.emit(this.rowData);
  }
}

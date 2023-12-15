import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.css']
})
export class ResponsiveTableComponent implements OnInit {

  tableHeight: any;
  constructor() { }

  ngOnInit(): void {
    this.tableHeight = `${window.innerHeight * 0.607}px`;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.tableHeight = `${window.innerHeight * 0.607}px`;
  }

}

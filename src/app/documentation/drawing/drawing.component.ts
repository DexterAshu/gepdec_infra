import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent {
  isOpen: boolean = false;
  searchText: any;
  isExcelDownloadData: boolean = true;
  docListData: any = [];
  p: number = 1;
  limit = environment.pageLimit;

  ngOnInit(): void {

  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, 'Data_File.xlsx');
  }
}

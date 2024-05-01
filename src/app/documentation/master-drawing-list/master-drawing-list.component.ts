import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-master-drawing-list',
  templateUrl: './master-drawing-list.component.html',
  styleUrls: ['./master-drawing-list.component.css']
})
export class MasterDrawingListComponent {
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

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  storedData: any;

  constructor( public accountService: AccountService,
    private masterService: MasterService
  ) {
    this.storedData = this.masterService.getLocalStorage();
    console.log(this.storedData);
    
   }

  ngOnInit(): void {
  }

}

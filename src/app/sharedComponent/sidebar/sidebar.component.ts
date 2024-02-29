import { Component, OnInit } from '@angular/core';
import { AccountService, MasterService } from 'src/app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  storedData: any;

  constructor(public accountService: AccountService, private masterService: MasterService) {
    this.storedData = this.masterService.getLocalStorage();
  }

  ngOnInit(): void {
  }
  logout() {
    this.accountService.logout();
  }

}

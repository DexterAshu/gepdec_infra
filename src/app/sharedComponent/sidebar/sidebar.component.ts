import { Component, OnInit } from '@angular/core';
import { AccountService, MasterService } from 'src/app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  storedData: any;
  userData: any;

  constructor(public accountService: AccountService, private masterService: MasterService) {
    this.storedData = this.masterService.getLocalStorage();
    const userDataString = localStorage.getItem('gdUserData');

    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  ngOnInit(): void {
  }
  isRoleHidden(): boolean {
    return this.userData.rolename === 'Manager';
  }
  logout() {
    this.accountService.logout();
  }

}

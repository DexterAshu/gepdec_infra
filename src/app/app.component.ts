import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public route: Router,
    public accountService: AccountService,
  ) {}

  ngOnInit(): void {
    
  }

  logout() {
    this.accountService.logout();
  }

}

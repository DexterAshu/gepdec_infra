import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService:AccountService,
    private route: Router
  ) { }

  canActivate(){
    if (this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}

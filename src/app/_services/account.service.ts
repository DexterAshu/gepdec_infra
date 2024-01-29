import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';

export interface Users {
  loginName: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
    private route: Router,
    private alertService: AlertService,
  ) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('gdUserData'));
    this.user = this.userSubject.asObservable();
   }

   proceedLogin(userCred: Users): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any[]>(
        `${environment.apiUrl}/api/v1/userLogin`,
        userCred,
        httpOptions
      )
      .pipe(
        map((userData: any) => {
          if (userData.status) {
            localStorage.setItem('status', JSON.stringify(userData.status));

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userid', (userData.userid));
            localStorage.setItem('username', (userData.username));
            localStorage.setItem('rolename', (userData.rolename));
            this.userSubject = userData;
            return userData;
          } else {
            return '';
          }
        })
      );
  }

  //  proceedLogin(userCred: any, apiLink: any) { 
  //   let headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'companyID': environment.companyID,});
  //   let httpOptions = { headers: headers_object };
  //   return this.http.post<any[]>(`${environment.apiUrl}${apiLink}`, userCred, httpOptions).pipe(map((userData: any) => {
  //     if (userData.status == true) {
  //       return userData;
  //     } else {
  //       return '';
  //     }
  //   }));
  // }
  getusertoken() {
    return localStorage.getItem('gdUserData');
  }
  gettoken() {
    return !!localStorage.getItem('gdUserData');
  }

  isLoggedIn() {
    return !!localStorage.getItem('gdUserData');
    // return localStorage.getItem('gdUserData') != null;
  }

  logout() {
    localStorage.removeItem('gdUserData');
    localStorage.clear();
    // this.userSubject.next(null);
    this.route.navigate(['/login']);
    this.alertService.success("Logout Successfully.");
  }

  //forget password
  getpwd(data:any){
    return this.http.put<any>(
    `${environment.apiUrl}/user/api/v1/updatepassword1`, data);
    }

}

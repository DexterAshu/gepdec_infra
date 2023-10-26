import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  res: any;
  userData: any;
  companyName = environment.companyName;
  // form: FormGroup;
  responseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountService:AccountService,
    private route:Router,
    private alertService:AlertService,
  ) {
    localStorage.clear();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  proceedLogin(){
    if(this.loginForm.valid) {
      let apiLink = '/users/authenticate';
      this.loading = true;
      let credentials = {
        loginName: this.f['loginName'].value,
        password: this.f['password'].value,
      };
      this.accountService.proceedLogin(credentials, apiLink).subscribe((res) => {
        this.res = res;
        this.loading = false;
        if (this.res.status == true) {
          this.responseData = res;
          this.userData = localStorage.setItem('gdUserData', JSON.stringify(this.responseData));
          this.route.navigate(['dashboard'])
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
          this.alertService.success("Login Successful.");
        } else {
            this.route.navigate(['login']);
            this.alertService.error("Username or password is incorrect.");
        }
      }, error => {
        this.loading = false;
        this.alertService.error(error.status == 401 ? 'Username or password is incorrect.' : `${error.statusText}`);
      });
    } else {
      this.loading = false;
      this.alertService.error("Invalid Details, Please check once.");
    }
  }

}

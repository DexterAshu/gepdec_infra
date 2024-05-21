import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService, AccountService } from 'src/app/_services';

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
      // let credentials = {
      //   loginName: this.f['loginName'].value,
      //   password: this.f['password'].value,
      // };
      this.accountService.proceedLogin(this.loginForm.value).subscribe((res:any) => {
        this.res = res;
        this.loading = false;
        if (this.res.status == 200) {
          this.responseData = res;
          this.userData = localStorage.setItem('gdUserData', JSON.stringify(this.responseData));
          this.route.navigate(['dashboard'])
            setTimeout(() => {
              window.location.reload();
            });
        
          this.alertService.success("Login Successful.");
        } else {
            this.route.navigate(['login']);
            this.alertService.error("Username or password is incorrect.");
        }
      }, (error: any) => {
        console.error(error);
        this.loading = false;
        this.alertService.error(error.status == 401 ? 'Username or password is incorrect.' : "Error: Unknown Error!");
      });
    } else {
      this.loading = false;
      this.alertService.error("Invalid Details, Please check once.");
    }
  }

}

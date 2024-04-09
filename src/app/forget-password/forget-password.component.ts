import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent {
  msg: any = ""
  forgetform!: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forgetform = this.fb.group({
      loginName: ['', Validators.required]
    })
  }

  get f() {
    return this.forgetform.controls
  }

  getpassword() {
    let pwd = { "loginname": this.forgetform.value.loginName }
    this.accountService.getpwd(pwd).subscribe((res: any) => {
      this.msg = res.message
      setTimeout(() => {
        this.msg = ''
      }, 4000);
    })
  }

  loginpage() {
    this.router.navigate(['/login'])
  }
}

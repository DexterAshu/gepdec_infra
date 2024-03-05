import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService, AlertService, ApiService } from 'src/app/_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  username: any;
  username1:any;
  form!:FormGroup;
  name:any='';
  user_role:any='';
  designation:any='';
  emoplyee_id:any='';
  department:any='';
  contact_no:any='';
  email_id:any='';
  submitted: boolean = false;
  loading: boolean = false;
  result: any;

  isNewAdd = false;
  // matchpwd: string;
  first_name:any;
  // hidemodal: boolean;
  roleName: any;
  orgName: any;
  showButton: boolean = false;
  loginUserName: any;
  userId: any;
  matchpwd: any;
  userList: any;
  addDisplay() {
    this.isNewAdd = !this.isNewAdd;
  }

  loginName() {
    // this.user.logInName().subscribe((res: any) => {
    //   this.username = res.rows;
    // });
  }

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: [
        '',
        Validators.required,
      ],
      conpassword: ['', Validators.required],
    });
    this.listData();

    // var token = this.user.gettoken();
    // var tk: any = this.user.getusertoken()
    // this.roleName = JSON.parse(tk).rolename;
    // this.orgName = JSON.parse(tk).orgname;
    // var checkvalue = JSON.parse(tk).checkvalue;
    // this.loginUserName = JSON.parse(tk).loginname;
    // this.userId = JSON.parse(tk).userid;
    // this.username1 = this.userId;
    // if(checkvalue){
    //   this.showButton = true;
    // }else{
    //   this.showButton = false;
    // }
  }

  get f() {
    return this.form.controls;
  }

  // open() {
  //   if(this.roleName == 'Developer' || this.roleName == 'Project Member'){
  //     this.router.navigate(['timesheet']);
  //   }
  //   else if(this.roleName == 'Project Manager' || this.roleName == 'Project Manager Admin' || this.roleName == 'Project Sponsor'){
  //     this.router.navigate(['timesheet/project-management']);
  //   }
  //   else{
  //     this.router.navigate(['/m_user']);
  //   }
  // }

  keyPress(e: any) {
    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
    if (key == 32) {
      //space
      return false;
    }
    return true;
  }

  keyup(val:any)
  {
    if(val.value=='')
    {
      this.matchpwd=''
    }
    else
    {
      if(this.form.value.password=='')
      {
        this.matchpwd="Please fill password first"
        setTimeout(() => {
          this.matchpwd=''
        }, 2000);
      }
      else
      {
        if(this.form.value.password!=this.form.value.conpassword)
        {
          this.matchpwd="Password is not matching"
          // setTimeout(() => {
          //   this.matchpwd=''
          // }, 3000);
        }
        else
        {
          this.matchpwd=''
        }
      }
    }
  }


  listData(): void {
    this.masterService.getUserList().subscribe((res: any) => {
      this.userList = res.result;
      console.log( this.userList);
      
    });
  }

  onSubmit() {
    this.submitted = true;
  this.loading = true;
  this.createUser();
  }

  createUser() {
    this.masterService.reset(this.form.value).subscribe((res: any) => {
      

      if (res.status == 200) {
        this.ngOnInit();
        document.getElementById('closed')?.click();
        this.alertService.success('Password Reset Successfully');
      } else {
        this.alertService.error('Error, Something went wrong please check');
      } 
    })
   
  }
}

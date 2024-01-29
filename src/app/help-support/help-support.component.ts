import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match';
import { ApiService } from '../_services/api.service';

// import custom validator to validate that password and confirm password fields match


@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.css']
})
export class HelpSupportComponent {
    form: any;
    response: any;
  
    constructor(private formBuilder: FormBuilder,
      private apiservice:ApiService) { }
  
    ngOnInit(): void {
  
      this.form = this.formBuilder.group({
        data:['']
      });
    }
  
  
  
    isShow = false;
    dotShow()
  {
    console.log('show')
    this.isShow= !this.isShow;
  
  }


}

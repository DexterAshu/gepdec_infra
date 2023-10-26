import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

   
  p: number = 1;
  limit = environment.pageLimit;
  companyData: any;
  isNotFound:boolean = false;

  rolesList = [
    {name: 'Demo User', type: 'admin', desc: 'admin', createdBy: 'Demo User', createdAt:"2023-09-12T15:31:04.620Z"},
    {name: 'Demo User 2', type: 'office', desc: 'office', createdBy: 'User', createdAt:"2023-09-12T15:31:04.620Z"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  form!: FormGroup;
   
  p: number = 1;
  limit = environment.pageLimit;
  customerData=[
    {customerCode:'cust1', customerName:'Sandeep', circle:'circle1', category:'catg1', companyID:'Comp1', status:'Active', country:'India', address:'Ldh, India', contact:'9292838388', email:'text@gamil.com', active:'Y', createdBy:'Admin', createdOn:'18-08-2023', updatedBy:'Admin', updatedOn:'19-08-2023'},
    {customerCode:'cust2', customerName:'Akshay', circle:'circle2', category:'catg2', companyID:'Comp2', status:'Inactive', country:'India', address:'Pune, India', contact:'9292838388', email:'text@gamil.com', active:'Y', createdBy:'Admin', createdOn:'18-08-2023', updatedBy:'Admin', updatedOn:'19-08-2023'},
    {customerCode:'cust3', customerName:'Shubham', circle:'circle3', category:'catg3', companyID:'Comp3', status:'Active', country:'India', address:'Delhi, India', contact:'9292838388', email:'text@gamil.com', active:'Y', createdBy:'Admin', createdOn:'18-08-2023', updatedBy:'Admin', updatedOn:'19-08-2023'},
    {customerCode:'cust4', customerName:'Aashish', circle:'circle4', category:'catg4', companyID:'Comp4', status:'Inactive', country:'India', address:'Mumbai, India', contact:'9292838388', email:'text@gamil.com', active:'Y', createdBy:'Admin', createdOn:'18-08-2023', updatedBy:'Admin', updatedOn:'19-08-2023'},
  ]
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: ["",Validators.required],
      stateName: ["",Validators.required],
      companyID: ["",Validators.required],
      customerName: ["",Validators.required],
    });
  }

  get f() { return this.form.controls; }


  onSubmit(){
    console.log(this.form);
  }

}

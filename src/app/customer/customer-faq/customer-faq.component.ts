import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-faq',
  templateUrl: './customer-faq.component.html',
  styleUrls: ['./customer-faq.component.css']
})
export class CustomerFaqComponent implements OnInit {
  searchText: any;
  constructor() { }

  ngOnInit(): void {
  }

}

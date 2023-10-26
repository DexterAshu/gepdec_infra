import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumption-calculator',
  templateUrl: './consumption-calculator.component.html',
  styleUrls: ['./consumption-calculator.component.css']
})
export class ConsumptionCalculatorComponent implements OnInit {
   
  isNotFound:boolean = false;
  tableForm!: FormGroup;
  consCalData=[
    {appliance:'AC 1.5 ton', billDate:'01-01-2023', totalConsumption :'360', watt:'1500', dayUse :'30', equipmentCount:'1', usageHours:'8'},
    {appliance:'Fan', billDate:'05-03-2023', totalConsumption :'120', watt:'100', dayUse :'30', equipmentCount:'4', usageHours:'10'},
    {appliance:'LED Bulb (12 W)', billDate:'07-06-2023', totalConsumption :'34.56', watt :'12', dayUse :'30', equipmentCount:'8', usageHours:'12'},
    // {appliance:'AC 1.5 ton', billDate:'09-05-2023', totalConsumption :'358', watt:'11208', dayUse :'30', equipmentCount:'1401', usageHours:'5'},
    // {appliance:'Fan', billDate:'03-07-2023', totalConsumption :'200', watt:'8064', dayUse :'30', equipmentCount:'1401', usageHours:'9'},
    // {appliance:'LED Bulb (12 W)', billDate:'08-07-2023', totalConsumption :'300', watt:'7768', dayUse :'30', equipmentCount:'1008', usageHours:'7'},
  ]
  countData=[
    {no:1},
    {no:2},
    {no:3},
    {no:4},
    {no:5},
    {no:6},
    {no:7},
    {no:8},
    {no:9},
    {no:10},
  ]
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.tableForm = this.formBuilder.group({
      appliance: [null, Validators.required],
      watt: [null, Validators.required],
      equipmentCount: [null, Validators.required],
      usageHours: [null, Validators.required],
      dayUse: [null, Validators.required],
    })
  }
  get f() { return this.tableForm.controls; }
  onTableFormSubmit(){

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
  // declare headers 
  headers_object = new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!).token});

  constructor(
    private http: HttpClient,
  ) { }

  getLocalStorage(): any {
    const item = localStorage.getItem("gdUserData");
    return item ? JSON.parse(item) : null;
  }
  
  getCompanyData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/company/getCompany`, httpOptions);
  }
  
  getStateData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/state/getState`, httpOptions);
  }
  
  getECBData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/ecbMaster/getEcb`, httpOptions);
  }
  
  getDistrictData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/district/getDistrict`, httpOptions);
  }
  
  getCircleData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/circleMaster/getCircle`, httpOptions);
  }
  
  getMeterData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/meterMaster/getAllMeterIds`, httpOptions);
  }

  getSegmentData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/segmentMaster/getSegment`, httpOptions);
  }

  getBillLineData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/billLines/getBillLines`, httpOptions);
  }
  
  getMeterPricingData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/meterPricing/getMeterPricing`, httpOptions);
  }
}

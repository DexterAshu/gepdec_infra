import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
  // declare headers 
  headers_object = new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token});

  constructor(
    private http: HttpClient,
  ) { }

  getLocalStorage(): any {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  }


  //user API
  getUserMaster() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any>(
      `${environment.apiUrl}/user/api/v1/getUserMaster`,
      httpOptions
    );
  }
  userCreation(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/user/api/v1/createuser`,
      data,
      httpOptions
    );
  }
  userUpdation(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.put<any[]>(
      `${environment.apiUrl}/user/api/v1/updateuser`,
      data,
      httpOptions
    );
  }

   //User-API
   getUserList(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(
      `${environment.apiUrl}/user/api/v1/getuser`,
    
      httpOptions
    );
  }

  getuserdetail(user_id: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(
      `${environment.apiUrl}/user/api/v1/getUserDetails/${user_id}`,
      httpOptions
    );
  }

  // getUserMaster(){
  //   const httpOptions = { headers: this.headers_object };
  //   return this.http.get(`${environment.apiUrl}/master/api/v1/getUserMaster`, httpOptions);  
  // }
  
  getCompanyData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/company/getCompany`, httpOptions);
  }
  
  getStateData(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any>(
      `${environment.apiUrl}/state/api/v1/getState`,
      httpOptions
    );
  }
  getDistrictData(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any>(
      `${environment.apiUrl}/state/api/v1/getDistrict`,
      httpOptions
    );
  }

  getFinData(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any>(
      `${environment.apiUrl}/financialyear/api/v1/getFinancialYear`,
      httpOptions
    );
  }

  //bulkload-L2 Schedule data
bulkattach(data:any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this.http.post<any[]>(
    `${environment.apiUrl}/bulkLoad/api/v1/assetBulkUpload`,
    data,
    httpOptions
  );
  }

  //reset-password
  reset(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.put<any>(
      `${environment.apiUrl}/user/api/v1/updatepassword`,
      user,
      httpOptions
    );
  }
  
  getECBData(){
    const httpOptions = { headers: this.headers_object };
    return this.http.get(`${environment.apiUrl}/master/ecbMaster/getEcb`, httpOptions);
  }
  
  // getDistrictData(){
  //   const httpOptions = { headers: this.headers_object };
  //   return this.http.get(`${environment.apiUrl}/master/district/getDistrict`, httpOptions);
  // }
  
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

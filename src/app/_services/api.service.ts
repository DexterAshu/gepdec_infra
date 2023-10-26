import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    // private datePipe: DatePipe,
  ) { }

  getDataList(apiLink: any) {
    let headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!).token, 'companyID': environment.companyID });
    const httpOptions = { headers: headers_object };
    return this.http.get(`${environment.apiUrl}${apiLink}`, httpOptions);
  }
  
  postData(apiLink: any, data: any) {
    let headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!).token, 'companyID': environment.companyID });
    const httpOptions = { headers: headers_object };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  
  postDataFD(apiLink: any, data: any) {
    let headers_object = new HttpHeaders({ 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!).token, 'companyID': environment.companyID });
    const httpOptions = { headers: headers_object };
    return this.http.patch(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  
  postDataDiffApiUrl(apiLink: any, data: any) {
    // let headers_object = new HttpHeaders({});
    // const httpOptions = { headers: headers_object };
    // const options = { withCredentials: true }; // Enable credentials
    return this.http.post(`${environment.pullDataUrl}${apiLink}`, data);
  }
}

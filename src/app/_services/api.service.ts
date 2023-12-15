import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
// import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    // private datePipe: DatePipe,
  ) { }

  getCountryDataList(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(`${environment.apiUrl}/master/api/v1/getCountry`, httpOptions);
  }
  getStateData(data: any, state_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    const params= new HttpParams({
      fromString: `country_id=${data}&state_id=${state_id}`
    });
    return this.http.get<any>(
      `${environment.apiUrl}/master/api/v1/getState?${params}`,
      httpOptions
    );
  }
  getDistData(state_id: any, district_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    const params= new HttpParams({
      fromString: `state_id=${state_id}&district_id=${district_id}`
    });
    return this.http.get<any>(
      `${environment.apiUrl}/master/api/v1/getDistrict?${params}`,
      httpOptions
    );
  }
  getCompData(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(`${environment.apiUrl}/company/api/v1/getcompanytype`, httpOptions);
  }
  createCompany(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/company/api/v1/addComapany`,
      data,
      httpOptions
    );
  }
  getCompanyList(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(
      `${environment.apiUrl}/company/api/v1/getComapanyList`,
    
      httpOptions
    );
  }

  companyDetails(data:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(
      `${environment.apiUrl}/company/api/v1/getComapanyDetails/${data}`,
      httpOptions
    );
  }

  companyUpdation(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.put<any[]>(
      `${environment.apiUrl}/company/api/v1/updateComapany`,
      data,
      httpOptions
    );
  }

  getTenderType(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.get<any[]>(
      `${environment.apiUrl}/biding/api/v1/getTenderDropdown`,
    
      httpOptions
    );
  }


//VENDOR-API
getVendorType(): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this.http.get<any[]>(`${environment.apiUrl}/master/api/v1/getVendorDropdown`, httpOptions);
}


  //create tender
  createTender(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/biding/api/v1/addTender`,
      data,
      httpOptions
    );
  }

  //create master DEPT
  createMasterDepartment(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/master/api/v1/addDeptName`,
      data,
      httpOptions
    );
  }
//create master title
createMasterTitle(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this.http.post<any[]>(
    `${environment.apiUrl}/master/api/v1/addTitle`,
    data,
    httpOptions
  );
}
//create master role
createMasterRole(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this.http.post<any[]>(
    `${environment.apiUrl}/master/api/v1/addUserRoleName`,
    data,
    httpOptions
  );
}

  //create master Designation
  createMasterDesignation(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/master/api/v1/addDesignation`,
      data,
      httpOptions
    );
  }
  //create master state
  createMasterState(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/master/api/v1/addState`,
      data,
      httpOptions
    );
  }
  //create master district
  addMasterDistrict(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/master/api/v1/addDistrict`,
      data,
      httpOptions
    );
  }

  //********** API DASHBOARD **********
  //chart apply in dashboard
  getChartData(tenderid:any): Observable<any[]> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    const params= new HttpParams({
      fromString: `tenderid=${tenderid}`
    });
    return this.http.get<any[]>(
      `${environment.apiUrl}/biding/api/v1/getTest?${params}`,
      httpOptions
    );
  }

  // getDataList(apiLink: any) {
  //   let headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token, 'companyID': environment.companyID });
  //   const httpOptions = { headers: headers_object };
  //   return this.http.get(`${environment.apiUrl}${apiLink}`, httpOptions);
  // }
  
  // postData(apiLink: any, data: any) {
  //   let headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "auth-token " + JSON.parse(localStorage.getItem('user') || '').token });
  //   const httpOptions = { headers: headers_object };
  //   return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  // }
  
  postDataFD(apiLink: any, data: any) {
    let headers_object = new HttpHeaders({ 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!).token, 'companyID': environment.companyID });
    const httpOptions = { headers: headers_object };
    return this.http.patch(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  
  postDataDiffApiUrl(apiLink: any, data: any) {
    // let headers_object = new HttpHeaders({});
    // const httpOptions = { headers: headers_object };
    // const options = { withCredentials: true }; // Enable credentials
    // return this.http.post(`${environment.pullDataUrl}${apiLink}`, data);
  }
}

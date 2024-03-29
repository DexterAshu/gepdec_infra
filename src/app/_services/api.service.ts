import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
// import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCountryDataList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/state/api/v1/getCountry`, httpOptions );
  }

  getStateData(data: any, state_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `country_id=${data}&state_id=${state_id}` });
    return this.http.get<any>( `${environment.apiUrl}/state/api/v1/getState?${params}`, httpOptions );
  }

  getDistData(state_id: any, district_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `state_id=${state_id}&district_id=${district_id}` });
    return this.http.get<any>( `${environment.apiUrl}/state/api/v1/getDistrict?${params}`, httpOptions);
  }

  getCityData(district_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `district_id=${district_id}` });
    return this.http.get<any>( `${environment.apiUrl}/state/api/v1/getCity?${params}`, httpOptions );
  }

  getCompData(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/company/api/v1/getcompanytype`, httpOptions );
  }

  createCompany(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>( `${environment.apiUrl}/company/api/v1/addComapany`, data, httpOptions);
  }

  getCompanyList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/company/api/v1/getComapanyList`, httpOptions );
  }

  companyDetails(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/company/api/v1/getComapanyDetails/${data}`, httpOptions );
  }

  companyUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>( `${environment.apiUrl}/company/api/v1/updateComapany`, data, httpOptions );
  }

  //Our Company - GEPDEC
  ourcreateCompany(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>( `${environment.apiUrl}/mycompany/api/v1/addMyComapany`, data, httpOptions );
  }

  getourCompanyList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/mycompany/api/v1/getMyComapanyList`, httpOptions );
  }

  ourcompanyDetails(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/mycompany/api/v1/getMyComapanyDetails/${data}`, httpOptions );
  }

  ourcompanyUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>( `${environment.apiUrl}/mycompany/api/v1/updateMyComapany`, data, httpOptions);
  }

  //company-contacts
  createContacts(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>( `${environment.apiUrl}/contact/api/v1/addContact`, data, httpOptions);
  }

  getContactList(module_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `&module_id=${module_id}` });
    return this.http.get<any>( `${environment.apiUrl}/contact/api/v1/getContactList?${params}`, httpOptions);
  }

  getTenderType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/biding/api/v1/getTenderDropdown`, httpOptions);
  }

  getCompanyData(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/company/api/v1/getCompanyDropdown`, httpOptions);
  }

  getourCompanyData(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/mycompany/api/v1/getMyComapanyDropdown`, httpOptions );
  }

  getModuleList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/contact/api/v1/getContactModulesDropdowm`, httpOptions);
  }

  getCompaList(module_id: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/contact/api/v1/getCompanyDropdownByModule/${module_id}`, httpOptions );
  }

  //bid-qualify
  bidQuali(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post<any[]>( `${environment.apiUrl}/company/api/v1/addComapany`, data, httpOptions );
  }

  //VENDOR-API
  getVendorType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/master/api/v1/getVendorDropdown`, httpOptions );
  }

  //create tender
  createTender(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/biding/api/v1/addTender`,
      data,
      httpOptions
    );
  }
//tender list
  getTenderList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>( `${environment.apiUrl}/biding/api/v1/getTenderlist`, httpOptions );
  }

  //create master DEPT
  createMasterDepartment(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/department/api/v1/addDeptName`,
      data,
      httpOptions
    );
  }
  //create master title
  createMasterTitle(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/title/api/v1/addTitle`,
      data,
      httpOptions
    );
  }
  //create master role
  createMasterRole(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/role/api/v1/addUserRoleName`,
      data,
      httpOptions
    );
  }

  //create master Designation
  createMasterDesignation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/designation/api/v1/addDesignation`,
      data,
      httpOptions
    );
  }
  //create master Financial Year
  createMasterFinYear(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/financialyear/api/v1/addFinancialYear`,
      data,
      httpOptions
    );
  }
  //create master country
  createMasterCountry(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/state/api/v1/addCountry`,
      data,
      httpOptions
    );
  }
  //create master state
  createMasterState(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/state/api/v1/addState`,
      data,
      httpOptions
    );
  }
  //create master district
  addMasterDistrict(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(
      `${environment.apiUrl}/state/api/v1/addDistrict`,
      data,
      httpOptions
    );
  }

  //upload all type of documents
  createDocuments(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this.http.post<any[]>(
      `${environment.apiUrl}/document/api/v1/addDocument `,
      data,
      httpOptions
    );
  }

  getDocType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(
      `${environment.apiUrl}/document/api/v1/getDocumentDropdownList`,

      httpOptions
    );
  }

  getDocListData() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };

    return this.http.get<any>(
      `${environment.apiUrl}/document/api/v1/getDocumentList`,
      httpOptions
    );
  }
  // getDocListData(document_id:any){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
  //     }),
  //   };
  //   const params= new HttpParams({
  //     fromString: `document_id=${document_id}`
  //   });
  //   return this.http.get<any>(
  //     `${environment.apiUrl}/api/v1/getDocumentList?${params}`,
  //     httpOptions
  //   );
  // }

  //Support ticket list
  incidentList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/incident/getIncidentList`, httpOptions);
  }

  //********** API DASHBOARD **********
  //chart apply in dashboard
  getChartData(tenderid: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({fromString: `tenderid=${tenderid}`});
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTest?${params}`, httpOptions);
  }

  getData(apiLink: any) {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token}) };
    return this.http.get(`${environment.apiUrl}${apiLink}`, httpOptions);
  }

  postData(apiLink: any, data: any) {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token}) };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }

  postDataFD(apiLink: any, data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }

  postDataDiffApiUrl(apiLink: any, data: any) {
    // let headers_object = new HttpHeaders({});
    // const httpOptions = { headers: headers_object };
    // const options = { withCredentials: true }; // Enable credentials
    // return this.http.post(`${environment.pullDataUrl}${apiLink}`, data);
  }
}

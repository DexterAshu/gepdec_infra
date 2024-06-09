import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getCountryDataList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/state/api/v1/getCountry`, httpOptions);
  }

  getStateData(data: any, state_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `country_id=${data}&state_id=${state_id}` });
    return this.http.get<any>(`${environment.apiUrl}/state/api/v1/getState?${params}`, httpOptions);
  }

  getDistData(state_id: any, district_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `state_id=${state_id}&district_id=${district_id}` });
    return this.http.get<any>(`${environment.apiUrl}/state/api/v1/getDistrict?${params}`, httpOptions);
  }

  getCityData(district_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `district_id=${district_id}` });
    return this.http.get<any>(`${environment.apiUrl}/state/api/v1/getCity?${params}`, httpOptions);
  }

  getCompData(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/company/api/v1/getcompanytype`, httpOptions);
  }

  createCompany(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/company/api/v1/addComapany`, data, httpOptions);
  }

  getCompanyList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/company/api/v1/getComapanyList`, httpOptions);
  }

  companyDetails(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/company/api/v1/getComapanyDetails/${data}`, httpOptions);
  }

  companyUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/company/api/v1/updateComapany`, data, httpOptions);
  }

  //Our Company - GEPDEC
  ourcreateCompany(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/mycompany/api/v1/addMyComapany`, data, httpOptions);
  }

  ourcompanyDetails(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/mycompany/api/v1/getMyComapanyDetails/${data}`, httpOptions);
  }

  ourcompanyUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/mycompany/api/v1/updateMyComapany`, data, httpOptions);
  }

  //company-contacts
  createContacts(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/contact/api/v1/addContact`, data, httpOptions);
  }

  getContactList(module_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `&module_id=${module_id}` });
    return this.http.get<any>(`${environment.apiUrl}/contact/api/v1/getContactList?${params}`, httpOptions);
  }

  getTenderType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTenderDropdown`, httpOptions);
  }
  getCostType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/costing/api/v1/getCostingDropdown`, httpOptions);
  }

  getCompanyData(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/company/api/v1/getCompanyDropdown`, httpOptions);
  }

  //bid-qualify
  bidQuali(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/company/api/v1/addComapany`, data, httpOptions);
  }

  //VENDOR-API
  getVendorType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/master/api/v1/getVendorDropdown`, httpOptions);
  }

  //create tender
  createTender(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/biding/api/v1/addTender`, data, httpOptions);
  }

  //tender list
  getTenderList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTenderlist`, httpOptions);
  }

  getTenderLisById(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const url = data ? `/biding/api/v1/getTenderlist?company_id=${data}` : `/biding/api/v1/getTenderlist`;
    return this.http.get<any>(`${environment.apiUrl}${url}`, httpOptions);
  }

  tenderDetails(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTenderDetail/${data}`, httpOptions);
  }

  tenderUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/biding/api/v1/updateTender`, data, httpOptions);
  }

  //create master DEPT
  createMasterDepartment(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/department/api/v1/addDeptName`, data, httpOptions);
  }

  //create master title
  createMasterTitle(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/title/api/v1/addTitle`, data, httpOptions);
  }
  //create master role
  createMasterRole(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/role/api/v1/addUserRoleName`, data, httpOptions);
  }

  //create master Designation
  createMasterDesignation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/designation/api/v1/addDesignation`, data, httpOptions);
  }

  //create master Financial Year
  createMasterFinYear(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/financialyear/api/v1/addFinancialYear`, data, httpOptions);
  }

  //create master country
  createMasterCountry(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/state/api/v1/addCountry`, data, httpOptions);
  }
  countryMasterUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/state/api/v1/updateCountry`, data, httpOptions);
  }

  //create master state
  createMasterState(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/state/api/v1/addState`, data, httpOptions);
  }
  stateMasterUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/state/api/v1/updateState`, data, httpOptions);
  }

  //create master district
  addMasterDistrict(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/state/api/v1/addDistrict`, data, httpOptions);
  }
  districtMasterUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/state/api/v1/updateDistrict`, data, httpOptions);
  }

  //create master our finance details
  addFinData(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/biding/api/v1/addTenderFinancials`, data, httpOptions);
  }
  finComprisionData(bidder_id: any, financialyear_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `bidder_id=${bidder_id}&financialyear_id=${financialyear_id}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getMyComapanyFinancials?${params}`, httpOptions);
  }
  // finCalculateData(data:any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
  //   const params = new HttpParams({ fromString: `year=${data.year}&check=${data.check}&column=${data.column}` });
  //   return this.http.get<any>( `${environment.apiUrl}/mycompany/api/v1/checkMyComapanyFinancials?${params}`, httpOptions );
  // }

  ourFinUpdation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/mycompany/api/v1/updateMyComapanyFinancials`, data, httpOptions);
  }

  //fin-all fields-api
  finAnnuvalTournover(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getAnnualTurnover?${params}`, httpOptions);
  }
  finNetWorth(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getNetWorth?${params}`, httpOptions);
  }
  finNetWorkingCap(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getNetWorkingCapital?${params}`, httpOptions);
  }
  finLiability(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getTotalLiabilities?${params}`, httpOptions);
  }
  finFixedAsset(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getTotalFixedAssets?${params}`, httpOptions);
  }
  finNetProfit(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getNetProfit?${params}`, httpOptions);
  }
  finNetCapital(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getNetCapital?${params}`, httpOptions);
  }
  finRS(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getReserveSurplus?${params}`, httpOptions);
  }
  finPaidupCapital(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getPaidUpCapital?${params}`, httpOptions);
  }
  finAbidta(year: any, check: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `year=${year}&check=${check}` });
    return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getEbidta?${params}`, httpOptions);
  }


  myCompanyDoc(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/mycompany/api/v1/addMyComapanyDocuments`, data, httpOptions);
  }


  //upload all type of documents
  createDocuments(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/document/api/v1/addDocument `, data, httpOptions);
  }
  tenderDocuments(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/document/api/v1/addTenderDocument `, data, httpOptions);
  }

  getTendListData(Tender: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `doc_type=${Tender}` });
    return this.http.get<any[]>(`${environment.apiUrl}/document/api/v1/getTenderDocumentList?${params}`, httpOptions);
  }
  getamendmentListData(amendment: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `doc_type=${amendment}` });
    return this.http.get<any[]>(`${environment.apiUrl}/document/api/v1/getTenderDocumentList?${params}`, httpOptions);
  }
  getinitialBOQListData(initialboq: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `doc_type=${initialboq}` });
    return this.http.get<any[]>(`${environment.apiUrl}/document/api/v1/getTenderDocumentList?${params}`, httpOptions);
  }

  // getTendListData(): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
  //   return this.http.get<any>(`${environment.apiUrl}/document/api/v1/getTenderDocumentList`, httpOptions);
  // }
  createOurFinDocuments(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/mycompany/api/v1/addMyComapanyFinancials`, data, httpOptions);
  }
  //Our Company Finance list
  getOurFinList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/mycompany/api/v1/getMyComapanyFinancials`, httpOptions);
  }

  BOQbulkData(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/boq/api/v1/uploadBoq`, data, httpOptions);
  }

  getCompanyDocList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/mycompany/api/v1/getMyComapanyDocumnetList`, httpOptions);
  }

  AddBank(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/biding/api/v1/addBankGuarantee`, data, httpOptions);
  }

  getBankDataList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getBankGuaranteeList`, httpOptions);
  }

  getfinDataList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getTenderFinancialsList`, httpOptions);
  }

  getTechDataList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getPreQualificationList`, httpOptions);
  }

  getDocType(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/document/api/v1/getDocumentDropdownList`, httpOptions);
  }

  //Support ticket list
  incidentList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any>(`${environment.apiUrl}/incident/getIncidentList`, httpOptions);
  }

  //********** API DASHBOARD **********
  //chart apply in dashboard
  getChartData(tenderid: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `tenderid=${tenderid}` });
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTest?${params}`, httpOptions);
  }

  getData(apiLink: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get(`${environment.apiUrl}${apiLink}`, httpOptions);
  }

  postData(apiLink: any, data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  
  putData(apiLink: any, data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token}) };
    return this.http.put(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }

  postDataFD(apiLink: any, data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }

  createGRN(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/inventory/api/v1/createGRN`, data, httpOptions);
  }

  addAuditRequest(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/inventory/api/v1/addAuditRequest`, data, httpOptions);
  }

  auditRequestApproval(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put(`${environment.apiUrl}/inventory/api/v1/auditRequestApproval`, data, httpOptions);
  }

  addTechData(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post<any[]>(`${environment.apiUrl}/biding/api/v1/addPreQualification`, data, httpOptions);
  }

  createApproval(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put<any[]>(`${environment.apiUrl}/biding/api/v1/tenderApproval`, data, httpOptions);
  }

  createInventoryIssuance(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/inventory/api/v1/inventoryIssuance`, data, httpOptions);
  }

  l1ScheduleUpload(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/document/api/v1/l1ScheduleUpload`, data, httpOptions);
  }

  l1DocumentUpload(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/document/api/v1/l1DocumentUpload`, data, httpOptions);
  }

  l2ScheduleCreate(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/document/api/v1/l2ScheduleCreate`, data, httpOptions);
  }

  l2ScheduleUpdate(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put(`${environment.apiUrl}/document/api/v1/l2ScheduleUpdate`, data, httpOptions);
  }

  addDrawingDocument(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/drawing/api/v1/addDrawingDocument`, data, httpOptions);
  }

  addMDLList(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/drawing/api/v1/addMDLList`, data, httpOptions);
  }

  uploadAndApprovedMDL(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.post(`${environment.apiUrl}/drawing/api/v1/uploadAndApprovedMDL`, data, httpOptions);
  }

  // attachment-details
  getAttachmentDetails(tender_id: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    const params = new HttpParams({ fromString: `tender_id=${tender_id}` });
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTenderAllDocumentList?${params}`, httpOptions);

  }
  // location for boq
  getLocationForBoq(tender_id: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.get<any[]>(`${environment.apiUrl}/biding/api/v1/getTenderSiteAddress/${tender_id}`, httpOptions);
  }

  //link location for boq
  linkLocationForBoq(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token }) };
    return this.http.put(`${environment.apiUrl}/boq/api/v1/updateBOQLocation`, data, httpOptions);
  }

}

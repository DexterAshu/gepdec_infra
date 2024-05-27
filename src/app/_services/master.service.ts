import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getLocalStorage(): any {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  }

  //user API
  getUserMaster(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/user/api/v1/getUserMaster`, httpOptions);
  }

  userCreation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post<any[]>(`${environment.apiUrl}/user/api/v1/createuser`, data, httpOptions );
  }

  userUpdate(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.put<any[]>(`${environment.apiUrl}/user/api/v1/updateuser`, data, httpOptions );
  }
  
  userByDepartment(id: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any[]>(`${environment.apiUrl}/user/api/v1/getuser?usdt_id=${id}`, httpOptions );
  }

  //User-API
  getUserList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any[]>( `${environment.apiUrl}/user/api/v1/getuser`, httpOptions );
  }

  getuserdetail(user_id: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any[]>( `${environment.apiUrl}/user/api/v1/getUserDetails/${user_id}`, httpOptions );
  }

  getCompanyData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/company/getCompany`, httpOptions);
  }

  getStateData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/state/api/v1/getState`, httpOptions);
  }
  getDistrictData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/state/api/v1/getDistrict`, httpOptions);
  }

  getFinData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/financialyear/api/v1/getFinancialYear`, httpOptions);
  }
  //master-bank
  getBankData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/bank/api/v1/getBankDropdrown`, httpOptions);
  }
  getProjectList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get<any>(`${environment.apiUrl}/project/api/v1/projectList`, httpOptions);
  }

  //bulkload-L2 Schedule data
  bulkattach(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post<any[]>(`${environment.apiUrl}/bulkLoad/api/v1/assetBulkUpload`,data, httpOptions );
  }

  //reset-password
  reset(user: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.put<any>(`${environment.apiUrl}/user/api/v1/updatepassword`, user, httpOptions );
  }

  getECBData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/ecbMaster/getEcb`, httpOptions);
  }

  getCircleData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/circleMaster/getCircle`, httpOptions);
  }

  getMeterData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/meterMaster/getAllMeterIds`, httpOptions);
  }

  getSegmentData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/segmentMaster/getSegment`, httpOptions);
  }

  getBillLineData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/billLines/getBillLines`, httpOptions);
  }

  getMeterPricingData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'companyID': environment.companyID, 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')!).token }) };
    return this.http.get(`${environment.apiUrl}/master/meterPricing/getMeterPricing`, httpOptions);
  }

  createWarehouse(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post(`${environment.apiUrl}/warehouse/api/v1/addWareHouse`, data, httpOptions);
  }

  updateWarehouse(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.put(`${environment.apiUrl}/warehouse/api/v1/updateWareHouse`, data, httpOptions);
  }

  getWHLocationData(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.get(`${environment.apiUrl}/warehouse/api/v1/getLocationList`, httpOptions);
  }

  warehouseLocation(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
    return this.http.post(`${environment.apiUrl}/warehouse/api/v1/addLocation`, data, httpOptions);
  }

// *******************Dashboard******************************************
//Dashboard Main- API's
getCategoryData(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getQualificationDropdown`, httpOptions);
}
getCompData(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/mycompany/api/v1/getMyComapanyList`, httpOptions);
}

getProjectData(financialyearId: number, categoryId: number, companyId: number): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })
  };
  const url = `${environment.apiUrl}/biding/api/v1/getTenderListByQaCatagory?financialyear_id=${financialyearId}&qacatagory_id=${categoryId}&bidder_id=${companyId}`;
  return this.http.get<any>(url, httpOptions);
}

getStatusData(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getTenderDropdown`, httpOptions);
}
getProjectData2(tenderstatusId: number): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })
  };
  const url = `${environment.apiUrl}/biding/api/v1/getTenderlist?tenderstatus_id=${tenderstatusId}`;
  return this.http.get<any>(url, httpOptions);
}
getDashboard(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/dashboard/api/v1/getLandingDashboard`, httpOptions);
}
getTenderDetail(tenderId: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/biding/api/v1/getTenderDetail/${tenderId}`, httpOptions);
}
//Presales Dashboard
getPreSaleDashboard(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': JSON.parse(localStorage.getItem('user') || '').token })};
  return this.http.get<any>(`${environment.apiUrl}/dashboard/api/v1/getPreSalesDashboard`, httpOptions);
}


}

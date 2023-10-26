// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  companyName : 'Smart Energy Meter',
  production: false,
  pageLimit : 10,
  companyID : 'GEPDEC',
  
  // apiUrl: 'http://172.16.16.65:8037', //Private APi
  
  apiUrl: 'http://103.149.113.102:8037', //Public APi

  pullDataUrl: 'http://103.149.113.100:5000', //For pull data from meter APi

  meterPort: 4059, // this port is for pull Data api

};

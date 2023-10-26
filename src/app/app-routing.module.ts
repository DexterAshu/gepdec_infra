import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './masters/company/company.component';
import { StateComponent } from './masters/state/state.component';
import { DistrictComponent } from './masters/district/district.component';
import { ElectricityBoardComponent } from './masters/electricity-board/electricity-board.component';
import { CustomerComponent } from './masters/customer/customer.component';
import { MeterComponent } from './masters/meter/meter.component';
import { CircleComponent } from './masters/circle/circle.component';
import { LoginComponent } from './account/login/login.component';
import { UserLogsComponent } from './user-management/user-logs/user-logs.component';
import { UserRolesComponent } from './user-management/user-roles/user-roles.component';
import { Process1Component } from './customer-registration/process1/process1.component';
import { Process2Component } from './customer-registration/process2/process2.component';
import { Process3Component } from './customer-registration/process3/process3.component';
import { Process4Component } from './customer-registration/process4/process4.component';
import { MeterLinkComponent } from './transactions/meter-link/meter-link.component';
import { BillDateConfigComponent } from './transactions/bill-date-config/bill-date-config.component';
import { FirmwareUpgradeComponent } from './transactions/firmware-upgrade/firmware-upgrade.component';
import { UserMasterComponent } from './user-management/user-master/user-master.component';
import { Login4Component } from './account/login4/login4.component';
import { SegmentComponent } from './masters/segment/segment.component';
import { BillLinesComponent } from './masters/bill-lines/bill-lines.component';
import { MeterPriceComponent } from './masters/meter-price/meter-price.component';
import { CustomerDataUsageComponent } from './customer/customer-data-usage/customer-data-usage.component';
import { CustomerBillingDataComponent } from './customer/customer-billing-data/customer-billing-data.component';
import { AccountInfoComponent } from './customer/account-info/account-info.component';
import { ConsumptionCalculatorComponent } from './customer/consumption-calculator/consumption-calculator.component';
import { CustomerFaqComponent } from './customer/customer-faq/customer-faq.component';

const routes: Routes = [
  {path: 'login', component: Login4Component},
  {path: 'login2', component: LoginComponent},

  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},

  {path: 'master/company', component:CompanyComponent, canActivate:[AuthGuard]},
  {path: 'master/state', component:StateComponent, canActivate:[AuthGuard]},
  {path: 'master/electricity-board', component:ElectricityBoardComponent, canActivate:[AuthGuard]},
  {path: 'master/district', component:DistrictComponent, canActivate:[AuthGuard]},
  {path: 'master/circle', component:CircleComponent, canActivate:[AuthGuard]},
  {path: 'master/meter', component:MeterComponent, canActivate:[AuthGuard]},
  {path: 'master/segment', component:SegmentComponent, canActivate:[AuthGuard]},
  {path: 'master/bill-package', component:BillLinesComponent, canActivate:[AuthGuard]},
  {path: 'master/meter-pricing', component:MeterPriceComponent, canActivate:[AuthGuard]},
  {path: 'master/customer', component:CustomerComponent, canActivate:[AuthGuard]},
  
  {path: 'hes/meter-data', component:MeterComponent, canActivate:[AuthGuard]},

  {path: 'customer-registration/process-1', component:Process1Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-2', component:Process2Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-3', component:Process3Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-4', component:Process4Component, canActivate:[AuthGuard]},

  {path: 'user-management/user-logs', component:UserLogsComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-roles', component:UserRolesComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-master', component:UserMasterComponent, canActivate:[AuthGuard]},

  {path: 'transactions/link-meter-with-customer', component:MeterLinkComponent, canActivate:[AuthGuard]},
  {path: 'transactions/billing-date-configuration', component:BillDateConfigComponent, canActivate:[AuthGuard]},
  {path: 'transactions/firmware-upgrade', component:FirmwareUpgradeComponent, canActivate:[AuthGuard]},

  {path: 'customer/customer-data-usage', component:CustomerDataUsageComponent},
  {path: 'customer/customer-billing-data', component:CustomerBillingDataComponent},
  {path: 'customer/account-information', component:AccountInfoComponent},
  {path: 'customer/consumption-calculator', component:ConsumptionCalculatorComponent},
  {path: 'customer/customer-faq', component:CustomerFaqComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

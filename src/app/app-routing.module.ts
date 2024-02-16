import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { CustomerDataUsageComponent } from './customer/customer-data-usage/customer-data-usage.component';
import { CustomerBillingDataComponent } from './customer/customer-billing-data/customer-billing-data.component';
import { AccountInfoComponent } from './customer/account-info/account-info.component';
import { ConsumptionCalculatorComponent } from './customer/consumption-calculator/consumption-calculator.component';
import { CustomerFaqComponent } from './customer/customer-faq/customer-faq.component';
import { PresalesBidingComponent } from './presales/presales-biding/presales-biding.component';
import { DesignModuleComponent } from './presales/design-module/design-module.component';
import { ProcurementComponent } from './presales/procurement/procurement.component';
import { WarehouseStoreComponent } from './presales/warehouse-store/warehouse-store.component';
import { ExecutionComponent } from './presales/execution/execution.component';
import { QualitySafetyComponent } from './presales/quality-safety/quality-safety.component';
import { ProjHandoverComponent } from './presales/proj-handover/proj-handover.component';
import { PaymentComponent } from './presales/payment/payment.component';
import { FinanceComponent } from './presales/finance/finance.component';
import { ProjClosureComponent } from './presales/proj-closure/proj-closure.component';
import { PerformanceComponent } from './presales/performance/performance.component';
import { AlertAlarmComponent } from './presales/alert-alarm/alert-alarm.component';
import { CompanyDashboardComponent } from './dashboard/company-dashboard/company-dashboard.component';
import { FinanceDashboardComponent } from './dashboard/finance-dashboard/finance-dashboard.component';
import { PerformanceDashboardComponent } from './dashboard/performance-dashboard/performance-dashboard.component';
import { TenderDashboardComponent } from './dashboard/tender-dashboard/tender-dashboard.component';
import { ProcurementDashboardComponent } from './dashboard/procurement-dashboard/procurement-dashboard.component';
import { PresalesDashboardComponent } from './dashboard/presales-dashboard/presales-dashboard.component';
import { DesignDashboardComponent } from './dashboard/design-dashboard/design-dashboard.component';
import { WarehouseDashboardComponent } from './dashboard/warehouse-dashboard/warehouse-dashboard.component';
import { ExecutionDashboardComponent } from './dashboard/execution-dashboard/execution-dashboard.component';
import { QualityDashboardComponent } from './dashboard/quality-dashboard/quality-dashboard.component';
import { TicketDashboardComponent } from './dashboard/ticket-dashboard/ticket-dashboard.component';
import { ReportDashboardComponent } from './dashboard/report-dashboard/report-dashboard.component';
import { AlertDashboardComponent } from './dashboard/alert-dashboard/alert-dashboard.component';

import { TenderPublishedComponent } from './dashboard/presales-dashboard/tender-published/tender-published.component';
import { UnderEvaluationComponent } from './dashboard/presales-dashboard/under-evaluation/under-evaluation.component';
import { ParticipationsComponent } from './dashboard/presales-dashboard/participations/participations.component';
import { AbandonedComponent } from './dashboard/presales-dashboard/abandoned/abandoned.component';
import { TenderWinsComponent } from './dashboard/presales-dashboard/tender-wins/tender-wins.component';
import { CompletedComponent } from './dashboard/presales-dashboard/completed/completed.component';
import { L2ScheduleBulkdataComponent } from './l2-schedule-bulkdata/l2-schedule-bulkdata.component';

import { BidQualifyComponent } from './presales/presales-biding/bid-qualify/bid-qualify.component';
import { DirectBidingComponent } from './presales/presales-biding/direct-biding/direct-biding.component';
import { IndirectBidingComponent } from './presales/presales-biding/indirect-biding/indirect-biding.component';
import { DataCapturingComponent } from './presales/presales-biding/data-capturing/data-capturing.component';
import { CaptureDataListComponent } from './presales/presales-biding/capture-data-list/capture-data-list.component';


import { ProblemTicketComponent } from './problem-ticket/problem-ticket.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ProjReportsComponent } from './proj-reports/proj-reports.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forget-password', component:ForgetPasswordComponent},

//dashboard
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},

  //L2-schedule-bulkdata
  {path: 'l2-bulkdata', component:L2ScheduleBulkdataComponent, canActivate:[AuthGuard]},

  {path: 'issue-tickets', component:ProblemTicketComponent, canActivate:[AuthGuard]},
  {path: 'help-support', component:HelpSupportComponent, canActivate:[AuthGuard]},
  {path: 'documentation', component:DocumentationComponent, canActivate:[AuthGuard]},
  {path: 'project-report', component:ProjReportsComponent, canActivate:[AuthGuard]},
  {path: 'reset-password', component:ResetPasswordComponent, canActivate:[AuthGuard]},

  //dashboard-child-module
  {path: 'dashboard/fin-dashboard', component:FinanceDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/comp-dashboard', component:CompanyDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/performance-dashboard', component:PerformanceDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/procurement-dashboard', component:ProcurementDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/tender-dashboard', component:TenderDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard', component:PresalesDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/design-dashboard', component:DesignDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/warehouse-dashboard', component:WarehouseDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/execution-dashboard', component:ExecutionDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/quality-dashboard', component:QualityDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/ticket-dashboard', component:TicketDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/report-dashboard', component:ReportDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/alert-dashboard', component:AlertDashboardComponent, canActivate:[AuthGuard]},

  //presales tender list
  {path: 'dashboard/presales-dashboard/published-tender', component:TenderPublishedComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard/under-evaluation', component:UnderEvaluationComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard/participation', component:ParticipationsComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard/abandoned', component:AbandonedComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard/win', component:TenderWinsComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/presales-dashboard/completed', component:CompletedComponent, canActivate:[AuthGuard]},


  //Welcome to lazy-loading Programming
     //Master root
  {
      path: 'master',loadChildren: () =>
      import('./masters/master.module').then((m) => m.MasterModule),canActivate: [AuthGuard],
  },


//presales
  {path: 'presales/presales-biding', component:PresalesBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/design-module', component:DesignModuleComponent, canActivate:[AuthGuard]},
  {path: 'presales/procurement', component:ProcurementComponent, canActivate:[AuthGuard]},
  {path: 'presales/warehouse', component:WarehouseStoreComponent, canActivate:[AuthGuard]},
  {path: 'presales/execution', component:ExecutionComponent, canActivate:[AuthGuard]},
  {path: 'presales/quality-safety', component:QualitySafetyComponent, canActivate:[AuthGuard]},
  {path: 'presales/proj-handover', component:ProjHandoverComponent, canActivate:[AuthGuard]},
  {path: 'presales/payment', component:PaymentComponent, canActivate:[AuthGuard]},
  {path: 'presales/finance', component:FinanceComponent, canActivate:[AuthGuard]},
  {path: 'presales/proj-closure', component:ProjClosureComponent, canActivate:[AuthGuard]},
  {path: 'presales/performance', component:PerformanceComponent, canActivate:[AuthGuard]},
  {path: 'presales/alert-alarm', component:AlertAlarmComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/direct-biding', component:DirectBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/indirect-biding', component:IndirectBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/bid-qualify', component:BidQualifyComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/data-capture-list', component:CaptureDataListComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/data-capture', component:DataCapturingComponent, canActivate:[AuthGuard]},
//Customer 
  {path: 'customer-registration/process-1', component:Process1Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-2', component:Process2Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-3', component:Process3Component, canActivate:[AuthGuard]},
  {path: 'customer-registration/process-4', component:Process4Component, canActivate:[AuthGuard]},
//user
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLogsComponent } from './user-management/user-logs/user-logs.component';
import { UserRolesComponent } from './user-management/user-roles/user-roles.component';
import { UserMasterComponent } from './user-management/user-master/user-master.component';
import { PresalesBidingComponent } from './presales/presales-biding/presales-biding.component';
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
import { TechnicalBidComponent } from './presales/presales-biding/technical-bid/technical-bid.component';
import { SynopsisComponent } from './presales/presales-biding/synopsis/synopsis.component';
import { FinancialBidComponent } from './presales/presales-biding/financial-bid/financial-bid.component';
import { BankingDetailsComponent } from './presales/presales-biding/banking-details/banking-details.component';
import { BoqItemsComponent } from './presales/presales-biding/boq-items/boq-items.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { TenderDocumentComponent } from './documentation/tender-document/tender-document.component';
import { AmendmentsComponent } from './documentation/tender-document/amendments/amendments.component';
import { InitialBoqComponent } from './documentation/tender-document/initial-boq/initial-boq.component';
import { L1ScheduleComponent } from './documentation/tender-document/l1-schedule/l1-schedule.component';
import { QualificationDocumentComponent } from './documentation/qualification-document/qualification-document.component';
import { FinDocumentsComponent } from './documentation/qualification-document/fin-documents/fin-documents.component';
import { FinBalancesheetComponent } from './documentation/qualification-document/fin-documents/fin-balancesheet/fin-balancesheet.component';
import { FinMaatComponent } from './documentation/qualification-document/fin-documents/fin-maat/fin-maat.component';
import { FinLiquidAssetComponent } from './documentation/qualification-document/fin-documents/fin-liquid-asset/fin-liquid-asset.component';
import { FinBankCertificateComponent } from './documentation/qualification-document/fin-documents/fin-bank-certificate/fin-bank-certificate.component';
import { FinItrComponent } from './documentation/qualification-document/fin-documents/fin-itr/fin-itr.component';
import { FinTenderFeesComponent } from './documentation/qualification-document/fin-documents/fin-tender-fees/fin-tender-fees.component';
import { TechQualificationComponent } from './documentation/qualification-document/tech-documents/tech-qualification/tech-qualification.component';
import { TechDocumentsComponent } from './documentation/qualification-document/tech-documents/tech-documents.component';
import { OtherDocumentsComponent } from './documentation/qualification-document/other-documents/other-documents.component';
import { ProcurementDocumentComponent } from './documentation/procurement-document/procurement-document.component';
import { ProjectDocumentComponent } from './documentation/project-document/project-document.component';
import { FinanceDocumentComponent } from './documentation/finance-document/finance-document.component';
import { BgDocumentComponent } from './documentation/bg-document/bg-document.component';
import { LcDocumentComponent } from './documentation/lc-document/lc-document.component';
import { CommunicationDocumentComponent } from './documentation/communication-document/communication-document.component';
import { OthersDocumentComponent } from './documentation/others-document/others-document.component';
import { ProjReportsComponent } from './proj-reports/proj-reports.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { InventoryComponent } from './presales/inventory/inventory.component';
import { BoqComponent } from './procurement/boq/boq.component';
import { ProposalOneComponent } from './procurement/proposal-one/proposal-one.component';
import { ProposalTwoComponent } from './procurement/proposal-two/proposal-two.component';
import { FinalProposalComponent } from './procurement/final-proposal/final-proposal.component';
import { ApprovalComponent } from './procurement/approval/approval.component';
import { PoDataComponent } from './procurement/po-data/po-data.component';
import { AuditRequestComponent } from './presales/inventory/audit-request/audit-request.component';
import { AuditApprovalComponent } from './presales/inventory/audit-approval/audit-approval.component';
import { MaterialReceiptComponent } from './transactions/material-receipt/material-receipt.component';
import { MaterialIssuanceComponent } from './transactions/material-issuance/material-issuance.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { MasterDrawingListComponent } from './documentation/master-drawing-list/master-drawing-list.component';
import { DrawingComponent } from './documentation/drawing/drawing.component';
import { FinalBOQComponent } from './documentation/final-boq/final-boq.component';
import { IndirectCostingComponent } from './presales/presales-biding/indirect-costing/indirect-costing.component';
import { DirectCostingComponent } from './presales/presales-biding/direct-costing/direct-costing.component';
import { CostingApprovalComponent } from './presales/presales-biding/costing-approval/costing-approval.component';
import { TenderFinalApprovalComponent } from './presales/presales-biding/tender-final-approval/tender-final-approval.component';
import { UnderDevelopmentComponent } from './sharedComponent/under-development/under-development.component';
import { PreSalesDrawingComponent } from './presales/design/pre-sales-drawing/pre-sales-drawing.component';
import { PreSalesFinalBOQComponent } from './presales/design/pre-sales-final-boq/pre-sales-final-boq.component';
import { PreSalesMasterDrawingListComponent } from './presales/design/pre-sales-master-drawing-list/pre-sales-master-drawing-list.component';

const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  {path: 'login', component: SignInComponent},
  {path: 'forget-password', component:ForgetPasswordComponent},
  //dashboard
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  //L2-schedule-bulkdata
  {path: 'l2-bulkdata', component:L2ScheduleBulkdataComponent, canActivate:[AuthGuard]},
  {path: 'issue-tickets', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'help-support', component:HelpSupportComponent, canActivate:[AuthGuard]},
  //Documentation-routing
  {path: 'documentation', component:DocumentationComponent, canActivate:[AuthGuard]},
  //teder-documnets
  {path: 'documentation/tend-doc', component:TenderDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/tend-doc/amendments', component:AmendmentsComponent, canActivate:[AuthGuard]},
  {path: 'documentation/tend-doc/initial-boq', component:InitialBoqComponent, canActivate:[AuthGuard]},
  {path: 'documentation/tend-doc/l1-schedule', component:L1ScheduleComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc', component:QualificationDocumentComponent, canActivate:[AuthGuard]},
  //financial-documents
  {path: 'documentation/qualification-doc/fin', component:FinDocumentsComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/balance-sheet', component:FinBalancesheetComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/maat', component:FinMaatComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/liq-asset', component:FinLiquidAssetComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/bank-certificate', component:FinBankCertificateComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/itr', component:FinItrComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/fin/tender-fees', component:FinTenderFeesComponent, canActivate:[AuthGuard]},
  //tech-qualification-documents
  {path: 'documentation/qualification-doc/tech', component:TechDocumentsComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/tech/qualification', component:TechQualificationComponent, canActivate:[AuthGuard]},
  {path: 'documentation/qualification-doc/others', component:OtherDocumentsComponent, canActivate:[AuthGuard]},
  {path: 'documentation/bg-doc', component:BgDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/lc-doc', component:LcDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/comm-doc', component:CommunicationDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/master-drawing-list', component:MasterDrawingListComponent, canActivate:[AuthGuard]},
  {path: 'documentation/drawing-doc', component:DrawingComponent, canActivate:[AuthGuard]},
  {path: 'documentation/final-boq', component:FinalBOQComponent, canActivate:[AuthGuard]},
  {path: 'documentation/proc-doc', component:ProcurementDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/proj-doc', component:ProjectDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/fin-doc', component:FinanceDocumentComponent, canActivate:[AuthGuard]},
  {path: 'documentation/others-doc', component:OthersDocumentComponent, canActivate:[AuthGuard]},
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
  {path: 'procurement/boq', component:BoqComponent, canActivate:[AuthGuard]},
  {path: 'procurement/proposal-1', component:ProposalOneComponent, canActivate:[AuthGuard]},
  {path: 'procurement/proposal-2', component:ProposalTwoComponent, canActivate:[AuthGuard]},
  {path: 'procurement/final-proposal', component:FinalProposalComponent, canActivate:[AuthGuard]},
  {path: 'procurement/approval', component:ApprovalComponent, canActivate:[AuthGuard]},
  {path: 'procurement/po', component:PoDataComponent, canActivate:[AuthGuard]},
  // Masters
  {path: 'master',loadChildren: () => import('./masters/master.module').then((m) => m.MasterModule),canActivate: [AuthGuard]},
  //presales
  {path: 'presales/presales-biding', component:PresalesBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/warehouse', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/execution', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/quality-safety', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/proj-handover', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/payment', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/finance', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/proj-closure', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/performance', component:UnderDevelopmentComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/direct-biding', component:DirectBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/indirect-biding', component:IndirectBidingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/bid-qualify', component:BidQualifyComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/data-capture-list', component:CaptureDataListComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/data-capture', component:DataCapturingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/data-capture/:id', component:DataCapturingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/technical', component:TechnicalBidComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/financial', component:FinancialBidComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/synopsis', component:SynopsisComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/synopsis-costing', component:CostingApprovalComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/tender-final-approval', component:TenderFinalApprovalComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/banking-details', component:BankingDetailsComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/boq-item', component:BoqItemsComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/indirect-cost', component:IndirectCostingComponent, canActivate:[AuthGuard]},
  {path: 'presales/presales-biding/direct-cost', component:DirectCostingComponent, canActivate:[AuthGuard]},
  {path: 'presales/inventory', component:InventoryComponent, canActivate:[AuthGuard]},
  {path: 'presales/inventory/audit-request', component: AuditRequestComponent, canActivate:[AuthGuard]},
  {path: 'presales/inventory/audit-approval', component:AuditApprovalComponent, canActivate:[AuthGuard]},
  {path: 'presales/master-drawing-list', component:PreSalesMasterDrawingListComponent, canActivate:[AuthGuard]},
  {path: 'presales/drawing-doc', component:PreSalesDrawingComponent, canActivate:[AuthGuard]},
  {path: 'presales/final-boq', component:PreSalesFinalBOQComponent, canActivate:[AuthGuard]},
  //user
  {path: 'user-management/user-logs', component:UserLogsComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-roles', component:UserRolesComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-master', component:UserMasterComponent, canActivate:[AuthGuard]},
  {path: 'transactions/material-receipt-note', component:MaterialReceiptComponent, canActivate:[AuthGuard]},
  {path: 'transactions/material-issuance-note', component:MaterialIssuanceComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

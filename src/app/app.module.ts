import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './sharedComponent/header/header.component';
import { FooterComponent } from './sharedComponent/footer/footer.component';
import { SidebarComponent } from './sharedComponent/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './masters/company/company.component';
import { StateComponent } from './masters/state/state.component';
import { DistrictComponent } from './masters/district/district.component';
import { FinYearComponent } from './masters/fin-year/fin-year.component';
import { LoginComponent } from './account/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserLogsComponent } from './user-management/user-logs/user-logs.component';
import { UserRolesComponent } from './user-management/user-roles/user-roles.component';
import { UserMasterComponent } from './user-management/user-master/user-master.component';
import { ResponsiveTableComponent } from './sharedComponent/responsive-table/responsive-table.component';
import { LineBreakPipe } from './_pipes/line-break.pipe';
import { SegmentComponent } from './masters/segment/segment.component';
import { WordCapitalizeDirective } from './_directive/word-capitalize.directive';
import { AlphabetOnlyDirective } from './_directive/alphabet-only.directive';
import { NumberOnlyDirective } from './_directive/number-only.directive';
import { NoSpaceDirective } from './_directive/no-space.directive';
import { UpperCaseDirective } from './_directive/upper-case.directive';
import { NumWithDotDirective } from './_directive/num-with-dot.directive';
import { AlphaNumericDirective } from './_directive/alpha-numeric.directive';
import { NgxPrintModule } from 'ngx-print';
import { AlphaWithSpaceDirective } from './_directive/alpha-with-space.directive';
import { DatePipe } from '@angular/common';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './_pipes/filter.pipe';
import { PresalesBidingComponent } from './presales/presales-biding/presales-biding.component';
//dashboard-import section
import { CompanyDashboardComponent } from './dashboard/company-dashboard/company-dashboard.component';
import { FinanceDashboardComponent } from './dashboard/finance-dashboard/finance-dashboard.component';
import { PerformanceDashboardComponent } from './dashboard/performance-dashboard/performance-dashboard.component';
import { TenderDashboardComponent } from './dashboard/tender-dashboard/tender-dashboard.component';
import { ProcurementDashboardComponent } from './dashboard/procurement-dashboard/procurement-dashboard.component';
import { DesignDashboardComponent } from './dashboard/design-dashboard/design-dashboard.component';
import { WarehouseDashboardComponent } from './dashboard/warehouse-dashboard/warehouse-dashboard.component';
import { ExecutionDashboardComponent } from './dashboard/execution-dashboard/execution-dashboard.component';
import { QualityDashboardComponent } from './dashboard/quality-dashboard/quality-dashboard.component';
import { TicketDashboardComponent } from './dashboard/ticket-dashboard/ticket-dashboard.component';
import { ReportDashboardComponent } from './dashboard/report-dashboard/report-dashboard.component';
import { AlertDashboardComponent } from './dashboard/alert-dashboard/alert-dashboard.component';

import { DirectBidingComponent } from './presales/presales-biding/direct-biding/direct-biding.component';
import { IndirectBidingComponent } from './presales/presales-biding/indirect-biding/indirect-biding.component';
import { PresalesDashboardComponent } from './dashboard/presales-dashboard/presales-dashboard.component';
import { TenderPublishedComponent } from './dashboard/presales-dashboard/tender-published/tender-published.component';
import { UnderEvaluationComponent } from './dashboard/presales-dashboard/under-evaluation/under-evaluation.component';
import { ParticipationsComponent } from './dashboard/presales-dashboard/participations/participations.component';
import { AbandonedComponent } from './dashboard/presales-dashboard/abandoned/abandoned.component';
import { TenderWinsComponent } from './dashboard/presales-dashboard/tender-wins/tender-wins.component';
import { CompletedComponent } from './dashboard/presales-dashboard/completed/completed.component';
import { L2ScheduleBulkdataComponent } from './l2-schedule-bulkdata/l2-schedule-bulkdata.component';
//master-import-section
import { DepartmentMasterComponent } from './masters/department-master/department-master.component';
import { DesignationMasterComponent } from './masters/designation-master/designation-master.component';
import { ItemMasterComponent } from './masters/procurement/item-master/item-master.component';
import { MyCompanyComponent } from './masters/my-company/my-company.component';
import { SpareMasterComponent } from './masters/spare-master/spare-master.component';
import { TenderMasterComponent } from './masters/tender-master/tender-master.component';
import { VendorMasterComponent } from './masters/vendor-master/vendor-master.component';
import { RoleMasterComponent } from './masters/role-master/role-master.component';
import { TitleMasterComponent } from './masters/title-master/title-master.component';
import { MilestoneTasksComponent } from './masters/milestone-tasks/milestone-tasks.component';
import { ProjectDocumentsComponent } from './masters/project-documents/project-documents.component';
import { ProjectMilestoneComponent } from './masters/project-milestone/project-milestone.component';
import { ProjectsComponent } from './masters/projects/projects.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BidQualifyComponent } from './presales/presales-biding/bid-qualify/bid-qualify.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ProjReportsComponent } from './proj-reports/proj-reports.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DataCapturingComponent } from './presales/presales-biding/data-capturing/data-capturing.component';
import { ChartModule } from 'angular-highcharts';
import { CaptureDataListComponent } from './presales/presales-biding/capture-data-list/capture-data-list.component';
import { CompanyContactsComponent } from './masters/company-contacts/company-contacts.component';
import { SupplierComponent } from './masters/procurement/supplier/supplier.component';
import { TenderDocumentComponent } from './documentation/tender-document/tender-document.component';
import { BgDocumentComponent } from './documentation/bg-document/bg-document.component';
import { LcDocumentComponent } from './documentation/lc-document/lc-document.component';
import { CommunicationDocumentComponent } from './documentation/communication-document/communication-document.component';
import { OthersDocumentComponent } from './documentation/others-document/others-document.component';
import { TechnicalBidComponent } from './presales/presales-biding/technical-bid/technical-bid.component';
import { FinancialBidComponent } from './presales/presales-biding/financial-bid/financial-bid.component';
import { BankingDetailsComponent } from './presales/presales-biding/banking-details/banking-details.component';
import { CountryMasterComponent } from './masters/country-master/country-master.component';
import { SupplierItemLinkComponent } from './masters/procurement/supplier-item-link/supplier-item-link.component';
import { WarehouseMasterComponent } from './masters/warehouse-master/warehouse-master.component';
import { AmendmentsComponent } from './documentation/tender-document/amendments/amendments.component';
import { InitialBoqComponent } from './documentation/tender-document/initial-boq/initial-boq.component';
import { L1ScheduleComponent } from './documentation/tender-document/l1-schedule/l1-schedule.component';
import { QualificationDocumentComponent } from './documentation/qualification-document/qualification-document.component';
import { FinDocumentsComponent } from './documentation/qualification-document/fin-documents/fin-documents.component';
import { TechDocumentsComponent } from './documentation/qualification-document/tech-documents/tech-documents.component';
import { OtherDocumentsComponent } from './documentation/qualification-document/other-documents/other-documents.component';

import { FinBalancesheetComponent } from './documentation/qualification-document/fin-documents/fin-balancesheet/fin-balancesheet.component';
import { FinMaatComponent } from './documentation/qualification-document/fin-documents/fin-maat/fin-maat.component';
import { FinLiquidAssetComponent } from './documentation/qualification-document/fin-documents/fin-liquid-asset/fin-liquid-asset.component';
import { FinBankCertificateComponent } from './documentation/qualification-document/fin-documents/fin-bank-certificate/fin-bank-certificate.component';
import { FinItrComponent } from './documentation/qualification-document/fin-documents/fin-itr/fin-itr.component';
import { FinTenderFeesComponent } from './documentation/qualification-document/fin-documents/fin-tender-fees/fin-tender-fees.component';
import { TechQualificationComponent } from './documentation/qualification-document/tech-documents/tech-qualification/tech-qualification.component';
import { ProcurementDocumentComponent } from './documentation/procurement-document/procurement-document.component';
import { ProjectDocumentComponent } from './documentation/project-document/project-document.component';
import { FinanceDocumentComponent } from './documentation/finance-document/finance-document.component';
import { ItemLabelComponent } from './masters/item-label/item-label.component';
import { InventoryComponent } from './presales/inventory/inventory.component';
import { BoqComponent } from './procurement/boq/boq.component';
import { ProposalOneComponent } from './procurement/proposal-one/proposal-one.component';
import { ProposalTwoComponent } from './procurement/proposal-two/proposal-two.component';
import { FinalProposalComponent } from './procurement/final-proposal/final-proposal.component';
import { ApprovalComponent } from './procurement/approval/approval.component';
import { PoDataComponent } from './procurement/po-data/po-data.component';
import { AuditRequestComponent } from './presales/inventory/audit-request/audit-request.component';
import { AuditApprovalComponent } from './presales/inventory/audit-approval/audit-approval.component';
import { MangagementTenderApprovalComponent } from './presales/presales-biding/mangagement-tender-approval/mangagement-tender-approval.component';
import { MaterialReceiptComponent } from './transactions/material-receipt/material-receipt.component';
import { MaterialIssuanceComponent } from './transactions/material-issuance/material-issuance.component';
import { BoqItemsComponent } from './presales/presales-biding/boq-items/boq-items.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { OurCompanyFinanaceDataComponent } from './masters/our-company-finanace-data/our-company-finanace-data.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { UsdOnlyDirective } from './usd-only.directive';
import { MasterDrawingListComponent } from './documentation/master-drawing-list/master-drawing-list.component';
import { DrawingComponent } from './documentation/drawing/drawing.component';
import { FinalBOQComponent } from './documentation/final-boq/final-boq.component';
import { IndirectCostingComponent } from './presales/presales-biding/indirect-costing/indirect-costing.component';
import { SynopsisComponent } from './presales/presales-biding/synopsis/synopsis.component';
import { CompFinanceComponent } from './masters/comp-finance/comp-finance.component';
import { DirectCostingComponent } from './presales/presales-biding/direct-costing/direct-costing.component';
import localeIn from '@angular/common/locales/en-IN';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DraggableModalDirective } from './drag-directive';

// Register the locale data for 'en-IN'
registerLocaleData(localeIn, 'en-IN');
import { LOCALE_ID } from '@angular/core';
import { CostingApprovalComponent } from './presales/presales-biding/costing-approval/costing-approval.component';
import { TenderFinalApprovalComponent } from './presales/presales-biding/tender-final-approval/tender-final-approval.component';
import { UnderDevelopmentComponent } from './sharedComponent/under-development/under-development.component';
import { PreSalesDrawingComponent } from './presales/design/pre-sales-drawing/pre-sales-drawing.component';
import { PreSalesFinalBOQComponent } from './presales/design/pre-sales-final-boq/pre-sales-final-boq.component';
import { PreSalesMasterDrawingListComponent } from './presales/design/pre-sales-master-drawing-list/pre-sales-master-drawing-list.component';
import { FinalReportComponent } from './presales/presales-biding/final-report/final-report.component';
import { WonLossTenderComponent } from './presales/presales-biding/won-loss-tender/won-loss-tender.component';
import { LocationModalComponent } from './sharedComponent/location-modal/location-modal.component';
import { SliceWithTooltipComponent } from './sharedComponent/slice-with-tooltip/slice-with-tooltip.component';

@NgModule({
  declarations: [
    DraggableModalDirective,
    UsdOnlyDirective,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CompanyComponent,
    StateComponent,
    DistrictComponent,
    OurCompanyFinanaceDataComponent,
    LoginComponent,
    UserLogsComponent,
    UserRolesComponent,
    UserMasterComponent,
    ResponsiveTableComponent,
    LineBreakPipe,
    SegmentComponent,
    WordCapitalizeDirective,
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    NoSpaceDirective,
    UpperCaseDirective,
    NumWithDotDirective,
    AlphaNumericDirective,
    AlphaWithSpaceDirective,
    FilterPipe,
    PresalesBidingComponent,
    CompanyDashboardComponent,
    FinanceDashboardComponent,
    PerformanceDashboardComponent,
    TenderDashboardComponent,
    ProcurementDashboardComponent,
    DirectBidingComponent,
    IndirectBidingComponent,
    PresalesDashboardComponent,
    TenderPublishedComponent,
    UnderEvaluationComponent,
    ParticipationsComponent,
    AbandonedComponent,
    TenderWinsComponent,
    CompletedComponent,
    L2ScheduleBulkdataComponent,
    WarehouseMasterComponent,
    MyCompanyComponent, VendorMasterComponent, TenderMasterComponent, ItemMasterComponent, DepartmentMasterComponent, DesignationMasterComponent, SpareMasterComponent,
    TitleMasterComponent,RoleMasterComponent, DesignDashboardComponent, WarehouseDashboardComponent, ExecutionDashboardComponent, QualityDashboardComponent, TicketDashboardComponent, ReportDashboardComponent, AlertDashboardComponent, FinYearComponent,
    ProjectsComponent, ProjectMilestoneComponent, MilestoneTasksComponent, ProjectDocumentsComponent, BidQualifyComponent, HelpSupportComponent, DocumentationComponent, ProjReportsComponent, ResetPasswordComponent, ForgetPasswordComponent, DataCapturingComponent, CaptureDataListComponent,
    CompanyContactsComponent, SupplierComponent, TenderDocumentComponent, BgDocumentComponent, LcDocumentComponent, CommunicationDocumentComponent, OthersDocumentComponent, TechnicalBidComponent, FinancialBidComponent, BankingDetailsComponent, CountryMasterComponent, SupplierComponent, SupplierItemLinkComponent,
    AmendmentsComponent, InitialBoqComponent, L1ScheduleComponent, QualificationDocumentComponent, FinDocumentsComponent, TechDocumentsComponent, OtherDocumentsComponent, FinBalancesheetComponent, FinMaatComponent, FinLiquidAssetComponent, FinBankCertificateComponent,
    FinItrComponent, FinTenderFeesComponent, TechQualificationComponent, ProcurementDocumentComponent, ProjectDocumentComponent, FinanceDocumentComponent, ItemLabelComponent, InventoryComponent, BoqComponent, ProposalOneComponent, ProposalTwoComponent, FinalProposalComponent,
    ApprovalComponent, PoDataComponent, AuditRequestComponent, AuditApprovalComponent, MangagementTenderApprovalComponent, MaterialReceiptComponent, MaterialIssuanceComponent, BoqItemsComponent, SignInComponent, MasterDrawingListComponent, DrawingComponent, FinalBOQComponent, IndirectCostingComponent, SynopsisComponent,
    CompFinanceComponent, DirectCostingComponent, CostingApprovalComponent, TenderFinalApprovalComponent, UnderDevelopmentComponent,
    PreSalesFinalBOQComponent, PreSalesDrawingComponent, PreSalesMasterDrawingListComponent,FinalReportComponent, WonLossTenderComponent, LocationModalComponent, SliceWithTooltipComponent
  ],

  imports: [
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    ChartModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' },
    CurrencyPipe,
    DecimalPipe,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

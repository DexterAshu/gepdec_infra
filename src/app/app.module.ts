import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ElectricityBoardComponent } from './masters/electricity-board/electricity-board.component';
import { DistrictComponent } from './masters/district/district.component';
import { CircleComponent } from './masters/circle/circle.component';
import { CustomerComponent } from './masters/customer/customer.component';
import { MeterComponent } from './masters/meter/meter.component';
import { LoginComponent } from './account/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderInterceptor } from './_services/header.interceptor';
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
import { ResponsiveTableComponent } from './sharedComponent/responsive-table/responsive-table.component';
import { LineBreakPipe } from './_pipes/line-break.pipe';
import { SegmentComponent } from './masters/segment/segment.component';
import { BillLinesComponent } from './masters/bill-lines/bill-lines.component';
import { MeterPriceComponent } from './masters/meter-price/meter-price.component';

import { WordCapitalizeDirective } from './_directive/word-capitalize.directive';
import { AlphabetOnlyDirective } from './_directive/alphabet-only.directive';
import { NumberOnlyDirective } from './_directive/number-only.directive';
import { NoSpaceDirective } from './_directive/no-space.directive';
import { UpperCaseDirective } from './_directive/upper-case.directive';
import { NumWithDotDirective } from './_directive/num-with-dot.directive';
import { AlphaNumericDirective } from './_directive/alpha-numeric.directive';
import { CustomerDataUsageComponent } from './customer/customer-data-usage/customer-data-usage.component';
import { CustomerBillingDataComponent } from './customer/customer-billing-data/customer-billing-data.component';
import { AccountInfoComponent } from './customer/account-info/account-info.component';
import { ConsumptionCalculatorComponent } from './customer/consumption-calculator/consumption-calculator.component';
import { CustomerFaqComponent } from './customer/customer-faq/customer-faq.component';
import { NgxPrintModule } from 'ngx-print';
import { AlphaWithSpaceDirective } from './_directive/alpha-with-space.directive';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './_pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CompanyComponent,
    StateComponent,
    ElectricityBoardComponent,
    DistrictComponent,
    CircleComponent,
    CustomerComponent,
    MeterComponent,
    LoginComponent,
    UserLogsComponent,
    UserRolesComponent,
    Process1Component,
    Process2Component,
    Process3Component,
    Process4Component,
    MeterLinkComponent,
    BillDateConfigComponent,
    FirmwareUpgradeComponent,
    UserMasterComponent,
    Login4Component,
    ResponsiveTableComponent,
    LineBreakPipe,
    SegmentComponent,
    BillLinesComponent,
    MeterPriceComponent,
    WordCapitalizeDirective,
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    NoSpaceDirective,
    UpperCaseDirective,
    NumWithDotDirective,
    AlphaNumericDirective,
    CustomerDataUsageComponent,
    CustomerBillingDataComponent,
    AccountInfoComponent,
    ConsumptionCalculatorComponent,
    CustomerFaqComponent,
    AlphaWithSpaceDirective,
    FilterPipe,
    

  ],
  
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPrintModule,
  
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeaderInterceptor,
    //   multi: true
    // }
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

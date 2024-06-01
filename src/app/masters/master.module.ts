import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyCompanyComponent } from './my-company/my-company.component';
import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import { TenderMasterComponent } from './tender-master/tender-master.component';
import { ItemMasterComponent } from './procurement/item-master/item-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { SpareMasterComponent } from './spare-master/spare-master.component';
import { CompanyComponent } from './company/company.component';
import { DistrictComponent } from './district/district.component';
import { StateComponent } from './state/state.component';
import { TitleMasterComponent } from './title-master/title-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectMilestoneComponent } from './project-milestone/project-milestone.component';
import { MilestoneTasksComponent } from './milestone-tasks/milestone-tasks.component';
import { ProjectDocumentsComponent } from './project-documents/project-documents.component';
import { SupplierComponent } from './procurement/supplier/supplier.component';
import { FinYearComponent } from './fin-year/fin-year.component';
import { CompanyContactsComponent } from './company-contacts/company-contacts.component';
import { CountryMasterComponent } from './country-master/country-master.component';
import { SupplierItemLinkComponent } from './procurement/supplier-item-link/supplier-item-link.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { WarehouseMasterComponent } from './warehouse-master/warehouse-master.component';
import { ItemLabelComponent } from './item-label/item-label.component';
import { OurCompanyFinanaceDataComponent } from './our-company-finanace-data/our-company-finanace-data.component';
import { BomComponent } from './procurement/bom/bom.component';
import { CompFinanceComponent } from './comp-finance/comp-finance.component';

const routes: Routes = [
  { path: '', component: MyCompanyComponent },
  { path: 'tendering-company', component: CompanyComponent },
  { path: 'vendor', component: VendorMasterComponent },
  { path: 'tender', component: TenderMasterComponent },
  { path: 'finData', component: OurCompanyFinanaceDataComponent },
  { path: 'company-finance', component: CompFinanceComponent },
  { path: 'procurement/bom', component: BomComponent },
  { path: 'procurement/item', component: ItemMasterComponent },
  { path: 'procurement/vendor', component: SupplierComponent },
  { path: 'procurement/vendor-item-linking', component: SupplierItemLinkComponent },
  { path: 'department', component: DepartmentMasterComponent },
  { path: 'designation', component: DesignationMasterComponent },
  { path: 'spare', component: SpareMasterComponent },
  { path: 'country', component: CountryMasterComponent },
  { path: 'state', component: StateComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'title', component: TitleMasterComponent },
  { path: 'role', component: RoleMasterComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'proj-milestone', component: ProjectMilestoneComponent },
  { path: 'milestone-task', component: MilestoneTasksComponent },
  { path: 'project-doc', component: ProjectDocumentsComponent },
  { path: 'fin-year', component: FinYearComponent },
  { path: 'tender-company-contacts', component: CompanyContactsComponent },
  { path: 'warehouse', component: WarehouseMasterComponent },
  { path: 'items-master', component: ItemsMasterComponent },
  { path: 'items-location', component: ItemLabelComponent }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ ]
})
export class MasterModule { }

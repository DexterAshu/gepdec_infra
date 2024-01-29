import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyCompanyComponent } from './my-company/my-company.component';
import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import { TenderMasterComponent } from './tender-master/tender-master.component';
import { ItemMasterComponent } from './procurement/item-master/item-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { MachineMasterComponent } from './machine-master/machine-master.component';
import { MaterialMasterComponent } from './material-master/material-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { SpareMasterComponent } from './spare-master/spare-master.component';
import { BiderCompanyComponent } from './bider-company/bider-company.component';
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



const routes: Routes = [
  { path: '', component: MyCompanyComponent },
  { path: 'tendering-company', component: CompanyComponent },
  { path: 'vendor', component: VendorMasterComponent },
  { path: 'tender', component: TenderMasterComponent },
  { path: 'procurement/item', component: ItemMasterComponent },
  { path: 'procurement/supplier', component: SupplierComponent },
  { path: 'employee', component: EmployeeMasterComponent },
  { path: 'department', component: DepartmentMasterComponent },
  { path: 'machine', component: MachineMasterComponent },
  { path: 'material', component: MaterialMasterComponent },
  { path: 'designation', component: DesignationMasterComponent },
  { path: 'spare', component: SpareMasterComponent },
  { path: 'state', component: StateComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'bidder', component: BiderCompanyComponent },
  { path: 'title', component: TitleMasterComponent },
  { path: 'role', component: RoleMasterComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'proj-milestone', component: ProjectMilestoneComponent },
  { path: 'milestone-task', component: MilestoneTasksComponent },
  { path: 'project-doc', component: ProjectDocumentsComponent },
  
];


@NgModule({
  imports: [
    CommonModule,
    // Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
   
  ],
  declarations: [
    // MyCompanyComponent, VendorMasterComponent, TenderMasterComponent, ItemMasterComponent, EmployeeMasterComponent, DepartmentMasterComponent, MachineMasterComponent, MaterialMasterComponent, DesignationMasterComponent, SpareMasterComponent
    // ,TitleMasterComponent,RoleMasterComponent,ProjectsComponent,ProjectMilestoneComponent, MilestoneTasksComponent, ProjectDocumentsComponent,
  
    SupplierComponent
  ]
})
export class MasterModule { }

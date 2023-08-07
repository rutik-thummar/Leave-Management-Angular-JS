import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ChildHomeComponent } from './child-home/childhome.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LeaveReportComponent } from './leave-report/leavereport.component';
import { LeaveComponent } from './Leave/Leave.component';
import { PayslipComponent } from './payslip/payslip.component';


const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,

    children: [
      { path: 'home', component:ChildHomeComponent },
      { path: 'add', component:AddEmployeeComponent },
      { path: 'view', component:ViewEmployeeComponent },
      { path: 'update/:id', component: UpdateEmployeeComponent },
      { path: 'report', component: LeaveReportComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'paySlip', component: PayslipComponent },

      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
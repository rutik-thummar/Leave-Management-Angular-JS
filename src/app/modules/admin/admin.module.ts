import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LeaveReportComponent } from './leave-report/leavereport.component';
import { LeaveComponent } from './Leave/Leave.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { PayslipComponent } from './payslip/payslip.component';


@NgModule({
  declarations: [AdminHomeComponent, HeaderComponent, FooterComponent,AddEmployeeComponent,ViewEmployeeComponent,UpdateEmployeeComponent,
    LeaveReportComponent,LeaveComponent, PayslipComponent],
  imports: [
    CommonModule, AdminRoutingModule, FormsModule,ReactiveFormsModule,DataTablesModule,HttpClientModule,
  ]
})
export class AdminModule { }

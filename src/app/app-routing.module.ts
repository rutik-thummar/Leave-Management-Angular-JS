import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employeeRegister', component: EmployeeRegisterComponent },
  { path: 'adminRegister', component: AdminRegisterComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((u) => u.UserModule),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

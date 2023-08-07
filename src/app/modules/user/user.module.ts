import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './home/userhome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChildHomeComponent } from './child-home/childhome.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';
import { ProfileComponent } from './profile-view/profile.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [UserHomeComponent,HeaderComponent, FooterComponent,ChildHomeComponent,ViewLeaveComponent,ProfileComponent],
  imports: [
    CommonModule,UserRoutingModule,FormsModule, ReactiveFormsModule,DataTablesModule
  ]
})
export class UserModule { }
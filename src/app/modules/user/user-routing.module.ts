import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './home/userhome.component';
import { ChildHomeComponent } from './child-home/childhome.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';
import { ProfileComponent } from './profile-view/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      { path: 'home', component:ChildHomeComponent },
      { path: 'viewleave', component:ViewLeaveComponent },
      { path: 'profile', component:ProfileComponent },
      { path: '', redirectTo: '/user/home', pathMatch: 'full' },
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
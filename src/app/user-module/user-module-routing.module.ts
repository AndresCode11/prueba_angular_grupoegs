import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    component: MenuUserComponent,
    children: [
        {
          path: '',
          component: UserListComponent
        },
        {
          path: 'edit/:id',
          component: EditUserComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }

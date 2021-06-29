import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { ReactiveFormsModule,  FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UserListComponent,
    EditUserComponent,
    MenuUserComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    ReactiveFormsModule,  
    FormsModule
  ]
})
export class UserModuleModule { }

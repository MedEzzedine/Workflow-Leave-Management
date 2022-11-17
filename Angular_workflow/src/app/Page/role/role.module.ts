import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { AddRoleComponent } from './add-role/add-role.component';

import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class RoleModule { }

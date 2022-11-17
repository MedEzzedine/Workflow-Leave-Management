import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { AdduserComponent } from './adduser/adduser.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllUserComponent } from './all-user/all-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';



@NgModule({
  declarations: [ AdduserComponent, AllUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RxReactiveFormsModule
    
  ]
})
export class UserModule { }

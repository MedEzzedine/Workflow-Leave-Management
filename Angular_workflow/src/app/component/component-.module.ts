import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompeleteRegisterComponent } from './compelete-register/compelete-register.component';
import { FirstaccountComponent } from './firstaccount/firstaccount.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRoutingModule } from './component-routing.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [
    CompeleteRegisterComponent,
    FirstaccountComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    RxReactiveFormsModule
  ]
})
export class ComponentModule { }

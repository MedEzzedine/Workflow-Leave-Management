import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { AdddemandeComponent } from './add-demande/adddemande.component';
import { DetailDemandeComponent } from './detail-demande/detail-demande.component';
import { AlldemandeComponent } from './All-demande/alldemande.component';
import { DemandeRecuComponent } from './demande-recu/demande-recu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from 'shared/components/components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { DemandeFinalDecisionComponent } from './demande-final-decision/demande-final-decision.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators/';
@NgModule({
  declarations: [
    AdddemandeComponent,
    DetailDemandeComponent,
    AlldemandeComponent,
    DemandeRecuComponent,
    DemandeFinalDecisionComponent,
  ],
  imports: [
    CommonModule,
    DemandeRoutingModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    ComponentsModule,
    MatPaginatorModule,
    MatSliderModule,
    RxReactiveFormsModule
    

  ]
})
export class DemandeModule { }

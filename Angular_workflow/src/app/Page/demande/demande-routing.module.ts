import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlldemandeComponent} from './All-demande/alldemande.component'
import {AdddemandeComponent} from './add-demande/adddemande.component'
import {DemandeRecuComponent} from './demande-recu/demande-recu.component'
import {DetailDemandeComponent} from './detail-demande/detail-demande.component'
import { DemandeFinalDecisionComponent } from './demande-final-decision/demande-final-decision.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alldemande',
    pathMatch: 'full',
  },
    { path: 'adddemande',   component: AdddemandeComponent },
    { path: 'alldemande',   component: AlldemandeComponent },
    { path: 'detaildemande/:iddemande',  component: DetailDemandeComponent },
    { path: 'demanderecue',  component: DemandeRecuComponent },
    { path: 'demandefinaldesicion',  component: DemandeFinalDecisionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }

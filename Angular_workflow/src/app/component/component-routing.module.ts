import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompeleteRegisterComponent } from './compelete-register/compelete-register.component';
import { FirstaccountComponent } from './firstaccount/firstaccount.component';

const routes: Routes = [ {
  path: 'firstaccount',
  component: FirstaccountComponent,
  canActivate:[] 
  
},
{
  path: 'completeregister',
  component: CompeleteRegisterComponent,
  canActivate:[] 
  
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }

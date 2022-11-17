import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'shared/guard/login.guard';
import { AuthGuard } from 'shared/guard/auth.guard';
import { NotfoundComponent } from 'shared/components/notfound/notfound.component';
import { componentComponent } from './component/component-.component';
import { PageComponent } from './Page/Page.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[LoginGuard] 
    
  },
  {
    path: 'admin',
    component: PageComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./Page/Page.module').then(x=>x.PageModule),
      canActivate:[AuthGuard]
  }]},
  
  {
    path: 'page',
    component: componentComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./component/component-.module').then(x=>x.ComponentModule),
      canActivate:[AuthGuard]
  }]},
 
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

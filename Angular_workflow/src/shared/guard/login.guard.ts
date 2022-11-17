import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/service/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
 
  connect:Boolean=false
  constructor ( private authService :AuthService, private router:Router){
   this.Connected()

  }
  
  canActivate() {
    if (this.connect){
    
      this.router.navigateByUrl('admin/dashboard')
    }
    else
    {
      return true
      
    }
  }


  Connected=()=>{
    this.authService.isLoggedIn$.subscribe(data=>{
    this.connect=data
    })
  }
  
}

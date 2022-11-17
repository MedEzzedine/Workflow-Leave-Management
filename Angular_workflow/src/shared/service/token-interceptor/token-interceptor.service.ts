import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private authService: AuthService) {} 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
     const token = this.authService.getAuthToken();
 
    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Bearer ${token}`}
      });
   }
 
   return next.handle(request).pipe(
     catchError((err) => {
       if (err instanceof HttpErrorResponse) {
           if (err.status === 401) {
          this.authService.logout()     
        }
     }
     return throwError(err);
   })
    )
   }
 }
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, observable } from "rxjs";
import { tap } from "rxjs/operators";

import { LoginRequest } from "../../models/loginRequest";
import { LoginService } from "../loginService/login.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(
    private LoginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const token = localStorage.getItem("token");
    this._isLoggedIn$.next(!!token);
  }

  login(form: LoginRequest) {
    return this.LoginService.LoginApi(form).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem("token", response.token);
        if (response.user.firstlogin) {
          this.router.navigate(["/page/completeregister"]);
        } else if (response.user.firstaccount) {
          this.router.navigate(["/page/firstaccount"]);
        } else {
          this.router.navigate(["admin/dashboard"]);
        }
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getAuthToken(): string {
    return localStorage.getItem("token");
  }
}

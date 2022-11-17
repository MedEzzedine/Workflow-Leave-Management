import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../models/loginRequest";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { userModel } from "shared/models/userModels";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  Login_url = environment.url + "auth/";
  LoginApi(form: LoginRequest) {
    return this.http.post(this.Login_url + "authenticate", form);
  }

  getuser(): Observable<userModel> {
    return this.http.get<userModel>(this.Login_url + "getuser");
  }
}

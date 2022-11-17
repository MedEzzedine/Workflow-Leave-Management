import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Permissions } from "shared/models/Permissions";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  demande_url = environment.url + "permission/";

  getpermission(): Observable<Permissions[]> {
    return this.http.get<Permissions[]>(this.demande_url + "getall");
  }
}

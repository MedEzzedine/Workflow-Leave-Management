import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { role } from "shared/models/roleModel";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  demande_url = environment.url + "role/";

  addrole(form: role): Observable<role> {
    return this.http.post<role>(this.demande_url + "addrole", form);
  }

  getrole(): Observable<role[]> {
    return this.http.get<role[]>(this.demande_url + "allrole");
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Groupe } from "shared/models/groupeModel";

@Injectable({
  providedIn: "root",
})
export class GroupeService {
  constructor(private http: HttpClient) {}

  demande_url = environment.url + "groupe/";

  getgroupe(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(this.demande_url + "getall");
  }
}

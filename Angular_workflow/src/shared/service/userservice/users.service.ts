import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { userModel } from 'shared/models/userModels';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  demande_url=environment.url+'user/'


  firstuser(form:userModel) { 
    return this.http.post(this.demande_url+'firstuser', form);
  }
  updateuser(form:userModel):Observable<userModel > { 
    return this.http.post<userModel > (this.demande_url+'updateuser', form);
  }

  adduser(form:userModel) { 
    return this.http.post(this.demande_url+'adduser', form);
  }
  getalluser(o:any):Observable<userModel[] >{ 
    const params = new HttpParams()
    .set('page', o.page)
    .set('size', o.size)
    .set('search', o.search)
    return this.http.get<userModel[]>(this.demande_url+'getalluser', {params});
  }
}

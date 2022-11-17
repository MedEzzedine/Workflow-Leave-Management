import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { demandeModel } from 'shared/models/demandeModel';
import { demanderecuModel } from 'shared/models/demanderecu';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http:HttpClient) { }
  pdf_url=environment.url+'file/download/'
  demande_url=environment.url+'demande/'


  demandeApi(form:demandeModel) { 
    return this.http.post(this.demande_url+'adddemande', form);
  }




  getdemanderecu(): Observable<demanderecuModel> { 
    return this.http.get<demanderecuModel>(this.demande_url+'GetDemandeRecue');
  }

  getdemandehistory(): Observable<demanderecuModel> { 
    return this.http.get<demanderecuModel>(this.demande_url+'getalldemandehistory');
  }

  accept_refus_multidemande(demande:demandeModel[],choix:String,otherdemande): Observable<demandeModel[]> { 
    return this.http.post<demandeModel[]>(this.demande_url+'accept_refus_multidemande/'+choix+'/'+otherdemande,demande);
  }

  getdetaildemande(iddemande:number): Observable<demandeModel> { 
    return this.http.get<demandeModel>(this.demande_url+'getdemandedetail/'+iddemande);
  }

  getallldemande(o:any): Observable<demandeModel[]> { 
    const params = new HttpParams()
  .set('page', o.page)
  .set('size', o.size)
  .set('search', o.search)
    return this.http.get<demandeModel[]>(this.demande_url+'getdemande',{params});

  }

  
  getfinaldemande(): Observable<demandeModel[]> { 
    return this.http.get<demandeModel[]>(this.demande_url+'getfinaldemande');
  }
  refusfinal(demande:demandeModel): Observable<demandeModel> { 
    return this.http.put<demandeModel>(this.demande_url+'refusfinal',demande);
  }
  
}

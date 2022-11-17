import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  demande_url=environment.url+'file/'
  constructor(private http:HttpClient) { }


  uploadfile(formdata:FormData){ 
  //  const params = new HttpParams()
  //.set('files', o.files)
    return this.http.post(this.demande_url+'upload',formdata);

  }

}

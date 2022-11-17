import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { demandeModel } from 'shared/models/demandeModel';
import { userModel } from 'shared/models/userModels';
import { DemandeService } from 'shared/service/demandeService/demande.service';
import { LoginService } from 'shared/service/loginService/login.service';


@Component({
  selector: 'app-alldemande',
  templateUrl: './alldemande.component.html',
  styleUrls: ['./alldemande.component.css']
})
export class AlldemandeComponent implements OnInit {

  constructor(private demandeservice:DemandeService,private loginservice:LoginService) { }
user:userModel=new userModel()
 Mydemande:demandeModel[]
 loading=false
 key:string=""
 //totalElements: number = 0;
 pageSize=5
 page=1
 collectionSize:number
ngOnInit(): void {
this.getdemande({ page: 0, size: 5,search:this.key })
this.loginservice.getuser().subscribe(res=>this.user=res,er=>console.log(er))

}



private getdemande(request) {
  this.loading=true
  this.demandeservice.getallldemande(request)
  .subscribe(data => {
    console.log(data)
      this.Mydemande = data['content'];
      //this.totalElements = data['totalElements'];
      this.collectionSize=data['totalElements'];
    
  }
  , error => {
      console.log(error.error.message);
  },
  ()=>{
    this.loading=false
    console.log(this.Mydemande)
  }
  );
}

nextPage(event:any){
  const request = {};
  request['page'] = event-1
  request['size'] = this.pageSize
  request['search']=this.key
  console.log(request)
  this.getdemande(request);
}

seepdf(id){
  window.open("http://localhost:4200/api/file/download/"+id+".pdf")
}


search(event){
  this.key=event
  const request = {};
  request['page'] = 0
  request['size'] = this.pageSize
  this.page=0
  request['search']=this.key
  console.log(request)
  this.getdemande(request);

}

}

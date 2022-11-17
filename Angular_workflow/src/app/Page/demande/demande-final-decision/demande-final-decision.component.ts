


import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { demandeModel } from 'shared/models/demandeModel';
import { DemandeService } from 'shared/service/demandeService/demande.service';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';
@Component({
  selector: 'app-demande-final-decision',
  templateUrl: './demande-final-decision.component.html',
  styleUrls: ['./demande-final-decision.component.css']
})
export class DemandeFinalDecisionComponent implements OnInit  {
finaldemande:demandeModel[]=[]
MyselectedIndex: number;
Myshowdetail_demande=false
Mydetail_demande:demandeModel;
showpdf:boolean=false
currentdemande:demandeModel
a
 constructor(private demandeservice:DemandeService,private element : ElementRef,private toastr:myoastrService) {
   
   }

  ngOnInit(): void {
    this.getfinaldemande()
   // this.demandeservice.getpdf("1814312.jpg").subscribe(x=>{
   //   console.log(x)
   // }
    //)
    
  }

  getfinaldemande(){
  this.demandeservice.getfinaldemande().subscribe(
    x=>this.finaldemande=x,
    e=>console.log(e)
  )
  }

  public MysetRow(_index: number,demande:demandeModel) {
//window.open(this.demandeservice.pdf_url+"1814312.jpg")
  
    if(this.MyselectedIndex==_index)
    {
    this.Myshowdetail_demande=false
    this.MyselectedIndex=null}
    else{
      this.MyselectedIndex = _index;
      this.Mydetail_demande=demande
      this.Myshowdetail_demande=true
  
    }
  }


click(data){
  if(data['decision']){
this.showpdf=true
this.currentdemande=data['demande']

  }
  else{
console.log(data['demande'])
this.demandeservice.refusfinal(data['demande']).subscribe(
  x=>console.log(x),
  e=>console.log(e),
()=>{
  this.toastr.showNotification("top","right",4,"success","",".......")
  this.Myshowdetail_demande=false
  this.getfinaldemande()
}
)
  }

}

closepdf(){
  console.log("close")
  this.showpdf=false
  this.MyselectedIndex=null
  this.Myshowdetail_demande=false 
  this.getfinaldemande()
  this.toastr.showNotification("top","right",1,"success","",".......")

  
}

}

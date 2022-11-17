import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { demandeModel } from 'shared/models/demandeModel';
import { demanderecuModel } from 'shared/models/demanderecu';
import { userModel } from 'shared/models/userModels';
import { DemandeService } from 'shared/service/demandeService/demande.service';
import { LoginService } from 'shared/service/loginService/login.service';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';

@Component({
  selector: 'app-demande-recu',
  templateUrl: './demande-recu.component.html',
  styleUrls: ['./demande-recu.component.css']
})
export class DemandeRecuComponent implements OnInit {
  

  
  MyselectedIndex: number;
  OtherselectedIndex: number;
  get_new_demande:boolean=false
  Mydetail_demande:demandeModel
  Otherdetail_demande:demandeModel
  Myshowdetail_demande:boolean=false
  Othershowdetail_demande:boolean=false
  first_carousel_page:boolean=false
  otherdemande_carousel:boolean=false
  Mydemande:demandeModel[]
  otherdemande:demandeModel[]
  MydemandeHistory:demandeModel[]
  OtherdemandeHistory:demandeModel[]
  loadingtask=false
  loadingtaskhistory=false
  demandeaaccepter:demandeModel[]=[]
  demandearefuser:demandeModel[]=[]
  otherdemandeaaccepter:demandeModel[]=[]
  otherdemandearefuser:demandeModel[]=[]
  user:userModel=new userModel()
  canceldisable=true
  saveloading=false
  constructor(private demandeservice:DemandeService,private loginservice:LoginService,private toastr:myoastrService) { }
 ngOnInit(): void {

  
this.loginservice.getuser().subscribe(res=>{this.user=res,
  console.log(res)
  if(res.roles[0].niveau==1) this.otherdemande_carousel=true
})
this.getdemanderecu(false)
this.getdemandehistory()
 }

 drop(event: CdkDragDrop<demandeModel[]>) {
  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
    
  );
  console.log(event);
  this.canceldisable=false
}


getdemanderecu(toast:boolean){
  this.loadingtask=true
  this.demandeservice.getdemanderecu().subscribe(
    value=> {
      this.Mydemande=value.demande_enattente,
      this.otherdemande=value.demande_nonarrive,
      console.log(value)
    },
    error=>console.log(error),
    ()=>{
      
      if (toast)
      this.toastr.showNotification("top","right",1,"success","",".......")
      this.loadingtask=false, console.log(this.Mydemande)}
  )
}

getdemandehistory(){
  this.loadingtaskhistory=true
  this.demandeservice.getdemandehistory().subscribe(
  value=>{
    console.log(value),
    this.MydemandeHistory=value.demande_enattente 
    this.OtherdemandeHistory=value.demande_nonarrive 
  },
  error=>console.log(error),
  ()=> {
  this.loadingtaskhistory=false,console.log(this.loadingtaskhistory)
    }
   )
}

send(){
if ((this.demandeaaccepter.length>0  && this.demandearefuser.length==0)||(this.otherdemandeaaccepter.length>0  && this.otherdemandearefuser.length==0))
this.acceptall()
if ((this.demandearefuser.length>0 && this.demandeaaccepter.length==0)||(this.otherdemandearefuser.length>0 && this.otherdemandeaaccepter.length==0))
this.refusedall()
if ((this.demandeaaccepter.length>0 && this.demandearefuser.length>0)||(this.otherdemandeaaccepter.length>0 && this.otherdemandearefuser.length>0))
this.acceptetrefus()
this.canceldisable=true

  }



cancel(){
  this.demandeaaccepter=[]
  this.demandearefuser=[]
  this.otherdemandeaaccepter=[]
  this.otherdemandearefuser=[]
  
  
  this.getdemanderecu(true)
  this.canceldisable=true
}

acceptall(){

  if(!this.first_carousel_page) this.acceptall_mydemande()
  else
  this.acceptall_otherdemande()
  

 }

 refusedall(){

  if(!this.first_carousel_page) this.refusall_mydemande()
  else
  this.refusall_otherdemande()

 }


 acceptetrefus(){
  
  if(!this.first_carousel_page) this.acceptetrefus_mydemande()
  else
  this.accetrefus_otherdemande()

 }
  
  carousel(){
  this.first_carousel_page=!this.first_carousel_page
  if( this.get_new_demande){
    this.getdemanderecu(false)
    this.get_new_demande=false
  }
  console.log(this.OtherdemandeHistory)
  }

  acceptall_mydemande(){
    this.saveloading=true
      this.demandeservice.accept_refus_multidemande(this.demandeaaccepter,"true","false").subscribe(
        ()=> {
          this.demandeaaccepter=[]
          this.demandearefuser=[]
            this.otherdemandeaaccepter=[]
          this.otherdemandearefuser=[]
        },
        (error)=>console.log(error),
        ()=>{
        this.toastr.showNotification("top","right",2,"success ","","......."),
        this.saveloading=false,
        this.getdemandehistory()
        }
    )
    
  }

  acceptall_otherdemande(){
    this.saveloading=true
      this.demandeservice.accept_refus_multidemande(this.otherdemandeaaccepter,"true","true").subscribe(
        ()=> {
          this.demandeaaccepter=[]
          this.demandearefuser=[]
          this.otherdemandeaaccepter=[]
          this.otherdemandearefuser=[]
          this.get_new_demande=true
        },
        (error)=>console.log(error),
        ()=>{
        this.toastr.showNotification("top","right",2,"success ","","......."),
        this.saveloading=false
        this.getdemandehistory()
        }
    )
    
  }


  refusall_mydemande(){
    this.saveloading=true
    this.demandeservice.accept_refus_multidemande(this.demandearefuser,"false","false").subscribe(
        (next)=>{
          this.demandeaaccepter=[]
          this.demandearefuser=[]
          this.otherdemandeaaccepter=[]
          this.otherdemandearefuser=[]
        },
        (error)=>console.log(error),
        ()=>{
          this.toastr.showNotification("top","right",4,"success ","","......."),
          this.saveloading=false,
          this.getdemandehistory()
          }
    )
    
     }
     refusall_otherdemande(){
      this.saveloading=true
      this.demandeservice.accept_refus_multidemande(this.otherdemandearefuser,"false","true").subscribe(
          (next)=>{
            this.demandeaaccepter=[]
            this.demandearefuser=[]
            this.otherdemandeaaccepter=[]
            this.otherdemandearefuser=[]
            this.get_new_demande=true
          },
          (error)=>console.log(error),
          ()=>{
          
            this.toastr.showNotification("top","right",4,"success ","","......."),
            this.saveloading=false,
            this.getdemandehistory()
            }
      )
      
       }


       acceptetrefus_mydemande(){
  
        this.saveloading=true
        this.demandeservice.accept_refus_multidemande(this.demandeaaccepter,"true","false").subscribe()
        this.demandeservice.accept_refus_multidemande(this.demandearefuser,"false","false").subscribe(
          (value)=>{
            this.demandeaaccepter=[]
            this.demandearefuser=[]
            this.otherdemandeaaccepter=[]
            this.otherdemandearefuser=[]
          },
          (error)=>{console.log(error)
          },
          ()=>{
            
            this.toastr.showNotification("top","right",3,"success ","","......."),
            this.saveloading=false;
            this.getdemandehistory()
          }
        )
        }
        accetrefus_otherdemande(){
  
          this.saveloading=true
          this.demandeservice.accept_refus_multidemande(this.otherdemandeaaccepter,"true","true").subscribe()
          this.demandeservice.accept_refus_multidemande(this.otherdemandearefuser,"false","true").subscribe(
            (value)=>{
              this.demandeaaccepter=[]
              this.demandearefuser=[]
              this.otherdemandeaaccepter=[]
              this.otherdemandearefuser=[]
              this.get_new_demande=true
            },
            (error)=>{console.log(error)
            },
            ()=>{
              this.toastr.showNotification("top","right",3,"success ","","......."),
              this.saveloading=false,
              this.getdemandehistory()
            }
          )
          }




public MysetRow(_index: number,demande:demandeModel) {

  
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

public OthersetRow(_index: number,demande:demandeModel) {

  
  if(this.OtherselectedIndex==_index)
  {
  this.Othershowdetail_demande=false
  this.OtherselectedIndex=null}
  else{
    this.OtherselectedIndex = _index;
    this.Otherdetail_demande=demande
    this.Othershowdetail_demande=true

  }
}
}



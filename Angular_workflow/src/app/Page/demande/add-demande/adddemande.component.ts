import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { date, RxwebValidators } from '@rxweb/reactive-form-validators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { userModel } from 'shared/models/userModels';
import { DemandeService } from 'shared/service/demandeService/demande.service';
import { LoginService } from 'shared/service/loginService/login.service';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './adddemande.component.html',
  styleUrls: ['./adddemande.component.css']
})
export class AdddemandeComponent implements OnInit {
  loading=false
  initloading=false
  //RxwebValidators.minDate({value:this.datePipe.transform(new Date(),"yyyy-MM-dd") }) 
  demandeForm=new FormGroup({
    dateDebut: new FormControl(null, Validators.required ),
    dateFin: new FormControl(null, Validators.required),
    typeConge: new FormControl(null, Validators.required),
    duree: new FormControl(null, Validators.required),
    justification: new FormControl(null, Validators.required),
    
    traitement1:new FormGroup({
    etats: new FormControl("encours"),
    by: new FormControl()
    }),
    traitement2:new FormGroup({
    etats: new FormControl(),
    by: new FormControl()
    }),
    decision:new FormControl()

})

user:userModel=new userModel()

  constructor(private demandeService:DemandeService,private toastr:myoastrService,private router :Router,private loginservice:LoginService
    ,private datePipe: DatePipe) { }

  ngOnInit() {
    this.initloading=true
 
    this.loginservice.getuser().subscribe(res=>this.user=res,er=>console.log(er),
    ()=>{
      this.initloading=false
   if(this.user.roles[0].niveau==1){
    this.demandeForm.get('traitement1').patchValue({etats:null})
    this.demandeForm.get('traitement2').patchValue({etats:"encours"})
    
   }
    }
    )
  }

  // pdf(){
  //   console.log(this.demandeForm.value)
  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdfMake.createPdf(documentDefinition).open();
  // }

send()
{
if (this.demandeForm.invalid) return 

this.loading=true
this.demandeService.demandeApi(this.demandeForm.value).subscribe({
  next: () =>  this.router.navigate(['admin/demande/alldemande']),
  complete: () => {this.toastr.showNotification("top","right",2,"demande ajouté","avec succès","......."),
  this.demandeForm.reset(),
  this.loading=false}
  
});

}



Dateevent(){
  var date1=new Date(this.demandeForm.controls['dateDebut'].value)
  var date2=new Date(this.demandeForm.controls['dateFin'].value)
  if(this.demandeForm.controls['dateDebut'].value!=null && this.demandeForm.controls['dateFin'].value!=null){
  var Diff_temps = date2.getTime() - date1.getTime(); 
  var Diff_jours = (Diff_temps / (1000 * 3600 * 24)); 
  if(Math.round(Diff_jours)<0){
    this.demandeForm.patchValue({dateDebut:null,dateFin:null})
    this.toastr.showNotification("top","right",4,"verifier ","Date",".......")
    this.demandeForm.patchValue({duree:null})
  
  }else
  {  
    this.demandeForm.patchValue({duree:Math.round(Diff_jours+1)})
  }
  if(Math.round(Diff_jours)==0) {
   
  } 
  
  console.log(this.demandeForm.controls['dateDebut'])
console.log(this.demandeForm.controls['dateDebut'].value)
}
}




}




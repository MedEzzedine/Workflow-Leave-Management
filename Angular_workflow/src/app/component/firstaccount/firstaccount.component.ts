import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';
import { UsersService } from 'shared/service/userservice/users.service';

@Component({
  selector: 'app-firstaccount',
  templateUrl: './firstaccount.component.html',
  styleUrls: ['./firstaccount.component.css']
})
export class FirstaccountComponent implements OnInit {

Submit_loader=false
  firstaccount=new FormGroup({
    email: new FormControl(null, Validators.compose([RxwebValidators.email(),Validators.required])),
    password: new FormControl(null, Validators.required),
    firstlogin: new FormControl(true, Validators.required),
  
})

  constructor(private userservice:UsersService,private toastr:myoastrService,private router:Router) { }

  ngOnInit(): void {

  }

  send(){
    this.Submit_loader=true
    this.userservice.firstuser(this.firstaccount.value).subscribe( (x)=>{
      this.router.navigate(['admin/dashboard']),
      console.log(x)},
    (e)=>console.log(e),

    ()=>{
      this.toastr.showNotification("top","right",2,"welcome to","workflow",".......")
       this.Submit_loader=false
        })
    
    
  }

}

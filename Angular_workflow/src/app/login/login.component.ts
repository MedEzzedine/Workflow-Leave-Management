import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/service/authService/auth.service';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loading=false
    loginForm=new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
    })

    data : Date = new Date();
    focus;
    focus1;

    

    constructor(private authService: AuthService, private router: Router,private toastr:myoastrService) { }


    login() {
        if (this.loginForm.invalid) {
        return;
        }
        this.loading=true
        this.authService
        .login(this.loginForm.value)
        .subscribe(
          x=>console.log(x),
          e=> {this.toastr.showNotification("top","right",4,"error:",e.error.message,"......."),
          this.loading=false
          },
          ()=>{
            this.toastr.showNotification("top","right",2,"login","success","......."),
            this.loading=false
          })
   




    
      }





      ngOnInit() {
    //     var body = document.getElementsByTagName('body')[0];
    //     body.classList.add('login-page');

    //     var navbar = document.getElementsByTagName('nav')[0];
    //     navbar.classList.add('navbar-transparent');
   
    }
    ngOnDestroy(){
        // var body = document.getElementsByTagName('body')[0];
        // body.classList.remove('login-page');

        // var navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.remove('navbar-transparent');
    }


}

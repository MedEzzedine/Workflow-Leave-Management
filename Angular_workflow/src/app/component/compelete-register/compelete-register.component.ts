import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { userModel } from "shared/models/userModels";
import { AuthService } from "shared/service/authService/auth.service";
import { LoginService } from "shared/service/loginService/login.service";
import { myoastrService } from "shared/service/toastr/mytoastr.service";
import { UsersService } from "shared/service/userservice/users.service";
import { LoginRequest } from "../../../shared/models/loginRequest";

@Component({
  selector: "app-compelete-register",
  templateUrl: "./compelete-register.component.html",
  styleUrls: ["./compelete-register.component.css"],
})
export class CompeleteRegisterComponent implements OnInit {
  show_initial_Loader = false;
  Submit_loader = false;
  Email_disable = true;

  completeRegister = new FormGroup({
    id: new FormControl(null, Validators.required),
    nom: new FormControl(null, Validators.required),
    prenom: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(
      null,
      Validators.compose([RxwebValidators.email(), Validators.required])
    ),
    datenaissance: new FormControl(null, Validators.required),
    adresse: new FormControl(null, Validators.required),
    firstlogin: new FormControl(false, Validators.required),
  });

  user: userModel = new userModel();
  constructor(
    private loginservice: LoginService,
    private userservice: UsersService,
    private toastr: myoastrService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.show_initial_Loader = true;
    this.loginservice.getuser().subscribe(
      (value) => {
        this.user = value;
        this.completeRegister.patchValue({ id: value.id, email: value.email });
        if (value.roles[0].niveau == 3) {
          this.Email_disable = false;
          this.completeRegister.patchValue({ email: null });
        }
      },
      (e) => console.log("a"),
      () => {
        console.log(this.user);
        this.show_initial_Loader = false;
      }
    );
  }

  send() {
    this.Submit_loader = true;
    const a = new LoginRequest();
    console.log();

    a.email = this.completeRegister.controls["email"].value;
    a.password = this.completeRegister.controls["password"].value;
    this.userservice.updateuser(this.completeRegister.value).subscribe(
      (x) => {
        localStorage.removeItem("token");
        console.log(x);
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log(a);

        this.authservice.login(a).subscribe(
          (x) => console.log(x),
          (e) => console.log(e)
        );
        this.Submit_loader = false;
      }
    );
  }
}

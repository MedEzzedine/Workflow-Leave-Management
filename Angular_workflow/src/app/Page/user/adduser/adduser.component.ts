import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { role } from "shared/models/roleModel";
import { RoleService } from "shared/service/role_service/role.service";
import { myoastrService } from "shared/service/toastr/mytoastr.service";
import { UsersService } from "shared/service/userservice/users.service";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"],
})
export class AdduserComponent implements OnInit {
  Listrole: role[] = [];
  roleselected: role;
  showdetail: boolean;
  show_initialLoader: boolean;
  show_submitLoader: boolean;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  userFom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private roleservice: RoleService,
    private userservice: UsersService,
    private toastr: myoastrService
  ) {}

  ngOnInit() {
    this.show_initialLoader = true;
    this.userFom = this.fb.group({
      email: [
        "",
        Validators.compose([RxwebValidators.email(), Validators.required]),
      ],
      password: ["", Validators.required],
      firstlogin: [true],
      roles: this.fb.array([
        this.fb.group({
          id: [Validators.required],
        }),
      ]),
    });
    this.roleservice.getrole().subscribe(
      (x) => (this.Listrole = x),
      (e) => console.log(e),
      () => {
        (this.show_initialLoader = false), console.log(this.Listrole);
      }
    );
  }

  get roles() {
    return this.userFom.controls["roles"] as FormArray;
  }

  send() {
    this.userservice.adduser(this.userFom.value).subscribe(
      (x) => {
        this.userFom.reset(), (this.showdetail = false);
      },
      (e) => console.log(e),
      () => {
        this.show_submitLoader = false;
        this.toastr.showNotification(
          "top",
          "right",
          2,
          "success",
          "workflow",
          "......."
        );
      }
    );
  }

  onChange(role) {
    this.roleselected = this.Listrole.filter((x) => x.id == role)[0];
    this.showdetail = true;
  }
}

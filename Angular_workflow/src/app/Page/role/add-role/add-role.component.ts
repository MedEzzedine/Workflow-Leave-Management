import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Groupe } from "shared/models/groupeModel";
import { GroupeService } from "shared/service/groupe_service/groupe.service";
import { PermissionService } from "shared/service/permission_service/permission.service";
import { RoleService } from "shared/service/role_service/role.service";
import { myoastrService } from "shared/service/toastr/mytoastr.service";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  show_initialLoader: boolean;
  show_submitLoader: boolean;
  dropdownSettings: IDropdownSettings = {};
  roleForm: FormGroup;
  groupForm: FormGroup;
  newGroupe: boolean;
  Listgroupe: Groupe[] = [];
  constructor(
    private fb: FormBuilder,
    private permissionservice: PermissionService,
    private groupeservice: GroupeService,
    private roleservice: RoleService,
    private router: Router,
    private toastr: myoastrService
  ) {}

  ngOnInit() {
    this.show_initialLoader = true;
    this.dropdownSettings = {
      idField: "id",
      textField: "nom",
    };
    this.roleForm = this.fb.group({
      nom: ["", Validators.required],
      niveau: ["0", Validators.compose([Validators.max(2), Validators.min(0)])],
      permissions: [null],
      groupe: this.fb.group({
        id: [],
        nom: [],
      }),
    });
    this.groupeservice.getgroupe().subscribe((x) => (this.Listgroupe = x));
    this.getpermission();
  }

  // onItemSelect(item: any) {
  //     console.log('onItemSelect', item);
  // }
  get groupe() {
    return this.roleForm.controls["groupe"] as FormGroup;
  }

  send() {
    this.show_submitLoader = true;
    this.roleservice.addrole(this.roleForm.value).subscribe(
      () => this.router.navigate(["/admin/users/adduser"]),
      (e) => console.log(e),
      () => {
        (this.show_submitLoader = false),
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

  deleteLesson() {
    this.newGroupe = false;
    this.groupe.reset();
  }

  newgroupe() {
    this.newGroupe = true;
    this.groupe.reset();
  }

  getpermission() {
    this.permissionservice.getpermission().subscribe(
      (x) => (this.dropdownList = x),
      (e) => console.log(e),
      () => {
        if (this.roleForm.controls["niveau"].value < 1) {
          this.dropdownList = this.dropdownList.filter(
            (x) => x.nom != "A/R_conge"
          );
          this.show_initialLoader = false;
        }
      }
    );
  }

  saverange() {
    console.log(this.roleForm);
    console.log(this.roleForm.invalid);
    if (this.roleForm.controls["niveau"].value < 1) {
      this.dropdownList = this.dropdownList.filter((x) => x.nom != "A/R_conge");
      this.roleForm.patchValue({
        permissions: this.roleForm.controls["permissions"].value.filter(
          (x) => x.nom != "A/R_conge"
        ),
      });
    } else {
      this.getpermission();
    }
  }
}

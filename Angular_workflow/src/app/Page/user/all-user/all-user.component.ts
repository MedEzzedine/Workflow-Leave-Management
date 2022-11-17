import { Component, OnInit } from "@angular/core";
import { userModel } from "shared/models/userModels";
import { UsersService } from "shared/service/userservice/users.service";

@Component({
  selector: "app-all-user",
  templateUrl: "./all-user.component.html",
  styleUrls: ["./all-user.component.css"],
})
export class AllUserComponent implements OnInit {
  loading: boolean = false;
  constructor(private userservice: UsersService) {}
  myusers: userModel[];
  key: string = "";
  page = 1;
  pageSize = 5;
  collectionSize;
  ngOnInit(): void {
    this.getalluser({ page: 0, size: 5, search: this.key });
  }

  private getalluser(request) {
    this.loading = true;
    this.userservice.getalluser(request).subscribe(
      (data) => {
        console.log(data);
        this.myusers = data["content"];
        //this.totalElements = data['totalElements'];
        this.collectionSize = data["totalElements"];
      },
      (error) => {
        console.log(error.error.message);
      },
      () => {
        this.loading = false;
      }
    );
  }

  nextPage(event: any) {
    const request = {};
    request["page"] = event - 1;
    request["size"] = this.pageSize;
    request["search"] = this.key;
    console.log(request);
    this.getalluser(request);
  }

  search(event: any) {
    this.key = event;
    const request = {};
    request["page"] = 0;
    request["size"] = 5;
    this.page = 1;
    request["search"] = this.key;
    console.log(request);
    this.getalluser(request);
  }
}

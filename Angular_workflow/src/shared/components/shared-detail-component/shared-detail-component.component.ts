import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { demandeModel } from "shared/models/demandeModel";

@Component({
  selector: "app-shared-detail-component",
  templateUrl: "./shared-detail-component.component.html",
  styleUrls: ["./shared-detail-component.component.css"],
})
export class SharedDetailComponentComponent implements OnInit {
  initloading: boolean = false;

  constructor() {}
  @Input() demande: demandeModel;
  @Input() aaceptrefus: boolean = false;
  @Output() notif: EventEmitter<object> = new EventEmitter();
  ngOnInit(): void {
    console.log(this.demande);
  }

  decision(decision: object) {
    var response = {};
    response["decision"] = decision;
    response["demande"] = this.demande;
    this.notif.emit(response);
  }
}

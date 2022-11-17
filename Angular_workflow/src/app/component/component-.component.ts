import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/service/authService/auth.service';

@Component({
  selector: 'app-page',
  templateUrl: './component-.component.html',
  styleUrls: ['./component-.component.css']
})
export class componentComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }
logout(){
  this.authservice.logout()
}
}

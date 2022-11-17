import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from 'shared/service/demandeService/demande.service';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.css']
})
export class DetailDemandeComponent implements OnInit {

  constructor(private ActivatedRoute :ActivatedRoute,private demandeservice:DemandeService) { }

  ngOnInit(): void {
    let u =this.ActivatedRoute.snapshot.params['iddemande'];
    this.demandeservice.getdetaildemande(u).subscribe(x=>console.log(x))
  }

}

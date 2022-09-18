import { Component, OnInit, HostBinding } from '@angular/core';
import { Platoi } from '../../modelos/platoi';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {
  @HostBinding('attr-class') cssClass = 'row';

  plato: Platoi = {
     id: 0,
    title: "",
    image: "",
    readyInMinutes: 0,
    healthScore: 0,
    pricePerServing: 0,
    summary:"",
    vegan: false};
 

  constructor(private api: ApiService, private router: Router) { 
    this.api.getPlato(716429).subscribe(data => {
      this.plato = data;
      console.log(data);
    });
  }

  ngOnInit(): void {

  }

}

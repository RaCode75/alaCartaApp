import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { PlatosService } from 'src/app/servicios/platos.service';
import { Platoi } from '../../modelos/platoi';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {
  @HostBinding('attr-class') cssClass = 'row';
  @Input()plato: Platoi = {}
  detalles: boolean = false;
 
    constructor(private api: ApiService,
       private plserv: PlatosService,
       private router: Router){}

  ngOnInit(){ 
    if(this.plato.healthScore && this.plato.pricePerServing && this.plato.readyInMinutes){
      this.detalles = !this.detalles;
      return;
    } 
    else if(this.plato.id){
    this.api.getPlato(this.plato.id).subscribe(data =>{
      this.plato.healthScore = data.healthScore,
      this.plato.pricePerServing = data.pricePerServing,
      this.plato.readyInMinutes = data.readyInMinutes,
      this.plato.vegan = data.vegan
    })
  }
    this.detalles = !this.detalles;

  }

  verDetalles(){    

  }

  addPlato(){
    this.plserv.setPlatoUno(this.plato);
    console.log(this.plato);
    this.router.navigateByUrl('home')

  }
}



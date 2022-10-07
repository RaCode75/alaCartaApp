import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { PlatosService } from 'src/app/servicios/menu.service';
import { Platoi, Etiqueta } from '../../modelos/platoi';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {
  @HostBinding('attr-class') cssClass = 'row';
  @Input()plato: Platoi = {}
  empty: Etiqueta = {title: "Agrega un plato al menu!"};
  detalles: boolean = false;
 
    constructor(private api: ApiService,
       private plserv: PlatosService,
       private router: Router){}

  ngOnInit(){ 
    if(this.plato.healthScore && this.plato.pricePerServing && this.plato.readyInMinutes){
      return;
    } 
    else if(this.plato.id){
      this.api.getPlato(this.plato.id).subscribe(data =>{
        this.plato.healthScore = data.healthScore,
        this.plato.pricePerServing = data.pricePerServing,
        this.plato.readyInMinutes = data.readyInMinutes,
        this.plato.vegan = data.vegan
    })
  } else if(!this.plato){
      this.plato = this.empty;
  }
    

  }

  verDetalles(){
       
    this.detalles = !this.detalles;
  }

  addPlatoMenu(){
    if(this.router.url === '/search'){
      this.plserv.addPlato(this.plato);
      this.router.navigateByUrl('home')
  }
   return;

  }
  quitarPlatoMenu(){
    if(this.router.url === '/home'){
    this.plserv.quitarPlato(this.plato);
    }
  }
}



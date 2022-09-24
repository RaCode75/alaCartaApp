import { Component, OnInit, HostBinding, Input } from '@angular/core';
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
 
    constructor(){
     
    }

  ngOnInit(){ 

  }

  verDetalles(){
    this.detalles = !this.detalles;
  }
}



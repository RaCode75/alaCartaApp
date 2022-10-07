import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platoi } from '../modelos/platoi';


@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private menuList$ = new BehaviorSubject<Platoi[]>([]);
  menuListAction$ = this.menuList$.asObservable();

  
  
//variables
  plato: Platoi = {};
  menu:Platoi[] = [];
  maxPlatos: number = 4;
  totalPlatos: number = 0;
  veganRequired: number = 2;
  totalVegan: number = 0;
  tiempoTotal: number = 0;
  tiempoPromedio: number = 0;
  precioTotal: number = 0;
  

  constructor() {
    let menuStorage = localStorage.getItem('menu');
    if(menuStorage){
      this.menuList$.next(JSON.parse(menuStorage));
    }
   }

setMenu( menu: Platoi[]): void {
  this.menuList$.next([...menu]);
  localStorage.setItem('menu', JSON.stringify(menu));
  console.log(menu);
}

addPlato(plato: Platoi): void {
  if(this.menu.length < this.maxPlatos ){
  this.menu.push(plato);
   //actualizar menu
  this.menuList$.next([...this.menu])  
  this.setMenu(this.menu);
  return
  }
}

quitarPlato(plato: Platoi): void {
  let index:number = this.menu.indexOf(plato);
  this.menu.splice(index, index+1);
  this.setMenu(this.menu);
}

detalles(menu: Platoi[]){
  if(menu.length != 0){
  menu.forEach(plato => {         
      this.precioTotal += plato.pricePerServing || 0;
      this.tiempoTotal += plato.readyInMinutes || 0;
      console.log(this.precioTotal + " " + this.tiempoTotal);
      
    })
  }
}


}

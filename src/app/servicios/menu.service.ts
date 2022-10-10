import { Injectable } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platoi } from '../modelos/platoi';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuList$ = new BehaviorSubject<Platoi[]>([]);
  menuListAction$ = this.menuList$.asObservable();
  private detalles$ = new BehaviorSubject<{}>({});
  detallesAction$ = this.detalles$.asObservable();

  
  
//variables ******************************************************************
  plato: Platoi = {};
  menu:Platoi[] = [];
  detalles:{} = {};
  maxPlatos: number = 4;
  totalPlatos: number = 0;
  veganRequired: number = 2;
  totalVegan: number = 0;
  

  constructor() {
    let menuStorage = localStorage.getItem('menu');
      if(menuStorage){
        this.menuList$.next(JSON.parse(menuStorage));
        if(this.menu.length == 0){
          this.menu = JSON.parse(menuStorage)
          this.setDetalles(this.menu);
          this.checkVegan(this.menu);      
        }
        }
      }
   

setMenu( menu: Platoi[]): void {
  this.menuList$.next([...menu]);
  this.detalles$.next(this.detalles);
  console.log(this.detalles$)
  localStorage.setItem('menu', JSON.stringify(menu));
}

addPlato(plato: Platoi): void {
  if(this.menu.length < this.maxPlatos/2){
  this.menu.push(plato);
   //actualizar menu
  this.setMenu(this.menu);
  this.setDetalles(this.menu);
  this.checkVegan(this.menu);  
  } else if(this.menu.length == this.maxPlatos/2 && this.totalVegan < this.maxPlatos/2){
      if(!this.plato.vegan){}
      else {
        this.menu.push(plato);
        this.setMenu(this.menu);
        this.setDetalles(this.menu);
        this.checkVegan(this.menu); 
      }
  }else if(this.totalVegan == this.veganRequired && this.menu.length < this.maxPlatos){
      if(this.plato.vegan){}
      else{
        this.menu.push(plato);
        this.setMenu(this.menu);
        this.setDetalles(this.menu);
        this.checkVegan(this.menu);
      }
  }else {
    this.menu.push(plato);
    this.setMenu(this.menu);
    this.setDetalles(this.menu);
    this.checkVegan(this.menu);
  }
}

quitarPlato(plato: Platoi): void {
  let index:number = this.menu.indexOf(plato);
  this.menu.splice(index, index+1);
  //actualizar menu
  this.setMenu(this.menu);
  this.checkVegan(this.menu);
  this.setDetalles(this.menu);
}

setDetalles(menu: Platoi[]){

  let tiempoTotal: number = 0;
  let tiempoPromedio: number = 0;
  let healthSTotal: number = 0;
  let healthSPromedio: number = 0;
  let precioTotal: number = 0;


  if(menu.length != 0){
    
    for(let i=0; i< menu.length; i++){
      
      tiempoTotal += menu[i].readyInMinutes || 0;
      healthSTotal += menu[i].healthScore || 0;
      precioTotal += menu[i].pricePerServing || 0;
    }   
          tiempoPromedio = tiempoTotal / menu.length;
          healthSPromedio = healthSTotal / menu.length;

          this.detalles = {
            tiempoTotal,
            tiempoPromedio,
            healthSTotal,
            healthSPromedio,
            precioTotal
          }
          this.detalles$.next(this.detalles);      
    } return
  }

  checkVegan(menu: Platoi[]){
    for(let i=0; i< menu.length; i++){
      if(menu[i].vegan){
        this.totalVegan +=1;
      }
      
    }
  }
}

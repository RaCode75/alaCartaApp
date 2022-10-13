import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
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
  totalNoVegan: number = 0;
  

  constructor() {
    //localStorage.clear();
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
   
//********* Guardar el menu ***************************** */
setMenu( menu: Platoi[]): void {
  this.menuList$.next([...menu]);
  this.detalles$.next(this.detalles);
  localStorage.setItem('menu', JSON.stringify(menu));
}
// *********** Añadir  plato *******************************/

addPlato(plato: Platoi): void {
  if(this.menu.length < this.maxPlatos){
    this.checkMenu(plato); 
    if(plato.vegan){
      this.totalVegan < this.veganRequired ? this.addToMenu(plato) : this.noMoreVegan();
    } else if (!plato.vegan){
      this.totalNoVegan < this.veganRequired ? this.addToMenu(plato) : this.moreVegan();
    }
  }
  else {
    this.menuLleno();
  }

}

//*************** Añadir al Menu ********************* */

addToMenu(plato: Platoi){
  this.menu.push(plato);  
  this.setMenu(this.menu);
  this.setDetalles(this.menu);
  this.checkVegan(this.menu);
}

//*********** Quitar Plato *************************** */

quitarPlato(plato: Platoi): void {
  let index:number = this.menu.indexOf(plato);
  this.menu.splice(index, index+1);
  //actualizar menu
  this.setMenu(this.menu);
  this.checkVegan(this.menu);
  this.setDetalles(this.menu);
}
//************* Estado de detalles ************************** */

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
//************Chequear vegan ************************* */
  checkVegan(menu: Platoi[]){
    this.totalVegan = 0;
    this.totalNoVegan = 0;
    for(let i=0; i< menu.length; i++){
      if(menu[i].vegan){
        this.totalVegan ++;
      } else {
        this.totalNoVegan ++;
      }      
    }
  }
//********************Chequear platos duplicados *************************************/
checkMenu(plato: Platoi){
  if( this.menu.length > 0 ){
    for(let i= 0; i< this.menu.length; i++){
      if(this.menu[i].id == plato.id){
        return this.platoYaEnMenu();
      }            
    }  
         
  }
}
  /**********************ALERTS **************************************************** */

  moreVegan(){
    Swal.fire({
      title: 'Error',
      text: 'Debes incluir 2 platos veganos!',
      icon: 'error'
    });
  }

  noMoreVegan(){
    Swal.fire({
      title: 'Error',
      text: 'Debes incluir 2 platos no veganos!',
      icon: 'error'
    });
  }

  menuLleno(){
    Swal.fire({
      title: 'error',
      text: 'El menú está lleno!',
      icon: 'error'
    });
  }

  platoYaEnMenu(){
    Swal.fire({
      title: 'Error',
      text: 'Este plato ya está en el menú',
      icon: 'error'
    });
  }
}

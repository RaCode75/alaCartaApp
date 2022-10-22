import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import { Etiqueta, Platoi } from 'src/app/modelos/platoi';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private menuServiceSubscription: Subscription | undefined;
  private detallesServiceSubscription: Subscription | undefined;


  menu: Platoi[] = [];
  baseMenu: Etiqueta = {title: "Arma tu menu"};
  detalles: any = {};
  menuDetalles: boolean = false;

  constructor( private menuService: MenuService ,private router: Router){}



  ngOnInit(): void {
    this.menuServiceSubscription = this.menuService.menuListAction$.subscribe(
      data => {
        this.menu = data;
      }
    )
    this.detallesServiceSubscription = this.menuService.detallesAction$.subscribe(
      detalles => {
        this.detalles = detalles;
      }
    );
  }

  ngOnDestroy(): void {
      {
        this.menuServiceSubscription?.unsubscribe();
      }
  }


  search(){
    this.router.navigateByUrl('search')
  }  

  verDetalles(){
    this.menuDetalles = !this.menuDetalles;
  }

}

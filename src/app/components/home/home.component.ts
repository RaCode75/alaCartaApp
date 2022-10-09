import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import { Platoi } from 'src/app/modelos/platoi';
import { PlatoComponent } from '../plato/plato.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private menuServiceSubscription: Subscription | undefined;
  private detallesServiceSubscription: Subscription | undefined;


  menu: Platoi[] = [];
  detalles: any = {};

  constructor( private autService: AuthService, private menuService: MenuService ,private router: Router){}



  ngOnInit(): void {
    this.menuServiceSubscription = this.menuService.menuListAction$.subscribe(
      data => {
        this.menu = data;
      }
    )
    this.detallesServiceSubscription = this.menuService.detallesAction$.subscribe(
      detalles => {
        this.detalles = detalles;
        console.log(this.detalles)
      }
    );
  }

  ngOnDestroy(): void {
      {
        this.menuServiceSubscription?.unsubscribe();
      }
  }

  logout(){
    this.autService.logout();
    this.router.navigateByUrl('login')
  }

  search(){
    this.router.navigateByUrl('search')
  }  

}

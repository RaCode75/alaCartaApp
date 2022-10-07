import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { PlatosService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import { Platoi } from 'src/app/modelos/platoi';
import { PlatoComponent } from '../plato/plato.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private platoServiceSubscription: Subscription | undefined;


  menu: Platoi[] = [];

  constructor( private autService: AuthService, private platosService: PlatosService ,private router: Router){}



  ngOnInit(): void {
    this.platoServiceSubscription = this.platosService.menuListAction$.subscribe(
      data => {
        this.menu = data;
        console.log(data)
      }
    );
  }

  ngOnDestroy(): void {
      {
        this.platoServiceSubscription?.unsubscribe();
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

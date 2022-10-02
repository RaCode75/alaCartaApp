import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { PlatosService } from 'src/app/servicios/platos.service';
import { Router } from '@angular/router';
import { Platoi } from 'src/app/modelos/platoi';
import { PlatoComponent } from '../plato/plato.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() plato: Platoi = {};
  primerPlato: Platoi = {};
  private platoServiceSubscription: Subscription | undefined;

  maxPlatos: number = 4;
  totalPlatos: number = 0;
  veganRequired: number = 2;
  totalVegan: number = 0;
  platos: Platoi[] = [];

  constructor( private autService: AuthService, private platosService: PlatosService ,private router: Router){}



  ngOnInit(): void {
    this.platoServiceSubscription = this.platosService.primerPlato.subscribe(
      data => {
        this.plato = data;
        this.platos.push(this.plato);
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

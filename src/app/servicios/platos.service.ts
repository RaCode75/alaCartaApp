import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platoi } from '../modelos/platoi';
//import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private primerPlatoSubject: BehaviorSubject<Platoi> = new BehaviorSubject({} as Platoi);
  public readonly primerPlato: Observable<Platoi> = this.primerPlatoSubject.asObservable();


  constructor() { }

setPlatoUno( primerPlato: Platoi): void {
  this.primerPlatoSubject.next(primerPlato);
}


}

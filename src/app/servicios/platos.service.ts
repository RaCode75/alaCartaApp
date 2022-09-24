import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  constructor(private api: ApiService) { }

  loadPlato(){}

  deletePlato(){}

  checkMenu(){}

  searchPlato(){}


}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Platoi } from '../modelos/platoi';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uri = 'https://api.spoonacular.com/';
  key = 'faab288e8ef74c8d8b5e9849f2aad95a';


  constructor(private http: HttpClient) {}

    getPlato(platoId: number):Observable<Platoi>{
      let direction = this.uri + "recipes/" + platoId + "/information?includeNutrition=false&apiKey=" + this.key;
      return this.http.get<Platoi>(direction);

    }
   }


import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../modelos/user';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri = 'http://challenge-react.alkemy.org/';
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  public login(userData: User) {
    this.http
      .post(this.uri , {email: userData.email, password: userData.password})
      .subscribe((resp: any) => {
        //guardamos el token
        if(resp.token){
        localStorage.setItem('auth_token', resp.token);        
        this.router.navigateByUrl('/home');
        } 
      })

  }

  logout(){
    localStorage.removeItem('auth_token');
  }

  // hay un token?
  public  isLogIn(){ 
    return (localStorage.getItem('auth_token') !== null);
  }
}

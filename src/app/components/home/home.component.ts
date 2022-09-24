import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private autService: AuthService, private router: Router){}


  ngOnInit(): void {
  }

  logout(){
    this.autService.logout();
    this.router.navigateByUrl('login')
  }

  search(){
    this.router.navigateByUrl('search')
  }


  

}

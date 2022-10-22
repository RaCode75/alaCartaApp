import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor( private autService: AuthService ,private router: Router) { }

  ngOnInit(): void {
  }

  onSidenavClose(){
    this.sidenavClose.emit();
  }

  onLogout(){
    this.autService.logout();
    this.router.navigateByUrl('login')
  }

}

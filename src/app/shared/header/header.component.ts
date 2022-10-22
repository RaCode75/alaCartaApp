import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('login')
  }

}

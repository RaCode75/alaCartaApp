import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //variables
  formLogin: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.formLogin = this.fb.group({
      email: [ "challenge@alkemy.org", Validators.required ],
      password: [ "", Validators.required ]

    });
   }

  ngOnInit(): void {
  }

  // get formControls(){
  //   return this.formLogin.controls;
  // }

  login(){
    this.isSubmitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    
     this.authService.login(this.formLogin.value);
    console.log("enviando");


  }

}

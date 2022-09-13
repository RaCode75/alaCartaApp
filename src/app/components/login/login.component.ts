import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //variables
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.form = this.fb.group({
      email: [ "", Validators.required ],
      password: [ "", Validators.required ]

    });
   }

  ngOnInit(): void {
  }

  get formControls(){
    return this.form.controls;
  }
  login(){
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    
    this.authService.login(this.form.value);
    this.router.navigateByUrl('/home');    
  }

}

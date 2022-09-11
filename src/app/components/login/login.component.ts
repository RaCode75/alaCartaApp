import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //variables
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: [ "", Validators.required ],
      password: [ "", Validators.required ]
    })
   }

  ngOnInit(): void {
  }

  login(){
    const user = this.form.value.user;
    const password = this.form.value.password;

    console.log(user + " pass: " + password);
  }

}

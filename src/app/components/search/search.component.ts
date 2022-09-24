import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { Platoi } from 'src/app/modelos/platoi';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

 //variables
 searchForm: FormGroup;
 isSubmitted = false;
 platos: Platoi[] = [];


 constructor(
   private fb: FormBuilder,
   private api: ApiService,
   private router: Router
   ) {
   this.searchForm = this.fb.group({
     search: [ "", Validators.required ],


   });
  }

  ngOnInit(): void {
  }

  search(){
    this.isSubmitted = true;
    if (this.searchForm.invalid) {
      return;
    }    
    this.api.searchOptionDiet(this.searchForm.value).subscribe(data => {
      this.platos = data.results;
      console.log(this.platos);
      //
    });
  }
}

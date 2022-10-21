import { Component, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { debounceTime, map, distinctUntilChanged, filter, last } from 'rxjs/operators';
import { Platoi } from 'src/app/modelos/platoi';
import Swal from 'sweetalert2';
import {  BehaviorSubject, from } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

 //variables
 platos: Platoi[] = [];
 searchForm: FormGroup;
 buscando: boolean = false;
 searchInput= new FormControl();

private searchText$ = new BehaviorSubject<any>("");
private searchTextAction$ = this.searchText$.asObservable();


 constructor(
  private fb: FormBuilder,
   private api: ApiService,
   private router: Router,
   ){
    this.searchForm = this.fb.group({
      search: ["", Validators.required ],
      "searchInput": this.searchInput      
    });
   }

  ngOnInit(): void {
  
  }

  parcialSearch(value:string){
    const searchText = value;
    this.searchText$.next(searchText);
    this.searchText$.pipe(
      filter(text => text.length > 1),
      debounceTime(2000), 
      distinctUntilChanged(),
    ).subscribe((value)=>{
      
        //    return this.api.searchOptionDiet(value).subscribe(data => {
        //  this.platos = data.results;
        // });

        console.log(value)
  })
}
 
    // if(value === ''){
    //   return of([]);
    // }
    //  return this.api.searchOptionDiet(value).subscribe(data => {
    //      this.platos = data.results;
    //     });
    //console.log(value);
  

  // search(evt:any){
  //   let searchText = evt.target.value
  //   this.result$ = this.api.searchOptionDiet(searchText.value).subscribe(data => {
  //       this.platos = data.results;
  //     })


    // this.isSubmitted = true;
    // if (this.searchForm.invalid) {
    //   return;
    // }    
    // this.api.searchOptionDiet(this.searchForm.value).subscribe(data => {
    //   this.platos = data.results;
    // });
   }


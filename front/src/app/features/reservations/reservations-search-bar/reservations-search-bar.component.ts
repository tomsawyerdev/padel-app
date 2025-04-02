import { Component,Output,EventEmitter } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import {StoreService} from '../../../core/services/store/store.service';

import {provideNativeDateAdapter} from '@angular/material/core';
//provideDateFnsAdapter
// For Clubs Select
//import {Observable} from 'rxjs';
//import {map} from 'rxjs/operators';
//import {AsyncPipe} from '@angular/common';
import { CommonModule } from '@angular/common'; //para poder usar: *ngFor, keyvalue pipe

export interface Clubs {id:number, name: string};

@Component({
  selector: 'app-reservations-search-bar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatButtonModule,MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule,FormsModule],
  templateUrl: './reservations-search-bar.component.html',
  styleUrl: './reservations-search-bar.component.css'
})
export class ReservationsSearchBarComponent {

  private store = inject(StoreService);// Remember last search parameters


  @Output() emitterClickSearch = new EventEmitter<any>();
  

  private api = inject(ApiService);
  
  //clubs : Clubs[] = [{"id":1,"name":"Padel Sur"},{"id":2,"name":"Padel Norte"}];
  //clubs!: Observable<Clubs[]>; //=[]; // = this.api.getClubs();
  clubs : any[]=[];
  //clubs: Observable<Clubs[]> = this.api.getClubs(); //.pipe( map( data => data.items) );
  //Add this ! if your "strictPropertyInitialization" in tsconfig.json is set to true,

  //How to populate mat-select from observable

  club=1;

  today = new Date(Date.now()); 
  

  day =  new Date(Date.now());
 

  ngOnInit() {
    console.log("SearchBar, ngOnInit");
    this.fetchClubs();            
    //this.api.getClubs().subscribe(value=> console.log(value));
    //this.api.getClubs().subscribe(resp =>  this.clubs = resp.items);//.pipe( map( data => data.items) );
    

    
    var  filters = this.store.getReservationsSearchValues();
    if(filters){ 
      console.log("SearchBar, Set store filters");
    this.club = filters.club;
    this.day =  filters.day
     }  
    

    //console.log('SearchBar: ngOnInit',this.store.getReservationsSearchValues());
    //console.log('SearchBar: ngOnInit',filters.club_id,this.day);
    // Set filters from store
    //({club_id:this.club_id, day:this.day}= this.store.getReservationsSearchValues());


  }

  fetchClubs(): void {     
    this.api.getClubs().subscribe({next: (resp) => { //console.log('resp.items:',resp.items);
                                                     this.clubs = resp.items;}});
    /*NG02100: InvalidPipeArgument: '[object Object],[object Object]' for pipe '_AsyncPipe' */                                                     
  }
  



  //-----------------------------------------

  getFilters(){

    //let day= this.day.getFullYear();

    return { club:this.club, day: this.day.toISOString().substring(0,10)} ;
  }

  //-----------------------------------------
  // Search Button event
  //-----------------------------------------
  
  clickedSearch( ): void{

    //console.log('clickedSearch:',options);

    //let filters  = {name: this.name};
    this.store.setReservationsSearchValues({club:this.club, day: this.day});
    this.emitterClickSearch.emit(this.getFilters());

  }







}

import { Component,Output,EventEmitter } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';


import { CommonModule } from '@angular/common'; //para poder usar: *ngFor, keyvalue pipe



@Component({
  selector: 'app-games-search-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,FormsModule],
  templateUrl: './games-search-bar.component.html',
  styleUrl: './games-search-bar.component.css'
})
export class GamesSearchBarComponent {

  @Output() emitterClickSearch = new EventEmitter<any>();
  

  private api = inject(ApiService);
  
 
  clubs : any[]=[];
 
  club=1;

  days_tf = [false,true,true,true,true,true,true,true,]; 



  ngOnInit() {
    //console.log("Games SearchBar, ngOnInit");
    this.fetchClubs();            
    

  }

  fetchClubs(): void {     
    this.api.getClubs().subscribe({next: (resp) => { //console.log('resp.items:',resp.items);
                                                     this.clubs = resp.items;}});    
  }

  //----------------------------------------- 
  // Check Boxes

  getDay(i: number ): boolean {
    return this.days_tf[i];
  }

  toggleDay(i: number ): boolean {
    return this.days_tf[i]= !this.days_tf[i] ;
  }

  getDays(): any {

    return this.days_tf.map( (e,i)=> e==true?i:0).filter(e=> e > 0)


    

  }


 

  //-----------------------------------------
  // Search Button event
  //-----------------------------------------
  
  clickedSearch( ): void{

    //console.log('GamesSearchBar, clickedSearch:',this.club, this.days);   
    
    this.emitterClickSearch.emit({club:this.club, days: this.getDays()});

  }

}

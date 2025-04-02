import { Component,Input, Output,EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
//import { Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-reservations-search-table-courts',
  standalone: true,
  imports: [CommonModule,MatChipsModule,MatIconModule,MatButtonModule],
  templateUrl: './reservations-search-table-courts.component.html',
  styleUrl: './reservations-search-table-courts.component.css'
})
export class ReservationsSearchTableCourtsComponent {

  @Input() slot: any;

  @Output() emitterClickConfirm = new EventEmitter<any>();

  slot_data : object ={}

  //ngOnInit() {  this.slot_data  }


  clickCreate( court:object){
    console.log("ReservationsSearchTableListCourtsComponent, clickedCreate:",{...this.slot,free_courts:null,...court});
    // rutea para crear o crea la reserva y muestra una SnackBar ?    
    // muestra un dialogo con toda la info 
    // [cancel],[ok]

    this.emitterClickConfirm.emit({...this.slot,free_courts:null,...court});
    
  }

}

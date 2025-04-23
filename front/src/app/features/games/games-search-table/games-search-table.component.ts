import { Component,Input, Output,EventEmitter } from '@angular/core';

import {MatTableModule} from '@angular/material/table';

export interface ReservationElement {
  id:number;
  day : string;
  schedule_slot : string;
  club_name : string;
  court_name : string;
  user_name :  string;  
}


@Component({
  selector: 'app-games-search-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './games-search-table.component.html',
  styleUrl: './games-search-table.component.css'
})
export class GamesSearchTableComponent {

  @Input() dataSource : ReservationElement[] =[];
  
  @Output() emitterClickEvent = new EventEmitter<any>();

  displayedColumns: string[] = [
    'day',
    'schedule_slot',
    'club_name',
    'court_name',    
    'user_name'
   ];

    // Detectar el evento click

  clickedRow( row : ReservationElement ): void{

    console.log("GamesSearchTable clickedRow:", row);    
    
   // Actualizo el opponent_id y redirijo a mis games

   this.emitterClickEvent.emit(row);
   
 }

}

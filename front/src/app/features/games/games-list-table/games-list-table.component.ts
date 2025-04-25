import { Component, Input } from '@angular/core';
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
  selector: 'app-games-list-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './games-list-table.component.html',
  styleUrl: './games-list-table.component.css'
})
export class GamesListTableComponent {

  @Input() dataSource : ReservationElement[] =[];

  displayedColumns: string[] = [
    'day',
    'schedule_slot',
    'club_name',
    'court_name',    
    'user_name',
    'status'
   ];

    // Detectar el evento click
  clickedRow( row : ReservationElement ): void{

    console.log("clickedRow:", row);        
   
 }
}

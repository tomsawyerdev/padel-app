import { Component,Input, Output,EventEmitter } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface ReservationElement {
  id:number;
  fecha : string;
  schedule_slot : string;
  club_name : string;
  court_name : string;
  game_state :  string;
  game_id :number;

}

@Component({
  selector: 'app-reservations-list-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './reservations-list-table.component.html',
  styleUrl: './reservations-list-table.component.css'
})
export class ReservationsListTableComponent {

  @Input() dataSource : ReservationElement[] =[];
  @Output() emitterClickEvent = new EventEmitter<any>();  

  displayedColumns: string[] = [
    'fecha',
    'schedule_slot',
    'club_name',
    'court_name',        
    'opponent_state',
    'opponent_name',   
   ];


  // Detectar el evento click
  clickedRow( row : ReservationElement ): void{

   // console.log("clickedRow:", row);       
    
    this.emitterClickEvent.emit(row);    
 }

}

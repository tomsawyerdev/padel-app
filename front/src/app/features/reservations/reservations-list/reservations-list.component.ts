import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {ApiService} from '../../../core/services/api/api.service';

import {ReservationsListTableComponent} from '../reservations-list-table/reservations-list-table.component';

import {ReservationsListUpdOpponentDlgComponent} from '../reservations-list-upd-opponent-dlg/reservations-list-upd-opponent-dlg.component';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [ReservationsListTableComponent],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css'
})
export class ReservationsListComponent {

  constructor(private dialog: MatDialog) {}
  
  private api = inject(ApiService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);



  items = []; 
  
  // ---------------------------

  
     
  // Al cargarse la pagina busca las reservas del usuario logueado
  ngOnInit() {

      this.fetchReservations();      

  }
  
  // TODO:  filtrar pasado presente, por dia  ?
  fetchReservations(): void {  
   
    this.api.getReservationsList().subscribe({
      next: (resp) => { this.items = resp.items.map( (e :any)=> ({...e.reservation}))
                        //console.log("ReservationsList, fetchReservations next:", this.items.length)
                      },
  });
  }


  // Event ClickRow comming from the reservations-list-table  
  async handleClickEvent(data:object) {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    
    console.log("Games open dialog keys:", Object.keys(data));    
   
    const dialogRef = this.dialog.open(ReservationsListUpdOpponentDlgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( dlg => { if (dlg.result) this.onDlgConfirmation({...data,opponent_id:dlg.opponent_id })}); 
}

async onDlgConfirmation(data: any) {

   console.log("onDlgConfirmation:");
   console.log("    data:", data);
   //console.log("    keys:", Object.keys(data));    

  let reservation = { reservation_id:data.id, opponent_id: data.opponent_id}; 
  console.log("onDlgConfirmation:  ", reservation);
  let response = await this.api.postGamesSetOpponent(reservation); //off: null, on: -1
  //console.log("    response:", response);
  

  // Mostrar mensaje de confirmacion  en un Snack bar
  // https://material.angular.io/components/snack-bar/overview   

    this.snackBar.open(response.message, "" ,{  duration: 1000});
    //this.router.navigate(['reservations/list'])
    this.fetchReservations();//Reload
 
  }

}

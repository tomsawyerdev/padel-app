import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { Router } from '@angular/router';


import {ApiService} from '../../../core/services/api/api.service';
import {StoreService} from '../../../core/services/store/store.service';

import {ReservationsSearchBarComponent} from '../reservations-search-bar/reservations-search-bar.component';
import {ReservationsSearchTableCourtsComponent} from '../reservations-search-table-courts/reservations-search-table-courts.component';
import {ReservationCreateDialogComponent} from '../reservation-create-dialog/reservation-create-dialog.component';




export interface SlotElement {
  id:number;
  slot_start : string;
  slot_end : string;  
  free_courts : []

}

@Component({
  selector: 'app-reservations-search',
  standalone: true,
  imports: [ReservationsSearchBarComponent,ReservationsSearchTableCourtsComponent], //ReservationsSearchTableCourts [Cancha1,Cancha2,...]
  templateUrl: './reservations-search.component.html',
  styleUrl: './reservations-search.component.css'
})
export class ReservationsSearchComponent {
  
  constructor(private dialog: MatDialog) {}

  private api = inject(ApiService);
  private store = inject(StoreService);// Remember last search parameters
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  items:SlotElement[] = [] ; 
  
  // ---------------------------   
  // Al cargarse la pagina busca los slot y las todas las canchas que estan libres en esos slots
  
  ngOnInit() {

      //this.fetchItems({});  // Recordar la ultima busqueda desde la store    
      let lastSearch = this.store.getReservationsSearchValues();
      if (lastSearch){
        console.log("ReservationsSearch, ngOnInit fetchItems:", lastSearch);               

        this.fetchItems({club:lastSearch.club,day:lastSearch.day.toISOString().substring(0,10)});
      }

  }

  fetchItems(filters :object): void {  

    //this.store.setReservationsSearchValues(filters);
   
    this.api.getReservationsSearch(filters).subscribe({
      next: (resp) => { this.items = resp.items.map( (e :any)=> ({...e.slot}));
                        console.log("ReservationsSearch, fetch, items length:", this.items.length);

                      },
  });
  }

  // Event comming from the Search Bar
  handleSearchEvent(filters:object){  
       console.log("ReservationsSearch, handleSearchEvent:",filters); 

      this.fetchItems(filters) ;
      //
    }

   // Event comming from the Courts buttons 
   handleConfirmEvent(data:object) {

      const dialogConfig = new MatDialogConfig();

      //dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = data;
      //console.log("reservation open dialog keys:", Object.keys(data));
  

      //this.dialog.open(ReservationCreateDialogComponent, dialogConfig);
      const dialogRef = this.dialog.open(ReservationCreateDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe( result => { if (result) this.onReservationCreate(data)  }); 
  }

  async onReservationCreate(data: any) {

     console.log("onReservationCreate:");
     //console.log("    data:", data);
     //console.log("    keys:", Object.keys(data));
      /* 
        "slot_id", "slot_start", "slot_end", "day", "free_courts", "court_id", "court_name", "club_id"
      */

    let reservation = {  day:data.day,  schedule_id:data.slot_id, court_id: data.court_id, club_id: data.club_id }; 
    //console.log("    reservation:", reservation);
    let response = await this.api.postReservationCreate(reservation);
    //console.log("    response:", response);
    
 
    // Mostrar mensaje de confirmacion  en un Snack bar
    // https://material.angular.io/components/snack-bar/overview        
      this.snackBar.open(response.message, "" ,{  duration: 1000});
      this.router.navigate(['reservations/list'])
   
    }
  
}

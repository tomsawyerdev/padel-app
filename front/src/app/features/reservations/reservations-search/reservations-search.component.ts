import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

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
      next: (resp) => { this.items = resp.items.map( (e :any)=> ({...e.slot}))
                        console.log("ReservationsSearch, fetch next:", this.items.length)
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
      /* {
        slot_id: 1,
        date: "31/03/2025",
        slot : "10:00-11:00",
        court_name: 'Cancha XXX',

      };*/

      //this.dialog.open(ReservationCreateDialogComponent, dialogConfig);
      const dialogRef = this.dialog.open(ReservationCreateDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
          data => console.log("Dialog output:", data)
      ); 
  }
  
}

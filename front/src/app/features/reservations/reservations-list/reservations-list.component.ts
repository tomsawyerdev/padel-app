import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';

import {ReservationsListTableComponent} from '../reservations-list-table/reservations-list-table.component';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [ReservationsListTableComponent],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css'
})
export class ReservationsListComponent {
  
  private api = inject(ApiService);

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
}

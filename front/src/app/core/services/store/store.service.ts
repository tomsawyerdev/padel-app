import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private api = inject(ApiService);
  constructor() { }


  reservationsSearchValues: any= null; //{ club:0, day:""};
  //reservationsSearchValues ={club:1, day:"2025-03-10"};
  

  getReservationsSearchValues(){ return this.reservationsSearchValues; }
  setReservationsSearchValues(filters : any){ 
    this.reservationsSearchValues=filters; }

  
}

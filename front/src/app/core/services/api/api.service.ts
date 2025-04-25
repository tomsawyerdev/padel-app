import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
//import { tap } from 'rxjs/operators';
import {  take, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authService = inject(AuthService);

  private urlReservationsList = environment.apiUrl + 'reservations/list';
  private urlReservationsSearch = environment.apiUrl + 'reservations/search';
  private urlReservationsCreate = environment.apiUrl + 'reservations/create';

  private urlClubs = environment.apiUrl + 'clubs';
  
  private urlGamesList = environment.apiUrl +   'games/list';
  private urlGamesSearch = environment.apiUrl + 'games/search';
  private urlGamesUpdate = environment.apiUrl + 'games/update';
  private urlGamesNewOpponent = environment.apiUrl + 'games/new';
  
  


  constructor(private http: HttpClient  ) {}

  //----------------------------
  // Reservations
  //----------------------------
 
  getReservationsList(): Observable<any> {
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlReservationsList,{  headers: { Authorization: token  }});     
  }
  
  getReservationsSearch(query : any): Observable<any>  {
      
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlReservationsSearch, { params: query , headers: { Authorization: token  }})
    //.pipe( tap(value => { console.log('Spy:', value); }));
  } 


  
  async postReservationCreate(data:object): Promise<any> {
    var token : string = (this.authService.getToken() as string);
    var res$ = this.http.post(this.urlReservationsCreate, data,{  headers: { Authorization: token  }}).pipe(take(1));
    
    const result:any = await lastValueFrom(res$);        
    return result;    
}

  //----------------------------
  // Games 
  //----------------------------

  // Lista las reservas en las que soy contrincante
  getGamesList(): Observable<any> {
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlGamesList,{  headers: { Authorization: token  }});     
  }

  // Para buscar las reservas que necesitan un contrincante, busca por club y dia de la semana [L,M,X,J,V,S,D]
  postGamesSearch(data : any): Observable<any>  {
      
    var token : string = (this.authService.getToken() as string);
    return this.http.post(this.urlGamesSearch, data, { headers: { Authorization: token  }})
    //.pipe( tap(value => { console.log('Spy:', value); }));
  } 

  // Para actualizar el oponente_id
  async postGamesSetOpponent(data : any):  Promise<any> {
      
    var token : string = (this.authService.getToken() as string);
    var res$ = this.http.post(this.urlGamesUpdate, data, { headers: { Authorization: token  }}).pipe(take(1));
    
    const result:any = await lastValueFrom(res$);        
    return result;    
    
  } 

  async postGamesNewOpponent(data : any):  Promise<any> {
      
    var token : string = (this.authService.getToken() as string);
    var res$ = this.http.post(this.urlGamesNewOpponent, data, { headers: { Authorization: token  }}).pipe(take(1));
    
    const result:any = await lastValueFrom(res$);        
    return result;    
    
  } 


  //----------------------------
  // Clubs
  //----------------------------
 
  getClubs(): Observable<any> {
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlClubs,{  headers: { Authorization: token  }});     
  }
  
  
}

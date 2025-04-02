import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
//import {  take, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authService = inject(AuthService);

  private urlReservationsList = environment.apiUrl + 'reservations/list';
  private urlReservationsSearch = environment.apiUrl + 'reservations/search';
  private urlClubs = environment.apiUrl + 'clubs';
  
  private urlPlayers = environment.apiUrl + 'players';
  


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

  //----------------------------
  // Games
  //----------------------------



  //----------------------------
  // Players
  //----------------------------
  getPlayer(id : number): Observable<any> { 
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlPlayers+`/${id}`, {  headers: { Authorization: token  }}); 
   }

  updPlayer(id : number, player:any): Observable<any> { 
    var token : string = (this.authService.getToken() as string);
    return this.http.post(this.urlPlayers+`/${id}`,player, {  headers: { Authorization: token  }});
    //.pipe( tap(value => { console.log('api.updPlayer:', value); }));; 
   }

  newPlayer(player:any): Observable<any> { 
    var token : string = (this.authService.getToken() as string);
    return this.http.post(this.urlPlayers,player, {  headers: { Authorization: token  }}); 
   }


  getPlayersSet(ids : any): Observable<any> { 
    var token : string = (this.authService.getToken() as string);
    return this.http.post(this.urlPlayers+'/set',{ids}, {  headers: { Authorization: token  }}); 
   }

  getPlayers(query : any): Observable<any>  {
      
      var token : string = (this.authService.getToken() as string);

      return this.http.get(this.urlPlayers, { params: query , headers: { Authorization: token  }})
      //.pipe( tap(value => { console.log('Spy:', value); }));

  }

  //----------------------------
  // Clubs
  //----------------------------
 
  getClubs(): Observable<any> {
    var token : string = (this.authService.getToken() as string);
    return this.http.get(this.urlClubs,{  headers: { Authorization: token  }});     
  }
  
  
}

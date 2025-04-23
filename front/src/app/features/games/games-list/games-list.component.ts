import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import {GamesListTableComponent} from '../games-list-table/games-list-table.component';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [GamesListTableComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent {

  private api = inject(ApiService);

  items = []; 
  
     
  // Al cargarse la pagina busca los partidos donde el usuario logeado es oponente
  ngOnInit() {
      this.fetchItems();      
  }  
  
  fetchItems(): void {  
   
    this.api.getGamesList().subscribe({
      next: (resp) => { this.items = resp.items.map( (e :any)=> ({...e.game}))
                        //console.log("GamesList, fetchItems next:", this.items.length)
                      },
  });
  }
}

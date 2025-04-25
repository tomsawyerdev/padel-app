import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { Router } from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';
import { GamesSearchBarComponent} from '../games-search-bar/games-search-bar.component';
import { GamesSearchTableComponent } from "../games-search-table/games-search-table.component";
import {GamesSearchNewOpponentDlgComponent } from "../games-search-new-opponent-dlg/games-search-new-opponent-dlg.component";

@Component({
  selector: 'app-games-search',
  standalone: true,
  imports: [GamesSearchBarComponent, GamesSearchTableComponent],
  templateUrl: './games-search.component.html',
  styleUrl: './games-search.component.css'
})
export class GamesSearchComponent {
  constructor(private dialog: MatDialog) {}

  private api = inject(ApiService);
  //private store = inject(StoreService);// Remember last search parameters
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  items = []; 

  fetchItems(filters :object): void {  

    //this.store.setGamesSearchValues(filters);
   
    this.api.postGamesSearch(filters).subscribe({
      next: (resp) => { this.items = resp.items.map( (e :any)=> ({...e.game}));
                        console.log("GamesSearch, fetch, items length:", this.items.length);
                        console.log('   items:',this.items)

                      },
  });
  }

  // Event comming from the Search Bar
  handleSearchEvent(filters:object){  
       console.log("GamesSearch, handleSearchEvent:",filters); 

      this.fetchItems(filters) ;

      //
    }


  // Event ClickRow comming from the games-search-tables  
  async handleClickEvent(data:object) {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    
    console.log("Games open dialog keys:", Object.keys(data));    
   
    const dialogRef = this.dialog.open(GamesSearchNewOpponentDlgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( result => { if (result) this.onDlgConfirmation(data)  }); 
}

async onDlgConfirmation(data: any) {

   console.log("onDlgConfirmation:");
   //console.log("    data:", data);
   //console.log("    keys:", Object.keys(data));    

  let reservation = { reservation_id:data.id}; 
  //console.log("    reservation:", reservation);
  let response = await this.api.postGamesNewOpponent(reservation);
  //console.log("    response:", response);
  

  // Mostrar mensaje de confirmacion  en un Snack bar
  // https://material.angular.io/components/snack-bar/overview   

    this.snackBar.open(response.message, "" ,{  duration: 1000});
    this.router.navigate(['games/list'])
 
  }

  
}

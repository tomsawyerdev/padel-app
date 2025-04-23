import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {  
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-games-search-upd-opponent-dlg',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './games-search-upd-opponent-dlg.component.html',
  styleUrl: './games-search-upd-opponent-dlg.component.css'
})
export class GamesSearchUpdOpponentDlgComponent {

  readonly dialogRef = inject(MatDialogRef<GamesSearchUpdOpponentDlgComponent>);
   
  data = inject(MAT_DIALOG_DATA);     
  
  save() {
    // Llamar al api.CreateReservation(this.data);
    // if error show
    // if ok close
    
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}

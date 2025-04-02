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
  selector: 'app-reservation-create-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './reservation-create-dialog.component.html',
  styleUrl: './reservation-create-dialog.component.css'
})
export class ReservationCreateDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ReservationCreateDialogComponent>);
   
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

import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
//import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common'; //para poder usar: *ngFor, keyvalue pipe
import {  
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-reservations-list-upd-opponent-dlg',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatInputModule,MatSelectModule,MatFormFieldModule,
           MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
            ,FormsModule ],
  templateUrl: './reservations-list-upd-opponent-dlg.component.html',
  styleUrl: './reservations-list-upd-opponent-dlg.component.css'
})
export class ReservationsListUpdOpponentDlgComponent {

  readonly dialogRef = inject(MatDialogRef<ReservationsListUpdOpponentDlgComponent>);
   
  data = inject(MAT_DIALOG_DATA);    

  opponent_id : any = null;
  show = false;

    
  ngOnInit() {

    this.opponent_id = this.data.opponent_id

 
  }
  clickEnable() {    
    //console.log("clickEnable:");
    this.dialogRef.close({result:true,opponent_id:-1});
  }

  clickDisable() {    
    //console.log("clickDisable:");
    this.dialogRef.close({result:true,opponent_id:null});
  }

  clickSave() {
    
    //console.log("save:",this.opponent_id)
    
    
    this.dialogRef.close({result:true,opponent_id:this.opponent_id});
  }

  close() {
    this.dialogRef.close({result:false,opponent_id:this.opponent_id});
  }

}

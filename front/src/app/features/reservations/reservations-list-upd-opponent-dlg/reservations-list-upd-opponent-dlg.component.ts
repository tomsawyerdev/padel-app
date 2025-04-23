import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
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
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
            MatRadioModule,FormsModule ],
  templateUrl: './reservations-list-upd-opponent-dlg.component.html',
  styleUrl: './reservations-list-upd-opponent-dlg.component.css'
})
export class ReservationsListUpdOpponentDlgComponent {

  readonly dialogRef = inject(MatDialogRef<ReservationsListUpdOpponentDlgComponent>);
   
  data = inject(MAT_DIALOG_DATA);    

  opponent_id : any = null;
  show = false;
  /*
  options = [{key:-1, value:"En busqueda"},
             {key:null, value:"No asignado"}]*/

  
  
  ngOnInit() {

    this.opponent_id = this.data.opponent_id

    //if (this.data.opponent_state == "En busqueda")    {    this.opponent_id = -1}
   // if (this.data.opponent_state == "No Asignado")    {    this.opponent_id = null}
    
    if (this.data.opponent_state == "Asignado")    {  
      //this.options.push({key:this.data.opponent_id, value:this.data.opponent_name})}
      this.show=true;
      
     }
    
    /*
    En busqueda --> -1
    Asignado    --> 445, No lo puedo volver atras
    No asignado--> null
    */

  }
  
  save() {
    
    //console.log("save:",this.opponent_id)
    
    
    this.dialogRef.close({result:true,opponent_id:this.opponent_id});
  }

  close() {
    this.dialogRef.close({result:false,opponent_id:this.opponent_id});
  }

}

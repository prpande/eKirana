import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InteractionDialogData {
  isConfirmation: boolean;
  title: string,
  message: string;
}

@Component({
  selector: 'app-interaction-dialog',
  templateUrl: './interaction-dialog.component.html',
  styleUrls: ['./interaction-dialog.component.css']
})
export class InteractionDialogComponent {

  constructor(public dialogRef:MatDialogRef<InteractionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: InteractionDialogData){
      dialogRef.disableClose = true;
    }
}

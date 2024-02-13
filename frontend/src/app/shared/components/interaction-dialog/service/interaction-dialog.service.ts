import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InteractionDialogComponent, InteractionDialogData } from '../interaction-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionDialogService {

  constructor(private interactionDialog: MatDialog) { }

  openInteractionDialog(data: InteractionDialogData): Observable<boolean>{
    const dialogRef = this.interactionDialog.open(InteractionDialogComponent, {data: data, width: '30vw'});
    return dialogRef.afterClosed();
  }
}

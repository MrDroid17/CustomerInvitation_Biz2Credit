import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InfoDialogComponent } from '../reusable-component/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  /**
 * information dialog configuration
 */
  openInfoDialog(msg) {
    const config = new MatDialogConfig();
    config.width = '350px';
    config.disableClose = true;
    config.panelClass = 'confirm-dialog-container';
    config.data = {
      message: msg
    };
    config.position = { top: '100px' };
    return this.dialog.open(InfoDialogComponent, config);
  }
}



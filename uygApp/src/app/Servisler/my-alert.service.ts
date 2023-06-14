import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertDialogComponent } from '../Dialogs/my-alert-dialog/my-alert-dialog.component';
import { Sonuc } from '../Models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  alertDialogRef !: MatDialogRef<MyAlertDialogComponent>;

  constructor(
    public matDialog: MatDialog

  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "Hata";
    } else {
      baslik = "İşlem Tamam";
    }
    this.alertDialogRef = this.matDialog.open(MyAlertDialogComponent, {
      width: '300px',
      height: '130px'
    });
    this.alertDialogRef.componentInstance.dialogBaslik = baslik;
    this.alertDialogRef.componentInstance.dialogMesaj = s.mesaj;
    this.alertDialogRef.componentInstance.dialogIslem = s.islem;

    this.alertDialogRef.afterClosed().subscribe(d => {


    });

  }
}

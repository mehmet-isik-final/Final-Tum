import { Component, OnInit } from '@angular/core';
import { MyAlertService } from 'src/app/Servisler/my-alert.service';
import { MyApiService } from 'src/app/Servisler/myApi.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-giris-dialog',
  templateUrl: './giris-dialog.component.html',
  styleUrls: ['./giris-dialog.component.css']
})
export class GirisDialogComponent implements OnInit {
  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<UserDialogComponent>
  constructor(
    public apiServis: MyApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
  }
  OturumAc(kadi: string, parola: string) {
    this.apiServis.tokenAl(kadi, parola).subscribe((d: any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uId", d.userId);
      localStorage.setItem("uAdi", d.uyeAdi);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);

      console.log(d);

      location.href = "";
    }, err => {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kullanıcı Adı veya Parola Yanlış !";
      this.alert.AlertUygula(s);
    });
  }


  KullaniciEkle() {
    var yeniKayit: User = new User();
    this.dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '500px',
      height: '310px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciEkle(d).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
        })
      }
    });
  }
}

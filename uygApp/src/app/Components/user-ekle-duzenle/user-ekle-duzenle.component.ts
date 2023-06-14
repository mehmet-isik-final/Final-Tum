import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { _MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/Dialogs/ConfirmDialog/ConfirmDialog.component';
import { GirisDialogComponent } from 'src/app/Dialogs/giris-dialog/giris-dialog.component';
import { UserDialogComponent } from 'src/app/Dialogs/user-dialog/user-dialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { User } from 'src/app/Models/User';
import { MyAlertService } from 'src/app/Servisler/my-alert.service';
import { MyApiService } from 'src/app/Servisler/myApi.service';

@Component({
  selector: 'app-user-ekle-duzenle',
  templateUrl: './user-ekle-duzenle.component.html',
  styleUrls: ['./user-ekle-duzenle.component.css']
})
export class UserEkleDuzenleComponent implements OnInit {
  uAdi !: any;
  kullanicilar !: User[];
  kullanici !: User;

  events: string[] = [];
  dataSource !: any;

  displayedColumns = ['userId', 'userAdi', 'userMail', 'userAdmin', 'islemler']
  userAd !: string;
  opened!: boolean;

  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<UserDialogComponent>;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(
    public apiServis: MyApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.KullaniciListele();
    if (this.apiServis.oturumKontrol()) {
      this.uAdi = localStorage.getItem("uAdi");
    }
  }

  OturumAcDialog() {
    this.matDialog.open(GirisDialogComponent, {
      width: '280px',
      height: '250px',
    });
  }



  OturumKapat() {
    localStorage.clear();
    this.matDialog.open(GirisDialogComponent, {
      width: '280px',
      height: '250px',

    });
  }

  // ! Kullanıcılar 

  KullaniciListele() {
    this.apiServis.KullaniciListe().subscribe((c: any) => {
      this.kullanicilar = c;
      this.dataSource = new _MatTableDataSource(c);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(c);
    })
  }

  KullaniciEkle() {
    var yeniKayit: User = new User();
    this.dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '260px',
      height: '510px',
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
          this.KullaniciListele();

          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    });
  }

  KullaniciDuzenle(kayit: User) {
    this.dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '500px',
      height: '310px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.userAdi = d.userAdi;
        kayit.userMail = d.userMail;
        kayit.userAdmin = d.userAdmin;


        this.apiServis.KullaniciDuzenle(kayit).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KullaniciListele();

          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    });
  }

  KullaniciSil(kayit: User) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '420px',
      height: '170px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.userAdi + " : Adlı Kullanıcı Silinecektir Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciSil(kayit.userId).subscribe(() => {
          var s: Sonuc = new Sonuc();

          this.alert.AlertUygula(s);
          this.KullaniciListele();
          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    })
  }
}

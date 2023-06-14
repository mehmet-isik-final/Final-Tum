import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/Dialogs/ConfirmDialog/ConfirmDialog.component';
import { GirisDialogComponent } from 'src/app/Dialogs/giris-dialog/giris-dialog.component';
import { KategoriDialogComponent } from 'src/app/Dialogs/kategori-dialog/kategori-dialog.component';
import { UserDialogComponent } from 'src/app/Dialogs/user-dialog/user-dialog.component';
import { Kategoriler } from 'src/app/Models/Kategoriler';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Urunler } from 'src/app/Models/Urunler';
import { User } from 'src/app/Models/User';
import { MyAlertService } from 'src/app/Servisler/my-alert.service';
import { MyApiService } from 'src/app/Servisler/myApi.service';

@Component({
  selector: 'app-ekle-duzenle',
  templateUrl: './ekle-duzenle.component.html',
  styleUrls: ['./ekle-duzenle.component.css']
})
export class EkleDuzenleComponent implements OnInit {

  uAdi !: any;

  kategoriler !: Kategoriler[];
  kategori !: Kategoriler;
  urunler !: Urunler[];


  events: string[] = [];
  dataSource !: any;
  displayedColumns = ['katAdi', 'katId', 'islemler']

  opened!: boolean;

  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<KategoriDialogComponent>;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    public apiServis: MyApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.KategoriListele();
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


  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((c: any) => {
      this.kategoriler = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(c);
    })
  }

  KategoriEkle() {
    var yeniKayit: Kategoriler = new Kategoriler();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '260px',
      height: '220px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(k => {
      if (k) {
        this.apiServis.KategoriEkle(k).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KategoriListele();

          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    });
  }

  KategoriDuzenle(kayit: Kategoriler) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '300px',
      height: '210px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(k => {
      if (k) {
        kayit.katAdi = k.katAdi;

        this.apiServis.KategoriDuzenle(kayit).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KategoriListele();

          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    });
  }

  KategoriSil(kayit: Kategoriler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '360px',
      height: '170px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.katAdi + " : Silinecektir Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(k => {
      if (k) {
        this.apiServis.KategoriSil(kayit.katId).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KategoriListele();
          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    })
  }
}

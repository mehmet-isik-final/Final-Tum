import { Component, OnInit, ViewChild } from '@angular/core';
import { Urunler } from 'src/app/Models/Urunler';
import { MyApiService } from 'src/app/Servisler/myApi.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GirisDialogComponent } from 'src/app/Dialogs/giris-dialog/giris-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/Dialogs/ConfirmDialog/ConfirmDialog.component';
import { MyAlertService } from 'src/app/Servisler/my-alert.service';
import { UrunDialogComponent } from 'src/app/Dialogs/urun-dialog/urun-dialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { MatPaginator } from '@angular/material/paginator';
import { Kategoriler } from 'src/app/Models/Kategoriler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Uye-Home-Page',
  templateUrl: './Uye-Home-Page.component.html',
  styleUrls: ['./Uye-Home-Page.component.css']
})
export class UyeHomePageComponent implements OnInit {
  katId!: string;
  kategoriler !: Kategoriler[];
  kategori !: Kategoriler;
  dataSource: any;
  urunler !: Urunler[];
  urun !: Urunler;
  urunSecili !: number;
  uAdi !: any;
  hidden = false;
  events: string[] = [];
  opened!: boolean;
  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<UrunDialogComponent>


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    public apiServis: MyApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.UrunListele();

    if (this.apiServis.oturumKontrol()) {
      this.uAdi = localStorage.getItem("uAdi");
    }
  }

  SepeteEkle() {

  }

  // * Oturum İşlemleri

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

  //  * Ürün İşlemleri

  UrunListele() {
    this.apiServis.UrunListele().subscribe((c: any) => {
      this.urunler = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      console.log(c);
    })
  }
  UrunEkle() {
    var yeniKayit: Urunler = new Urunler();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '490px',
      height: '520px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(u => {
      if (u) {
        this.apiServis.UrunEkle(u).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.UrunListele();
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    });
  }

  UrunSil(kayit: Urunler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '420px',
      height: '190px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunAdi + " : Silinecektir Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UrunSil(kayit.urunId).subscribe(() => {
          var s: Sonuc = new Sonuc();

          this.alert.AlertUygula(s);
          this.UrunListele();
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }
}


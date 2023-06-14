import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/Dialogs/ConfirmDialog/ConfirmDialog.component';
import { GirisDialogComponent } from 'src/app/Dialogs/giris-dialog/giris-dialog.component';
import { UrunDialogComponent } from 'src/app/Dialogs/urun-dialog/urun-dialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Urunler } from 'src/app/Models/Urunler';
import { MyAlertService } from 'src/app/Servisler/my-alert.service';
import { MyApiService } from 'src/app/Servisler/myApi.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-uyeUrunDetay',
  templateUrl: './uyeUrunDetay.component.html',
  styleUrls: ['./uyeUrunDetay.component.css']
})
export class UyeUrunDetayComponent implements OnInit {
  urunId !: string;
  urun!: Urunler;
  urunler !: Urunler[];
  uAdi !: any;

  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<UrunDialogComponent>
  opened!: boolean;

  constructor(
    public apiServis: MyApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.urunId = p.urunId;

        this.UrunListele();
        console.log(p);
      }

      if (this.apiServis.oturumKontrol()) {
        this.uAdi = localStorage.getItem("uAdi");
      }

    })
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



  UrunListele() {
    this.apiServis.UrunById(this.urunId).subscribe((u: any) => {
      this.urun = u;
      console.log(u);
    })
  }

  UrunDuzenle(kayit: Urunler) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '490px',
      height: '520px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.urunAdi = d.urunAdi;
        kayit.urunBilgi = d.urunBilgi;
        kayit.urunFiyat = d.urunFiyat;
        kayit.urunStok = d.urunStok;
        kayit.urunKat = d.urunKat;
        kayit.urunResim = d.urunResim;
        kayit.urunKayit = d.urunKayit;
        kayit.urunDeger = d.urunDeger;
        kayit.urunDuzenlenme = d.urunDuzenlenme;
        this.apiServis.UrunDuzenle(kayit).subscribe(() => {
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


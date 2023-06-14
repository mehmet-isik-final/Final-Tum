import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategoriler } from 'src/app/Models/Kategoriler';
import { Urunler } from 'src/app/Models/Urunler';
import { MyApiService } from 'src/app/Servisler/myApi.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {

  urunler !: Urunler[];
  urun !: Urunler;

  kategoriler !: Kategoriler[];
  kategori !: Kategoriler;

  standalone!: true;

  dialogBaslik !: string;

  yeniKayit!: Urunler;

  islem !: string;

  dataSource: any;

  urunForm: FormGroup = new FormGroup({
    urunId: new FormControl(),
    urunAdi: new FormControl(),
    urunBilgi: new FormControl(),
    urunFiyat: new FormControl(),
    urunKat: new FormControl(),
    urunDeger: new FormControl(),
    urunStok: new FormControl(),
    urunResim: new FormControl(),
    urunKayit: new FormControl(),
    urunDuzenlenme: new FormControl(),

  });
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: MyApiService

  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Ürün'ü Ekle";
      this.yeniKayit = new Urunler();
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Ürün'ü Düzenle"
      this.yeniKayit = data.kayit;
    }
  }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((c: any) => {
      this.kategoriler = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort
      console.log(c);
    })
  }
}

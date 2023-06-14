import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kategoriler } from 'src/app/Models/Kategoriler';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik !: string;
  yeniKategori!: Kategoriler;
  islem !: string;
  frm: FormGroup = new FormGroup({
    katAdi: new FormControl(),
    katId: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Kategori Ekle";
      this.yeniKategori = new Kategoriler();
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Kategori Düzenle"
      this.yeniKategori = data.kayit;
    }

  }

  ngOnInit() {
  }

}

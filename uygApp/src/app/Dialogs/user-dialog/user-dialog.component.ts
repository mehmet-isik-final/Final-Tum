import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/Models/User';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  dialogBaslik !: string;

  yeniKayit!: User;

  islem !: string;

  frm: FormGroup = new FormGroup({
    userAdi: new FormControl(),
    userMail: new FormControl(),
    userSifre: new FormControl(),
    userAdmin: new FormControl(),

  });
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Kullanıcı Ekle";
      this.yeniKayit = new User();
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Kullanıcı Düzenle"
      this.yeniKayit = data.kayit;
    }

  }

  ngOnInit() {
  }

}

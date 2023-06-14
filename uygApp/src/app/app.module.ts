import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Form, FormGroup, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/Home-Page/Home-Page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApiService } from './Servisler/myApi.service';
import { MyAlertService } from './Servisler/my-alert.service';
import { MyAlertDialogComponent } from './Dialogs/my-alert-dialog/my-alert-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { EkleDuzenleComponent } from './Components/ekle-duzenle/ekle-duzenle.component';
import { GirisDialogComponent } from './Dialogs/giris-dialog/giris-dialog.component';
import { UserDialogComponent } from './Dialogs/user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from './Dialogs/ConfirmDialog/ConfirmDialog.component';
import { UrunDialogComponent } from './Dialogs/urun-dialog/urun-dialog.component';
import { KategoriDialogComponent } from './Dialogs/kategori-dialog/kategori-dialog.component';
import { UserEkleDuzenleComponent } from './Components/user-ekle-duzenle/user-ekle-duzenle.component';
import { UrunDetayComponent } from './Components/urunDetay/urunDetay.component';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './Pipes/safeHtml-pipe.pipe';
import { Authinterceptor } from './Servisler/Authinterceptor';
import { AuthGuard } from './Servisler/AuthGuard';
import { UyeHomePageComponent } from './Components/Uye-Home-Page/Uye-Home-Page.component';
import { UyeUrunDetayComponent } from './Components/uyeUrunDetay/uyeUrunDetay.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EkleDuzenleComponent,
    UrunDetayComponent,

    // * Dialoglar  :
    MyAlertDialogComponent,
    GirisDialogComponent,
    UserDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
    UserEkleDuzenleComponent,
    SafeHtmlPipe,
    UyeHomePageComponent,
    UyeUrunDetayComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,


  ],
  providers: [MyAlertService, MyApiService, SafeHtmlPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

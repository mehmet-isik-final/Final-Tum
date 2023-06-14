import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Home-Page/Home-Page.component';
import { EkleDuzenleComponent } from './Components/ekle-duzenle/ekle-duzenle.component';
import { UserEkleDuzenleComponent } from './Components/user-ekle-duzenle/user-ekle-duzenle.component';
import { UrunDetayComponent } from './Components/urunDetay/urunDetay.component';
import { AuthGuard } from './Servisler/AuthGuard';
import { ComponentPortal } from '@angular/cdk/portal';
import { UyeHomePageComponent } from './Components/Uye-Home-Page/Uye-Home-Page.component';
import { UyeUrunDetayComponent } from './Components/uyeUrunDetay/uyeUrunDetay.component';


const routes: Routes = [

  {
    path: '',
    component: UyeHomePageComponent

  },
  {
    path: 'adminHome',
    component: HomePageComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      geri : ""
    }
  },
  {
    path: 'urun/:urunId',
    component: UrunDetayComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      geri : ""
    }


  },

  {
    path: 'uyeUrun/:urunId',
    component: UyeUrunDetayComponent


  },
  {
    path: 'ekleduzenle',
    component: EkleDuzenleComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      geri : ""
    }
  },
  {
    path: 'userekleduzenle',
    component: UserEkleDuzenleComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      geri : ""
    }

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

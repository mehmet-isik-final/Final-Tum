import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urunler } from '../Models/Urunler';
import { User } from '../Models/User';
import { Kategoriler } from '../Models/Kategoriler';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  apiUrl = "http://localhost:62350/api/";
  constructor(
    public http: HttpClient

  ) { }

  tokenAl(userAdi: string, parola: string) {
    var data = "username=" + userAdi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "token", data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  YetkiKontrol(yetkiler: any) {
    var sonuc: boolean = false;
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri") || "");
    if (uyeYetkileri) {
      yetkiler.forEach((element: string): any => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      })
    } 
    return sonuc;
  }
  


  // !  Ürünler

  UrunListele() {
    return this.http.get(this.apiUrl + "urunlistele");
  }

  UrunById(urunId: string) {
    return this.http.get(this.apiUrl + "urunbyid/" + urunId);
  }

  UrunEkle(urun: Urunler) {
    return this.http.post(this.apiUrl + "urunekle", urun);
  }

  UrunDuzenle(urun: Urunler) {
    return this.http.put(this.apiUrl + "urunduzenle", urun);
  }

  UrunSil(urunId: string) {
    return this.http.delete(this.apiUrl + "urunsil/" + urunId);
  }

  // ! Kullanıcı
  KullaniciListe() {
    return this.http.get(this.apiUrl + "kullanicilistele");
  }

  KullaniciById(userId: string) {
    return this.http.get(this.apiUrl + "kullanicibyid/" + userId);
  }

  KullaniciEkle(user: User) {
    return this.http.post(this.apiUrl + "kullaniciekle", user);
  }

  KullaniciDuzenle(user: User) {
    return this.http.put(this.apiUrl + "kullaniciduzenle", user);
  }

  KullaniciSil(userId: string) {
    return this.http.delete(this.apiUrl + "kullanicisil/" + userId);
  }

  // ! Kategori

  KategoriListe() {
    return this.http.get(this.apiUrl + "kategorilistele");
  }

  KategoriById(katId: string) {
    return this.http.get(this.apiUrl + "kategoribyid/" + katId);
  }

  KategoriEkle(kat: Kategoriler) {
    return this.http.post(this.apiUrl + "kategoriekle", kat);
  }

  KategoriDuzenle(kat: Kategoriler) {
    return this.http.put(this.apiUrl + "kategoriduzenle", kat);
  }

  KategoriSil(katId: string) {
    return this.http.delete(this.apiUrl + "kategorisil/" + katId);
  }
}

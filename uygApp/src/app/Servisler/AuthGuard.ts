import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MyApiService } from "./myApi.service";
import { MyAlertService } from "./my-alert.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public apiServis: MyApiService,
        public alert: MyAlertService,
        public router: Router
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var yetkiler = route.data["yetkiler"] as Array<string>;
        var gitUrl = route.data["geri"] as string;
        if (!this.apiServis.oturumKontrol() || !yetkiler || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }
        var sonuc: boolean = false;

        sonuc =this.apiServis.YetkiKontrol(yetkiler);
        if (!sonuc){
            this.router.navigate([gitUrl])
        } 
        return sonuc;
    }

}
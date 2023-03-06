import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): true | UrlTree {
        console.log("Url: " + url)
        let val: string | null = localStorage.getItem('isUserLoggedIn');

        if (val != null && val == "true") {
            if (url == "/login")
                    this.router.parseUrl('home');
            else
                return true;
        } else {
            return this.router.parseUrl('login');
        }
        return this.router.parseUrl('login');
    }
}
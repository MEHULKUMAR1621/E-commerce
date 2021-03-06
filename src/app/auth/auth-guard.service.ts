import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | Observable<boolean>  | Promise<boolean> {
        const isAuth = this.authService.getIsAuth();
        if(!isAuth){
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true;
        }
    }


}
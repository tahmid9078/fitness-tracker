import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authSerive: AuthService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        if(this.authSerive.isAuth()){
            return true;
        }
        else{
            this.router.navigate(["/login"]);
        }
    }

}
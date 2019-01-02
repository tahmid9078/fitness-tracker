import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    
    private user: User;
    authChange = new Subject<boolean>();
    
    constructor(private router: Router){

    }
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString()
        };
        this.authSuccessful();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString()
        };
        this.authSuccessful();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(["/login"]);
    }

    isAuth() {
        return this.user != null;
    }

    getUser() {
        return {...this.user};
    }
    
    private authSuccessful(){
        this.authChange.next(true);
        this.router.navigate(["/training"]);
    }
}
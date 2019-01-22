import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui-service';

@Injectable()
export class AuthService {
    
    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    
    constructor(private router: Router, 
        private authDb: AngularFireAuth, 
        private traningService: TrainingService,
        private uiService: UIService
        ){}

    initAuthListener(){
        this.authDb.authState.subscribe(user =>{
            if(user){
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(["/training"]);
            }
            else{
                this.traningService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(["/login"]);
                this.isAuthenticated = false;
            }
        })
    }

    registerUser(authData: AuthData) {
        this.uiService.isLoadingChanged.next(true);
        this.authDb
            .auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result =>{
                this.uiService.isLoadingChanged.next(false);
                console.log(result);
                        
            })
            .catch(err =>{
                this.uiService.isLoadingChanged.next(false);
                this.uiService.showSnackBar(err.message, null, 3000);
            });
        
    }

    login(authData: AuthData) {
        this.uiService.isLoadingChanged.next(true);
        this.authDb
            .auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result =>{      
                this.uiService.isLoadingChanged.next(false);
            })
            .catch(err =>{
                this.uiService.isLoadingChanged.next(false);
                this.uiService.showSnackBar(err.message, null, 3000);
            });
        
    }

    logout() {
        this.authDb.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}
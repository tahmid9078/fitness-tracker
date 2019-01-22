import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
    
    isLoadingChanged = new Subject<boolean>();

    constructor(
        private matSnackBar: MatSnackBar
    ){}

    showSnackBar(message, action , duration) {
        this.matSnackBar.open( message, action, {
            duration: duration
        });
    }
}
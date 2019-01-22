import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter(); 
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    });
  }

  onItemClick(){
    this.closeSidenav.emit();
  }

  onLogout(){
    this.onItemClick();
    this.authService.logout();
  }

  ngOnDestroy(){
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;
  isLoadingSubscription : Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService
    ) { }

  ngOnInit() {
    this.isLoadingSubscription = this.uiService.isLoadingChanged.subscribe( isLoading =>{
      this.isLoading = isLoading;
    });
  }
  
  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}

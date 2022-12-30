import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoggedIn = true;
    isLoading = false;
    error: string = null;
    
    constructor(private authService: AuthService, private router: Router) {}
    
    onSwitchMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }
    
    onSubmit(form: NgForm) {

        let authObs: Observable<AuthResponseData>;

        if(!form.valid) {
            return;
        }

        this.isLoading = true;

        if(this.isLoggedIn) {
            authObs = this.authService.login(form.value.email, form.value.password);
        }
        else {
            authObs = this.authService.signUp(form.value.email, form.value.password);
        }

        authObs.subscribe(data => {
            console.log(data);
            this.isLoading = false;
            this.router.navigate(["/recipes"])
        },
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage
            this.isLoading = false;
        });

        form.reset();
    }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2OAZagY_vD2FHhRLa98LogVQwVJ8x35M", 
            {email: email, password: password, returnSecureToken: true}
        )
        .pipe(catchError(this.handleError), tap(data => {
            this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn)
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2OAZagY_vD2FHhRLa98LogVQwVJ8x35M",
            {email: email, password: password, returnSecureToken: true}
            )
            .pipe(catchError(this.handleError), tap(data => {
                this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn)
            }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem("userData");
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

        if(loadedUser.token) {
            this.user.next(loadedUser);
            this.autoLogout(expirationDuration);
        }
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred!";
        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "This email exists already!";
                break;
            case "OPERATION_NOT_ALLOWED":
                errorMessage = "Password sign-in is disabled";
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "There is no user record corresponding to this identifier.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is invalid or the user does not have a password.";
                break;

        }
        return throwError(errorMessage);
    }

}

import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(user) {
      //console.log(user);
      //return this.http.post(this.baseUrlApi + '/login', user);
        return this.http.post('http://localhost:8080/api/books/login', user)
            .subscribe(res => this.setSession(res), error => { console.log(error); });
    }

    private setSession(authResult) {
       console.log(authResult);
        //const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('token', authResult.user.token);
        console.log(localStorage.getItem('token'));
        //localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return localStorage.getItem('token') != null;
        //return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}

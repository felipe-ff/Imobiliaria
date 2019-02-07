import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
      this.setLocation();
    }

    baseUrl;
    baseUrlApi;

    setLocation() {
      const port = isDevMode() ? '8081' : '';
      const url = isDevMode() ? 'http://localhost:' : 'https://imobiliaria-db.appspot.com';
      this.baseUrlApi = url + port + '/api/books';
      this.baseUrl = url + port;
    }

    login(user) {
        return this.http.post(this.baseUrlApi + '/login', user);
    }

    setSession(authResult) {
        const expiresAt = moment().add(300, 'second');

        localStorage.setItem('token', authResult.user.token);
        console.log(localStorage.getItem('token'));
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return localStorage.getItem('token') != null && moment().isBefore(this.getExpiration());
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

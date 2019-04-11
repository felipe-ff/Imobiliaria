import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  create(vehicle) {
      return this.http.post(this.vehicleEndpoint, vehicle, this.addHeaders());
  }

  addHeaders() {
      const access_token = localStorage.getItem('access_token');
      return { headers: new HttpHeaders().set('Authorization', `Bearer
  ${access_token}`) };
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/auth/me').toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}

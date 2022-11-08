import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private serviceUrl: string = "";
  constructor(private http: HttpClient) {
    this.serviceUrl = environment.serviceUrl;
  }
  getUserById(id) {
    var token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}`}
    return this.http.get<any>(`${this.serviceUrl}/users/${id}`, { headers })
  }
}

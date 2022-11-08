import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private serviceUrl: string = "";
  constructor(private http: HttpClient) {
    this.serviceUrl = environment.serviceUrl;
  }
  login(cred) {
    return this.http.post<any>(`${this.serviceUrl}/authaccount/login`, cred)
  }
}

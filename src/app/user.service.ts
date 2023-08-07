import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './register';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Leave } from './leave';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080";
  _service: any;
  constructor(private httpClient: HttpClient, private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  
  userRegister(register: Register) {
    return this.httpClient.post(`${this. baseURL}/register`, register, { responseType: 'text' as 'json' });
  }

  login(register: Register) {
    return this.httpClient.post(`${this. baseURL}/login`, register, { responseType: 'text' as 'json' });
  }

  getUser(register: Register): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${register.email}`);
  }

  sendMail(leave: Leave): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/sendEmail`,leave, { responseType: 'text' as 'json' });
  }
}

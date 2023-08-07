import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Leave } from './leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseURL = "http://localhost:8080/leave";
  constructor(private httpClient: HttpClient, private router: Router) { }

  addLeave(leave: Leave) {
    return this.httpClient.post(`${this. baseURL}/add`, leave, { responseType: 'text' as 'json' });
  }
  getAllLeave(leave: Leave): Observable<any> {
    return this.httpClient.post(`${this. baseURL}`,leave);
  }
  getPendingLeave(): Observable<any> {
    return this.httpClient.get(`${this. baseURL}/getPendingLeave`);
  }
  getLeaves(): Observable<any> {
    return this.httpClient.get(`${this. baseURL}/getleave`);
  }
  getLeave(id:Number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, { responseType: 'text' as 'json' });
  }
  updateLeave(leave: Leave) {
    return this.httpClient.put(`${this.baseURL}/update`, leave, { responseType: 'text' as 'json' });
  }
  updateLeaveWithid(id : Number,leave: Leave) {
    return this.httpClient.put(`${this.baseURL}/update/${id}`,leave, { responseType: 'text' as 'json' });
  }
  deleteLeave(id: Number) {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}

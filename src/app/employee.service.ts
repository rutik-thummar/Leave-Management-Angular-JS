import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { MonthReport } from './month-report';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = "http://localhost:8080/employee";
  private baseURLForLeaveReport = "http://localhost:8080/leave";
  private pdf = "http://localhost:8080/payslip";

  constructor(private httpClient: HttpClient, private router: Router) { }

  addEmployee(employee: Employee) {
    return this.httpClient.post(`${this.baseURL}/add`, employee, { responseType: 'text' as 'json' });
  }

  getAllEmployee(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}`);
  }
  getEmployeeById(id:Number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, { responseType: 'text' as 'json' });
  }
  getEmployeeByName(name:String): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getData?name=${name}`);
  }
  deleteEmployee(id: Number) {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
  updateEmployee(employee: Employee) {
    return this.httpClient.put(`${this.baseURL}/update`, employee, { responseType: 'text' as 'json' });
  }

  getEmployeeByEmail(email: String): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get?email=${email}`);
  }

  getEmployeeReportByName(name:String): Observable<any> {
    return this.httpClient.get(`${this.baseURLForLeaveReport}?name=${name}`);
  }
  generatePdf(monthyear:MonthReport): Observable<any> {
    return this.httpClient.post(`${this.pdf}/generatepdf`, monthyear, {responseType: 'text'});
  }
  downloadPdf(monthyear:MonthReport): Observable<any> {
    return this.httpClient.post(`${this.pdf}/downloadpdf`, monthyear, {
      responseType: 'blob'
    });
  }
}

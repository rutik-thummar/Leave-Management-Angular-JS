import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _service: UserService, private _employeeservice: EmployeeService) { }
  email: any;
  name: any;
  
  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail');
    this._employeeservice.getEmployeeByEmail(this.email).subscribe(data => {
      this.name = data.firstName;
    }
    )
  }

  logout(): void {
    this._service.logout();
    localStorage.removeItem('userEmail');
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  emp: Employee = new Employee();
  constructor(private _service: EmployeeService, private _router: Router, private _activedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    let id = this._activedRoute.snapshot.params['id'];
    this._service.getEmployeeById(id).subscribe(
      data => {
        this.emp = data;
        this.emp = JSON.parse(data);
      })
  }

  updateEmployee() {
    if (this.emp.firstName == '' || this.emp.firstName == null || this.emp.lastName == '' || this.emp.lastName == null || this.emp.email == '' || this.emp.email == null
      || this.emp.salary == '' || this.emp.salary == null || this.emp.designation == '' || this.emp.designation == null || this.emp.mobileNo == '' || this.emp.mobileNo == null) {
      return;
    }
    if (this.emp.mobileNo.length != 10) {
      Swal.fire({ text:'Mobile No is must be 10 digit'})
      return;
    }
    this._service.updateEmployee(this.emp).subscribe(data => {
      data = this.emp;
      Swal.fire("Good job!", "Employee Updated!", "success");
      this._router.navigate(['admin/view']);
    })
  }
}

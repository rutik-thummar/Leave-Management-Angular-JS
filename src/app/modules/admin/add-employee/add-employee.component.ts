import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  emp: Employee = new Employee();
  constructor(private _service: EmployeeService, private _router: Router) { }
  FinalMonth: any;
  FinalDay: any;
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentmonth = this.date1.getUTCMonth() + 1;
  currentdate = this.date1.getUTCDay() - 1;
  ngOnInit(): void {
    this.emp.gender = "Male";
    if (this.currentmonth < 10) {
      this.FinalMonth = "0" + this.currentmonth;
    } else {
      this.FinalMonth = this.currentmonth;
    }
    if (this.currentdate < 10) {
      this.FinalDay = "0" + this.currentdate;
    } else {
      this.FinalDay = this.currentdate;
    }
    this.emp.joiningDate = this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;
  }
  addEmployee() {
    if (this.emp.firstName == '' || this.emp.firstName == null || this.emp.lastName == '' || this.emp.lastName == null || this.emp.mobileNo == '' || this.emp.mobileNo == null ||
      this.emp.mobileNo.length != 10 || this.emp.email == '' || this.emp.email == null || this.emp.salary == '' || this.emp.salary == null || this.emp.designation == '' || this.emp.designation == null
    ) {
      return;
    }
    this._service.addEmployee(this.emp).subscribe(data => {
      data = this.emp;
      Swal.fire("Good job!", "Employee Added!", "success");
      this._router.navigate(['admin/view']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Failed...',
        text: 'Please enter valid details!',
      }).then(e => {
        this._router.navigate(['admin/add']);
      });
    })
  }
}

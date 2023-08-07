
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { saveAs } from 'file-saver-es';
import { MonthReport } from 'src/app/month-report';
import Swal from 'sweetalert2';
import { data } from 'jquery';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _employeeservice: EmployeeService) { }
  email: any;
  emp: Employee = new Employee();
  gender: boolean;
  FinalMonth: any;
  curDate = new Date();
  currentmonth = this.curDate.getUTCMonth() + 1;
  monthyear: MonthReport = new MonthReport();
  ngOnInit(): void {
    if (this.currentmonth < 10) {
      this.FinalMonth = "0" + this.currentmonth;
    } else {
      this.FinalMonth = this.currentmonth;
    }
    this.monthyear.monthOrYear = this.curDate.getUTCFullYear() + "-" + this.FinalMonth;
    this.email = localStorage.getItem('userEmail');
    this._employeeservice.getEmployeeByEmail(this.email).subscribe(data => {
      this.emp = data;
      if (data.gender == "Male") {
        this.gender = true;
      } else {
        this.gender = false;
      }
    }
    )
  }

  download() {
    this.monthyear.id = this.emp.id;
    this._employeeservice.generatePdf(this.monthyear).subscribe(
      data => {
        this._employeeservice.downloadPdf(this.monthyear).subscribe(
          blob => saveAs(blob, "Payslip_" + this.monthyear.monthOrYear + "_" + this.emp.firstName + ".pdf")
        )
      }, error => {
        Swal.fire('Please Selete Month')
      }
    )
  }
}

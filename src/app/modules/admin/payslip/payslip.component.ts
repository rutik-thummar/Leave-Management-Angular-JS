import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { MonthReport } from 'src/app/month-report';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver-es';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent {
  constructor(private _service: EmployeeService, public fb: FormBuilder, private _employeeservice: EmployeeService) { }
  emps!: Employee[];
  emp: Employee = new Employee();
  monthyear: MonthReport = new MonthReport();
  leaveReportForm = this.fb.group({
    firstName: ['', [Validators.required]],
    selectedDate: Date || null,
  })


  FinalMonth: any;
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentmonth = this.date1.getUTCMonth() + 1;


  ngOnInit(): void {
    if (this.currentmonth < 10) {
      this.FinalMonth = "0" + this.currentmonth;
    } else {
      this.FinalMonth = this.currentmonth;
    }
    this.monthyear.monthOrYear = this.currentYear + "-" + this.FinalMonth;
    this._service.getAllEmployee().subscribe(
      data => {
        this.emps = data;
      }
    );
  }


  download() {
    if (!this.leaveReportForm.valid) {
      Swal.fire('Please Select Employee')
    } else {
      this._service.getEmployeeByName(this.leaveReportForm.value.firstName!).subscribe(data => {
        this.emp = data;
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
      })


    }
  }

}

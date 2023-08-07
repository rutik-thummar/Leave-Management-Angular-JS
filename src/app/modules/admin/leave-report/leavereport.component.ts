import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/leave';
import { LeaveService } from 'src/app/leave.service';
import Swal from 'sweetalert2';
import 'DataTables.net';
import * as $ from 'jquery';

@Component({
  selector: 'leave-report',
  templateUrl: './leavereport.component.html',
  styleUrls: ['./leavereport.component.css']
})
export class LeaveReportComponent implements OnInit {
  firstName = String;
  emps: Employee[];
  emp: Employee = new Employee();
  leave: Leave = new Leave();
  leaves: Leave[];
  leavess: Leave[];
  constructor(private _service: EmployeeService, private services: LeaveService, private service: LeaveService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this._service.getAllEmployee().subscribe(
      data => {
        this.emps = data;
      }
    );
    this.services.getLeaves().subscribe(
      data => {
        this.leavess = data;
      }
    );
    setTimeout(() => {
      $(function () {
        $('#dataTable').DataTable({
          paging: true,
        });
      });
    }, 50);

    function closeForm() {
      $('.form-popup-bg').removeClass('is-visible');
      $('.table-reponsive').removeClass('box1');
    }
    $(document).ready(function ($) {
      $('#btnOpenForm').on('click', function (event) {
        event.preventDefault();
        $('.form-popup-bg').addClass('is-visible');

      });
      $('.form-popup-bg').on('click', function (event) {
        if ($(event.target).is('.form-popup-bg') || $(event.target).is('#btnCloseForm')) {
          event.preventDefault();
          window.location.reload();
          $(this).removeClass('is-visible');
          $('.table-reponsive').removeClass('box1');

        }
      });
    });
  }
  onSubmit() {
    if (!this.leaveReportForm.valid) {
      Swal.fire('Please Select Employee')
    } else {
      this._service.getEmployeeReportByName(this.leaveReportForm.value.firstName!).subscribe(data => {
        this.leaves = data;
        $('.form-popup-bg').addClass('is-visible');
        $('.table-reponsive').addClass('box1');
        setTimeout(() => {
          $(function () {
            $('#leaveDataTable').DataTable({
              pageLength: 10,
              paging: true,
              lengthChange: false,
            });
          });
        }, 50);
      })
    }
  }

  leaveReportForm = this.fb.group({
    firstName: ['', [Validators.required]]
  })

  approveLeave(id: Number) {
    this.leave.status = "Approved";
    this.service.updateLeaveWithid(id, this.leave).subscribe(data => {
      data = this.leave;
      Swal.fire("success", "Leave Approve  Successfully", "success").then(e => {
        $('.form-popup-bg').removeClass('is-visible');
        $('.table-reponsive').removeClass('box1');
        window.location.reload();
      })
    })
  }

  rejectdLeave(id: Number) {
    this.leave.status = "Rejected";
    this.service.updateLeaveWithid(id, this.leave).subscribe(data => {
      data = this.leave;
      Swal.fire("success", "Rejected  Successfully", "success").then(e => {
        $('.form-popup-bg').removeClass('is-visible');
        $('.table-reponsive').removeClass('box1');
        window.location.reload();
      })
    })
  }
}

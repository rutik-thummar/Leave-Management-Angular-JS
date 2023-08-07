import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leave } from 'src/app/leave';
import { LeaveService } from 'src/app/leave.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'DataTables.net';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit {
  leaves: Leave[];
  leave: Leave = new Leave();
  maxDate = new Date();
  FinalMonth: any;
  FinalDay: any;
  curDate = new Date();
  currentmonth = this.curDate.getUTCMonth() + 1;
  currentdate = this.curDate.getUTCDay() - 1;
  maxDayInMonth = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() + 1, 0).getDate();
  constructor(private _router: Router, private _service: LeaveService, private userService: UserService) { }
  ngOnInit(): void {
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
    this.maxDate = new Date(this.curDate.getUTCFullYear() + "-" + this.currentmonth + "-" + this.maxDayInMonth);
    this.leave.fromDate = this.curDate.getUTCFullYear() + "-" + this.FinalMonth + "-" + this.FinalDay;
    this.leave.toDate = this.curDate.getUTCFullYear() + "-" + this.FinalMonth + "-" + this.FinalDay;
    this.leave.email = localStorage.getItem('userEmail')!;
    if (this.leave.type == null) {
      this.leave.type = "Full"
    }
    this.leave.slot = "Morning"
    this._service.getAllLeave(this.leave).subscribe(
      data => {
        this.leaves = data;
      }
    );
    setTimeout(() => {
      $(function () {
        $('#dataTable').DataTable({
          pageLength: 10,
          paging: true,
          lengthChange: false,
        });
      });
    }, 200);
    $(document).ready(function ($) {
      $('#btnOpenForm').on('click', function (event) {
        event.preventDefault();
        $('.form-popup-bg').addClass('is-visible');
      });
      $('.form-popup-bg').on('click', function (event) {
        if ($(event.target).is('.form-popup-bg') || $(event.target).is('#btnCloseForm')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
          window.location.reload();
        }
      });
      $('.form-popup-bg-update').on('click', function (event) {
        if ($(event.target).is('.form-popup-bg-update') || $(event.target).is('#btnCloseFormForUpdate')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
          window.location.reload();
        }
      });
    });
  }

  addLeave() {
    if (this.leave.type == 'Half') {
      this.leave.toDate = this.leave.fromDate;
    }
    if (this.leave.fromDate > this.leave.toDate) {
      Swal.fire('Please select valid date!')
      return;
    }
    if (this.leave.reason == '' || this.leave.reason == null) {
      Swal.fire('Reason is required!')
      return;
    }
    const fromDate = new Date(this.leave.fromDate);
    const toDate = new Date(this.leave.toDate);
    var fromMonth = fromDate.getMonth() + 1;
    var toMonth = toDate.getMonth() + 1;
    if (fromMonth != toMonth) {
      // var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // var monthName = monthNames[fromMonth - 1];
      Swal.fire('Please Selete Same Month')
      return;
    }
    this.leave.status = "Pending";
    this._service.addLeave(this.leave).subscribe(data => {
      data = this.leave;
      this.userService.sendMail(this.leave).subscribe();
      Swal.fire({
        icon: 'success',
        title: 'Leave Added Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(e => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email Sent!',
          showConfirmButton: false,
          timer: 800
        }).then(e => {
          $('.form-popup-bg').removeClass('is-visible');
          window.location.reload();
        })
      });
    })
  }

  updateRecord(id: Number) {
    $('.form-popup-bg-update').addClass('is-visible');
    this._service.getLeave(id).subscribe(
      data => {
        this.leave = JSON.parse(data);
        if (this.leave.type == "Full") {
          this.leave.slot = "Morning"
        }
      })
  }

  updateLeave() {
    if (this.leave.type == 'Half') {
      this.leave.toDate = this.leave.fromDate;
    }
    if (this.leave.fromDate > this.leave.toDate) {
      Swal.fire('Please select valid date!')
      return;
    }
    if (this.leave.reason == '' || this.leave.reason == null) {
      Swal.fire('Reason is required!')
      return;
    }
    const fromDate = new Date(this.leave.fromDate);
    const toDate = new Date(this.leave.toDate);
    var fromMonth = fromDate.getMonth() + 1;
    var toMonth = toDate.getMonth() + 1;
    if (fromMonth != toMonth) {
      // var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // var monthName = monthNames[fromMonth - 1];
      Swal.fire('Please Selete Same Month')
      return;
    }
    this._service.updateLeave(this.leave).subscribe(data => {
      data = this.leave;
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(e => {
        $('.form-popup-bg').removeClass('is-visible');
        this._router.navigate(['user/viewleave']);
        window.location.reload();
      })
    })
  }
  deleteRecord(id: Number) {
    this._service.deleteLeave(id).subscribe(data => {
    })
  }
}

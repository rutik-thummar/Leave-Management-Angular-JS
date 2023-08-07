
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { Leave } from 'src/app/leave';
import { LeaveService } from 'src/app/leave.service';
import Swal from 'sweetalert2';
import 'DataTables.net';
import * as $ from 'jquery';


@Component({
  selector: 'leave',
  templateUrl: './Leave.component.html',
  styleUrls: ['./Leave.component.css'],
})
export class LeaveComponent implements OnInit {

  leaves!: Leave[];
  leave: Leave = new Leave();

  constructor(private service: LeaveService, private _router: Router) { }

  ngOnInit(): void {
    this.service.getPendingLeave().subscribe(
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
    }, 40);
  }

  approveLeave(id: Number) {
    this.leave.status = "Approved";
    this.service.updateLeaveWithid(id, this.leave).subscribe(data => {
      data = this.leave;
      Swal.fire("success", "Leave Approve  Successfully", "success").then(e => {
        window.location.reload();
      })
    })
  }

  rejectdLeave(id: Number) {
    this.leave.status = "Rejected";
    this.service.updateLeaveWithid(id, this.leave).subscribe(data => {
      data = this.leave;
      Swal.fire("success", "Rejected  Successfully", "success").then(e => {
        window.location.reload();
      })
    })
  }
}

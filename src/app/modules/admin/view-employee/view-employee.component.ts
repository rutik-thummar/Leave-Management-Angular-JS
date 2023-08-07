import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "src/app/employee";
import { EmployeeService } from "src/app/employee.service";
import Swal from "sweetalert2";
import 'DataTables.net';
import * as $ from 'jquery';




@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  emps: Employee[];
  constructor(private _service: EmployeeService, private _router: Router) { }
  ngOnInit(): void {
    this._service.getAllEmployee().subscribe(
      data => {
        this.emps = data;
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
    }, 100);
  }

  deleteRecord(id: Number) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteEmployee(id).subscribe(
          data => {
            if (data == null) {
              Swal.fire('Please Remove All Leaves')
            }
          }, success => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Employee Deleted Successfully',
              showConfirmButton: false,
              timer: 1500
            }).then(e => {
              window.location.reload();
            })
          }
        );
      }
    })
  }
  updateRecord(id: Number) {
    this._router.navigate(['admin/update', id]);
  }
}

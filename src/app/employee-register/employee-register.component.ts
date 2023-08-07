import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Register } from '../register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  register: Register = new Register();
  constructor(private _service: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.register.role = "USER_ROLE";
  }

  empRegister() {
    if (this.register.name == '' || this.register.name == null || this.register.email == '' || this.register.email == null || this.register.password == '' || this.register.password == null
    ) {
      return;
    }
    if (this.register.password !== this.register.confirmPassword || this.register.password.length < 8) {
      Swal.fire({ text:'Please valid Password and repeat password'})

      return;
    }
    this._service.userRegister(this.register).subscribe(data => {
      data = this.register;
      Swal.fire("success", "Register Successfully", "success").then(e => {
        this._router.navigate(['login'])
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Failed...',
        text: 'Please Contact Your Administrator!',
      })
    })
  }

}

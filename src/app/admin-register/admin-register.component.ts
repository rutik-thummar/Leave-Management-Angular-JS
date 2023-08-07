import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  register: Register = new Register();

  constructor(private _service: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.register.role = "ADMIN_ROLE";
  }
  adminRegister() {
    if (this.register.name == '' || this.register.name == null||this.register.email == '' || this.register.email == null) {
      Swal.fire({ text:'Please enter valid details'})
      return;
    }
    if (this.register.password == '' || this.register.password == null||this.register.password.length < 8||this.register.password !== this.register.confirmPassword) {
      Swal.fire({ text:'Please enter valid Password and repeat password'})
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
        text: 'something went wrong!',
      })
    })
  }
}

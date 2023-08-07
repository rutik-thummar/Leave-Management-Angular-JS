import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../register';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register: Register = new Register();
  constructor(private _service: UserService, private _router: Router) { }
  ngOnInit(): void {
  }
  login() {
    if (this.register.email == '' || this.register.email == null||this.register.password == '' || this.register.password == null) {
      Swal.fire({ text:'Please enter valid details'})
      return;
    }
    this._service.login(this.register).subscribe(
      data => {
        this._service.getUser(this.register).subscribe(
          data => {
            this.register=data;
            if (this.register.role === "USER_ROLE") {
              localStorage.setItem('userEmail', JSON.stringify(this.register.email));
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(e=>{
                this._router.navigate(['user'])
            })            
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(e=>{
                this._router.navigate(['admin']);
            })
            }
          }
        )
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login Failed! Please Try Again...',
        })
      }
    )
  }
}

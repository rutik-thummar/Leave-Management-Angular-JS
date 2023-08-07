import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _service: UserService) {}

  ngOnInit(): void {
  }
    
  logout() {
    this._service.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import {AuthService} from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};

  constructor(private _auth: AuthService, private _router: Router) {
  }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        resp => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
          this._router.navigate(['/special'])
        },
        err => console.log(err)
      )
  }

}

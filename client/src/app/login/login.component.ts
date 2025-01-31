import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private _auth: AuthService, private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
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

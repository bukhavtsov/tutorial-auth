import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http'

import {EventService} from '../event.service'

import {Router} from '@angular/router'


@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private _eventService: EventService, private _router: Router) {
  }

  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        resp => this.specialEvents = resp,
        err => {
          if (err.status === 401 && err instanceof HttpErrorResponse) {
            this._router.navigate(['/login'])
          }
        }
      )
  }

}

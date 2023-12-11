import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';

import { PassengerDashboardService } from '../../models/passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.css'],
  template: `
    <div>
      <button (click)="goBack()">
      &lsaquo; Go back
      </button>
      <passenger-form
       [detail]="passenger"
       (update)="onUpdatePassenger($event)">
      </passenger-form>
    </div>
  `
})
export class PasssengerViewerComponent implements OnInit {
  passenger: Passenger;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) { }

  /*
  ngOnInit method has an empty Object that subscribes to the passengerService classes to return a new observeable
  switchMap method merges the function call together 
  */
  ngOnInit() {
    this.route.params
      .switchMap((data: Passenger) =>
        this.passengerService.getPassenger(data.id))
      .subscribe((data: Passenger) => this.passenger = data);

  }
  /*
    onUpdatePassenger method takes and event object as a parameter calls/subscribes to the passengerService classes
    updatePassenger method retuns an a new object with a list of Passengers when called/invoked
  */
  onUpdatePassenger(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passenger = Object.assign({}, this.passenger, event);
      })
  }
  goBack() {
    this.router.navigate(['/passengers']);//imperative routing: telling the component class to use the router//
  }
}
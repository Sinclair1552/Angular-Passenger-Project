import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PassengerDashboardService } from '../../models/passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.css'],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
      </passenger-count>
      <div *ngFor="let passenger of passengers;">
        {{ passenger.fullname }}
      </div>
      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (view)="handleView($event)"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers!: Passenger[];
  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) { }

  /*
  ngOnInit method method taked an event object as a paramater that calls/subscribes to the passengerService classes to return an array of passengers when called/invoked
  */
  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => this.passengers = data);
  }
  /*
  handleEdit method taked an event object as a paramater that calls/subscribes to the passengerService classes
  updatepassenger returns an event object with a list of Passengers when called/invoked
  */
  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
  /*
  handleRemove method takes and event object as a paramater that calls/subscribes to the passengerService classes
removePassenger returns an event object with a list of Passengers when called/invoked
*/
  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      });
  }
  /*
  handleView method takes an event object with a type Passenger that uses dynamic imperative routing to route to particular passengers based on their ID
  */
  handleView(event: Passenger) {
    this.router.navigate(['/passengers', event.id]);
  }
}
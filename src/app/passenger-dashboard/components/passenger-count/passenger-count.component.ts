import { Component, Input } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
import * as _ from 'lodash';
import { filter, map } from 'rxjs/operators';


@Component({
    selector: 'passenger-count',
    template: `
    <div>
    <h3>Airline Passengers!</h3>
    <div>
     Total checked in: {{ items?.length }}
    </div>
    </div>
    `
})

/*
checkedIn method takes a number event and uses the filter method to return the number of passengers that are checkedIn
*/
export class PassengerCountComponent {
    @Input()
    items: Passenger[] = [];
    checkedInCount(): number {
        if (this.items) return 0;
        return this.items._filter((passenger: Passenger) => passenger.checkedIn).length;
    }
}
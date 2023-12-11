import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.css'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input 
          type="text" 
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check in date: 
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
      <button (click)="goToPassenger()">
        View
      </button>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges {

  @Input()//custom//
  detail!: Passenger;

  @Output()//custom//
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()//custom//
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()//custom//
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  editing: boolean = false;

  constructor() { }

  /*
ngOnChanges mehtod takes a change object with any parameter that uses changes.detail to return a new object if a detail is changed
  */
  ngOnChanges(changes: any) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }
  /*
onNameChange mehtod takes a value object with a string as a paramter
*/
  onNameChange(value: string) {
    this.detail.fullname = value;
  }
  /*
 goToPassenger method has an empty object that emiting an event to the parent to tell it to visit the particular passenger
  */
  goToPassenger() {
    this.view.emit(this.detail);
  }
  /*
  toggleEdit method has an empthy object to referrence the input variable
  */
  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);//referrencing the input variable//
    }
    this.editing = !this.editing;//creates a toggle; true to false | false to true every time we click the Edit button//
  }
  /*
  onRemove method has an empty object that tells the parent that something has changed so that we can remove the array in our parent data
  */
  onRemove() {
    this.remove.emit(this.detail);
  }
}
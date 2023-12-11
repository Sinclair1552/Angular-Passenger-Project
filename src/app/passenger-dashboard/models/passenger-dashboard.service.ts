import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Passenger } from "./passenger.interface";
const PASSENGER_API: string = 'http://localhost:3000/user/list';

@Injectable()
export class PassengerDashboardService {
  [x: string]: any;
  constructor(private http: HttpClient) { }

  getPassengers(): Observable<any> {
    // return this.http
    // .get(PASSENGER_API)
    // .map((response: any) => response.json())
    // .catchError((error: any) => throwError(error.json()));
    return this.http.get(PASSENGER_API);

  }


  getPassenger(id: number): Observable<any> {
    // return this.http
    // .get(`${PASSENGER_API}/${id}`)
    // .map((response: any) => response.json())
    // .catchError((error: any) => throwError(error.json()));
    return this.http.get(`http://localhost:3000/user/${id}`);

  }

  /*
  updatePassenger method retuns an a new object with a list of Passengers when called/invoked
  */
  updatePassenger(passenger: Passenger): Observable<Passenger> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const options = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
      .map((response: any) => response.json())
      .catchError((error: any) => throwError(error.json()));
  }

  /*
  removePassenger returns an event object with a list of Passengers when called/invoked
  */
  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .map((response: any) => response.json())
      .catchError((error: any) => throwError(error.json()));
  }
}
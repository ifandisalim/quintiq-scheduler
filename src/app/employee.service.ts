import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Employee} from '../models/Employee';
import {ReplaySubject} from "rxjs";


@Injectable()
export class EmployeeService {

  constructor(private http:Http) { }

    /**
     * Retrieve employee details from JSON data
     * @returns {ReplaySubject<any>}
     */
  getEmployeeDetails():  ReplaySubject<any>{
    let employeeDetails: ReplaySubject<any> = new ReplaySubject(1);

    this.http.get('../assets/data/student-details.json')
        .subscribe((response:Response) => {
            let employees:Employee[] = response.json();
            employeeDetails.next(employees);
        });

    return employeeDetails;
  }


}

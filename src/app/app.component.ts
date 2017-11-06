import {Component, OnInit} from '@angular/core';
import {EmployeeService} from './employee.service';
import {Employee} from '../models/Employee';
import {EventDay} from "../models/EventDay";
import {EventService} from "./event.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    employeeDetails: Employee[];
    eventDetails: EventDay[];



    constructor(private employeeService: EmployeeService, private eventService: EventService) {
    }

    ngOnInit() {
        // Get employee details from json
        this.employeeService.getEmployeeDetails()
            .subscribe(response => this.employeeDetails = response);

        // Get event details from json
        this.eventService.getEventDetails()
            .subscribe(response => this.eventDetails = response);
    }




}

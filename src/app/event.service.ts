import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {ReplaySubject} from "rxjs";
import {EventDay} from "../models/EventDay";
import {Employee} from "../models/Employee";
import {UtilityService} from "./utility.service";

@Injectable()
export class EventService {

    constructor(private http: Http, private utilityService: UtilityService) {
    }

    /**
     * Retrieve event day details from JSON data
     * @returns {ReplaySubject<any>}
     */
    getEventDetails(): ReplaySubject<any> {
        let eventDetails: ReplaySubject<any> = new ReplaySubject(1);

        this.http.get('../assets/data/event-day-details.json')
            .subscribe((response: Response) => {
                let events: EventDay[] = response.json();

                eventDetails.next(events);
            });

        return eventDetails;

    }

    /**
     * Return employee array which works on a certain event day
     * @param eventDayId Id of event day
     * @param employeeData Employee array to look from
     * @returns {Employee[]} employee who works on that day
     */
    getEmployeesAssignedOnDay(eventDayId: number, employeeData: Employee[]): Employee[] {
        return employeeData.filter((employee: Employee) => {
            return this.utilityService.itemInArray(eventDayId, employee.assignedDays);
        });
    }


}

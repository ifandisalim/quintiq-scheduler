import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Employee} from '../../models/Employee';
import {EventDay} from "../../models/EventDay";
import {Score} from "../../models/Score";
import {EventService} from "../event.service";
import {UtilityService} from "../utility.service";
import {ScoreService} from "../score.service";
import {HeaderEventsService} from "../header-events.service";

let solver = require("javascript-lp-solver");

@Component({
    selector: 'student-work-planner',
    templateUrl: './student-work-planner.component.html',
    styleUrls: ['./student-work-planner.component.css']
})
export class StudentWorkPlannerComponent  {


    @Input() employeeData: Employee[];
    @Input() eventData: EventDay[];


    score: Score;

    constructor(private eventService: EventService, private utilityService: UtilityService, private scoreService: ScoreService,
                private headerEventsService: HeaderEventsService) {

        this.score = {
            total: 0,
            preferredBonus: 0,
            unpreferredViolation: 0,
            overworkingViolation: 0
        };

        // Restart button clicked. Reset all assigned days
        this.headerEventsService.shouldRestartProgress$.subscribe( () => {
            // Reset assigned values here
           if(this.employeeData){

                this.employeeData = this.employeeData.map((employee:Employee) => {
                    let unassignedEmployee = employee;
                    unassignedEmployee.assignedDays = [];
                    unassignedEmployee.restrictedDays = [];
                    return unassignedEmployee;

               });

               this.score = this.scoreService.getScheduleScore(this.employeeData);

           }
        });

    }





    toggleCell(eventData: EventDay, employee: Employee) {
        const employeeIndex = this.utilityService.getIndexOfItemById(employee.id, this.employeeData);

        // Get employees assigned on the selected day
        const employeesAsignedOnDay: Employee[] = this.eventService.getEmployeesAssignedOnDay(eventData.id, this.employeeData);


        // If already 3 employees assigned on this day, prevent adding more
        if (!this.utilityService.itemInArray(eventData.id, employee.assignedDays) && employeesAsignedOnDay.length >= 3) {
            return false;
        }

        // Initialize assigned days array if undefined
        this.employeeData[employeeIndex].assignedDays = this.employeeData[employeeIndex].assignedDays || [];

        // Toggle days assigned to employee
        this.toggleItemInArray(eventData.id, employee.assignedDays);


        // Remove restricted days if still < 9 assigned days
        if (this.employeeData[employeeIndex].assignedDays.length < 9) {
            this.employeeData[employeeIndex].restrictedDays = [];
        }

        // Make other days to be restricted
        if (this.employeeData[employeeIndex].assignedDays.length === 9) {
            this.restrictUnassignedDays(employeeIndex);
        }


        this.score = this.scoreService.getScheduleScore(this.employeeData);
    }

    /**
     * Check if an employee is working on the days passed
     * @param eventId Id of event day
     * @param eventDays Array of event days
     * @returns {boolean}
     */
    isEmployeeWorkingOnDay(eventId:number, eventDays:any){
        return this.utilityService.itemInArray(eventId, eventDays);
    }



    /**
     * Remove item from array if already exist
     * Add item to array if not exist
     * @param item
     * @param array
     * return true if new item added
     * return false if item removed
     */
    toggleItemInArray(item, array) {
        const itemIndex = array.indexOf(item);

        if (itemIndex === -1) {
            array.push(item);
            return true;
        } else {
            array.splice(itemIndex, 1);
            return false;
        }
    }

    /**
     * Restrict unassigned days
     * Use this when an employee has worked more than allowed
     * @param employeeIndex
     */
    restrictUnassignedDays(employeeIndex:number){
        let assignedDays = this.employeeData[employeeIndex].assignedDays;

        // Set other unassigned days as restricted days after assigned days = 9
        this.employeeData[employeeIndex].restrictedDays = this.eventData
            .map(event => event.id)
            .filter(eventId => !this.utilityService.itemInArray(eventId, assignedDays));
    }



}

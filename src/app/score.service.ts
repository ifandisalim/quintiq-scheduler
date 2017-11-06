import {Injectable} from '@angular/core';
import {Employee} from "../models/Employee";
import {UtilityService} from "./utility.service";
import {Score} from "../models/Score";

@Injectable()
export class ScoreService {

    constructor(private utilityService:UtilityService) {
    }

    /**
     * Compute the scores based on Employees assigned on event days
     * @param employeeData Array of employee with their days assignment
     * @returns Score object
     */
    getScheduleScore(employeeData: Employee[]):Score{

        return employeeData.reduce((overallScore: any, employeeData: Employee): number => {
            let assignedDays = employeeData.assignedDays || [];
            let preferredDays = employeeData.preferredDays || [];
            let restrictedDays = employeeData.restrictedDays || [];
            let unpreferredDays = employeeData.unpreferredDays || [];

            let individualScore = assignedDays.reduce((individualScore: any, assignedDay: number): number => {

                if (this.utilityService.itemInArray(assignedDay, preferredDays)) {
                    individualScore.currentScore += 5;
                    individualScore.currentPreferredBonus += 5;
                }

                if (this.utilityService.itemInArray(assignedDay, restrictedDays)) {
                    individualScore.currentScore -= 10;
                    individualScore.currentOverworkingViolation -= 10;
                }

                if (this.utilityService.itemInArray(assignedDay, unpreferredDays)) {
                    individualScore.currentScore -= 5;
                    individualScore.currentUnpreferredViolation -= 5;
                }

                return individualScore;
            }, {
                currentScore: 0,
                currentPreferredBonus: 0,
                currentUnpreferredViolation: 0,
                currentOverworkingViolation: 0
            });

            overallScore.total += individualScore.currentScore;
            overallScore.preferredBonus += individualScore.currentPreferredBonus;
            overallScore.overworkingViolation += individualScore.currentOverworkingViolation;
            overallScore.unpreferredViolation += individualScore.currentUnpreferredViolation;

            return overallScore;

        }, {total: 0, preferredBonus: 0, unpreferredViolation: 0, overworkingViolation: 0});

    }



}

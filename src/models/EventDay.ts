import {Employee} from './Employee';

export interface EventDay{

    id: number;
    weekday: string;
    weekNumber: number;
    assignedEmployees?: Employee[];
    totalPenalty?: number;

}
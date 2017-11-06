import {EventDay} from './EventDay';

export interface Employee{

    id: number;
    name: string;
    preferredDays: number[];
    unpreferredDays: number[];
    restrictedDays: number[];
    assignedDays: number[];
}
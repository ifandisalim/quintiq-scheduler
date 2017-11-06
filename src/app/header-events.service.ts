import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class HeaderEventsService {

    private shouldRestartProgress  = new Subject<boolean>();
    public shouldRestartProgress$ = this.shouldRestartProgress.asObservable();

    private shouldAutoSchedule    = new Subject<boolean>();
    public shouldAutoSchedule$   = this.shouldAutoSchedule.asObservable();

    constructor() {
    }

    publishRestartProgress(shouldRestart:boolean){
        this.shouldRestartProgress.next(shouldRestart);
    }

    publishAutoSchedule(shouldAutoSchedule:boolean){
        this.shouldAutoSchedule.next(shouldAutoSchedule);
    }

}

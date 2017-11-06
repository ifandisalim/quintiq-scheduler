import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {HeaderEventsService} from "../header-events.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



    constructor(private headerEventsService:HeaderEventsService) {
    }

    ngOnInit() {
    }

    restartProgress(){
        this.headerEventsService.publishRestartProgress(true);
    }

    autoSchedule(){
        this.headerEventsService.publishAutoSchedule(true);
    }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { StudentWorkPlannerComponent } from './student-work-planner/student-work-planner.component';

import { EmployeeService } from './employee.service';
import {EventService} from "./event.service";
import {UtilityService} from "./utility.service";
import {ScoreService} from "./score.service";
import {HeaderEventsService} from "./header-events.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    StudentWorkPlannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EmployeeService, EventService, UtilityService, ScoreService, HeaderEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

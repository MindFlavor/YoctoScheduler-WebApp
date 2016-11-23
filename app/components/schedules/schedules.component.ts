import { Component, OnInit, OnDestroy } from "@angular/core";
import { GenericHTTPService } from "../../services/generic_http.service";
import { HttpModule } from "@angular/http";

import { Observable, Subscription } from "rxjs/Rx";

import { Schedule, ScheduleID } from "../../entities/schedule";
import { Task, TaskID } from "../../entities/task";
import { ScheduleService } from "../../services/schedule.service";
import { TaskService, MockTaskService } from "../../services/task.service";

import { GenericComponent } from "../generic.component";

@Component({
    selector: "yocto-schedules",
    templateUrl: "../html/schedules/schedules.component.html",
    providers: []
})
export class SchedulesComponent extends GenericComponent<Schedule, ScheduleID> {
    selectedSchedule: Schedule;
    tasks: Task[] = [];

    constructor(private scheduleService: ScheduleService, private taskService: TaskService) {
        super(scheduleService, 0);

        this.taskService.getAll().then((tsks) => {
            this.tasks = tsks;
        });
    }

    public onSelect(s: Schedule) {
        this.selectedSchedule = s;
    }

    protected AfterDataRetrieval() {
        if (!this.Entities)
            return;
    }

    public taskByID(taskID: TaskID): Task {
        return this.tasks.find((tsk) => { return tsk.ID === taskID; });
    }

    public deleteSchedule(s: Schedule) {
        this.scheduleService.delete(s);
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../generics/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { Task } from './task';
import { TaskService, MockTaskService } from './task.service';

import { GenericComponent } from '../../generics/generic.component';

@Component({
    selector: 'yocto-servers',
    templateUrl: '../html/task/task.component.html',
    providers: [MockTaskService]
})
export class TaskComponent extends GenericComponent<Task, number> {
    selectedTask: Task;

    constructor(private taskService: MockTaskService) {
        super(taskService, 0);
    }

    protected AfterDataRetrieval() {
        // if (!this.Entities)
        //     return;

        // this.Entities = this.Entities.sort((a: Server, b: Server): number => {
        //     if (a.Status > b.Status)
        //         return -1;
        //     else if (a.Status < b.Status)
        //         return 1;
        //     else
        //         return 0;
        // });
    }

    public onSelect(task: Task) {
        this.selectedTask = task;
    }

    public taskImage(task: Task): string {
        switch(task.Type) {
            case "WaitTask": return "html/imgs/wait_24x24.png";
            default: return "html/imgs/unknown_24x24.png";
        }
    }
}
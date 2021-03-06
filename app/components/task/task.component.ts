import { Component, OnInit, OnDestroy } from "@angular/core";
import { GenericHTTPService } from "../../services/generic_http.service";
import { HttpModule } from "@angular/http";

import { Observable, Subscription } from "rxjs/Rx";

import { Task, TaskType, TaskID } from "../../entities/task";
import { WaitTask } from "../../entities/wait-task";
import { TSQLTask } from "../../entities/tsql-task";
import { PowerShellTask } from "../../entities/powershell-task";
import { SSISTask } from "../../entities/ssis-task";

import { QueueItem } from "../../entities/queue_item";

import { TaskService, MockTaskService } from "../../services/task.service";
import { QueueItemService } from "../../services/queue_item.service";

import { GenericComponent } from "../generic.component";
import { TaskPriority } from "../../entities/task_priority";

@Component({
    selector: "yocto-servers",
    templateUrl: "../html/task/task.component.html",
    providers: [ QueueItemService ]
})
export class TaskComponent extends GenericComponent<Task, number> {
    selectedTask: Task;
    taskPriority = TaskPriority;
    taskType = TaskType;

    paginationCurrentPage: any;

    constructor(private taskService: TaskService, private queueItemService: QueueItemService) {
        super(taskService, 0);
    }

    public onSelect(task: Task) {
        this.selectedTask = task;
        console.log("selected TaskType == " + TaskType[this.selectedTask.Type] + ", ID == " + this.selectedTask.ID);
    }

    public newTask(type: TaskType) {
        // console.log("Pagination == " + this.paginationCurrentPage);
        // calculate new task page
        let pages = Math.ceil(this.Entities.length / 5);
        let goToPage = pages;
        if (this.Entities.length % 5 === 0) {
            goToPage++;
        }

        let t: Task;
        switch (type) {
            case TaskType.Wait:
                t = new WaitTask();
                break;
            case TaskType.TSQL:
                t = new TSQLTask();
                break;
            case TaskType.PowerShell:
                t = new PowerShellTask();
                break;

            case TaskType.SSIS:
                t = new SSISTask();
                break;
            default:
                t = new Task();
                break;
        }
        this.taskService.insertLocal(t);
        this.onSelect(t);
        this.paginationCurrentPage = goToPage;
    }

    public concurrencyToString(t: Task): string {
        let sLocal = t.ConcurrencyLimitSameInstance === 0 ? "∞" : t.ConcurrencyLimitSameInstance;
        let sGlobal = t.ConcurrencyLimitGlobal === 0 ? "∞" : t.ConcurrencyLimitGlobal;
        return `[${sLocal}/${sGlobal}]`;
    }

    public sendToQueue(t: Task, priority: TaskPriority) {
        console.log("requested sendToQueue(t: " + t + ", priority:" + priority + ")");

        let qi: QueueItem = new QueueItem(undefined, t.ID, priority);

        this.queueItemService.save(qi).then((res) => {
            console.log("done!");
        }).catch((ex) => {
            console.log("ex! " + ex);
        });
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../generics/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { Task, TaskType } from './task';
import { WaitTask } from './wait/wait-task';
import { TSQLTask } from './tsql/tsql-task';
import { TaskService, MockTaskService } from './task.service';

import { GenericComponent } from '../../generics/generic.component';

@Component({
    selector: 'yocto-servers',
    templateUrl: '../html/task/task.component.html',
    providers: [TaskService, MockTaskService]
})
export class TaskComponent extends GenericComponent<Task, number> {
    selectedTask: Task;
    taskType = TaskType;

    constructor(private taskService: MockTaskService) {
        super(taskService, 0);
    }

    public onSelect(task: Task) {
        this.selectedTask = task;
        console.log('selected TaskType == ' + TaskType[this.selectedTask.Type]);
    }

    public newTask(type: TaskType) {
        let t: Task;
        switch (type) {
            case TaskType.Wait:
                t = new WaitTask();
                break;
            case TaskType.TSQL:
                t = new TSQLTask();
                break;
            default:
                t = new Task();
                break;
        }
        this.taskService.insertLocal(t);
        this.onSelect(t);
    }

    public taskImage(task: Task): string {
        switch (task.Type) {
            case TaskType.Wait: return "html/imgs/wait_24x24.png";
            case TaskType.Passthrough: return "html/imgs/passthrough_24x24.png";
            case TaskType.SSIS: return "html/imgs/ssis_24x24.png";
            case TaskType.PowerShell: return "html/imgs/powershell_24x24.png";
            case TaskType.TSQL: return "html/imgs/tsql_24x24.png";
            default: return "html/imgs/unknown_24x24.png";
        }
    }
}
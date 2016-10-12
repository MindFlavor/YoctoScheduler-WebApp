import { Component, Input } from '@angular/core';
import { Task } from './task';

@Component({
    selector: 'task-detail',
    templateUrl: '../html/task/task-detail.component.html',
})
export class TaskDetailComponent {
    @Input()
    task: Task;

    public persistTask() {
        this.task.updatePayload();
    }
}
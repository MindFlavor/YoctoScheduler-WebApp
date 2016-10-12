import { Component, Input } from '@angular/core';
import { Task, WaitTask } from './task';

@Component({
    selector: 'task-wait',
    templateUrl: '../html/task/task-wait.component.html',
})
export class TaskWaitComponent {
    @Input()
    task: WaitTask;
}
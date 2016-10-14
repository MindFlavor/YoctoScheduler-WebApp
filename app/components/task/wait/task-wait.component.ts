import { Component, Input } from '@angular/core';
import { Task } from '../task';
import { WaitTask } from './wait-task';

@Component({
    selector: 'task-wait',
    templateUrl: '../../html/task/wait/task-wait.component.html',
})
export class TaskWaitComponent {
    @Input()
    task: WaitTask;
}
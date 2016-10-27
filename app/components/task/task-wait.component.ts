import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { WaitTask } from '../../entities/wait-task';

@Component({
    selector: 'task-wait',
    templateUrl: '../../html/task/wait/task-wait.component.html',
})
export class TaskWaitComponent {
    @Input()
    task: WaitTask;
}
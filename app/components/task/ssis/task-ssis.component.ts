import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../task';
import { SSISTask } from './ssis-task';

@Component({
    selector: 'task-ssis',
    templateUrl: '../../html/task/ssis/task-ssis.component.html',
})
export class TaskSSISComponent {
    @Input()
    task: SSISTask;
}
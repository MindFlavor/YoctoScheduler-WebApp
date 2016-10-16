import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../task';
import { TSQLTask } from './tsql-task';

@Component({
    selector: 'task-tsql',
    templateUrl: '../../html/task/tsql/task-tsql.component.html',
})
export class TaskTSQLComponent {
    @Input()
    task: TSQLTask;
}
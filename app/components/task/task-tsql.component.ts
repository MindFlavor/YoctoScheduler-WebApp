import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { TSQLTask } from '../../entities/tsql-task';

@Component({
    selector: 'task-tsql',
    templateUrl: '../../html/task/tsql/task-tsql.component.html',
})
export class TaskTSQLComponent {
    @Input()
    task: TSQLTask;
}
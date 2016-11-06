import { Component, Input } from '@angular/core';
import { DeadExecution, ItemWithTaskStatus } from '../../entities/executions';
import { TaskStatus } from '../../entities/task_status';

@Component({
    selector: 'dead-executions-detail',
    templateUrl: '../html/executions/dead-executions-detail.html',
})
export class DeadExecutionsDetailComponent {
    @Input()
    deadExecutions: DeadExecution[];
}
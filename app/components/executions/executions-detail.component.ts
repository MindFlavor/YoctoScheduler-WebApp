import { Component, Input } from '@angular/core';
import { Execution, ItemWithTaskStatus } from '../../entities/executions';
import { TaskStatus } from '../../entities/task_status';

@Component({
    selector: 'executions-detail',
    templateUrl: '../html/executions/executions-detail.component.html',
})
export class ExecutionsDetailComponent {
    @Input()
    executions: Execution[];
}
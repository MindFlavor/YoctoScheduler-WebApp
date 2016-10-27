import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { PowerShellTask } from '../../entities/powershell-task';

@Component({
    selector: 'task-powershell',
    templateUrl: '../../html/task/task-powershell.component.html',
})
export class TaskPowerShellComponent {
    @Input()
    task: PowerShellTask;
}
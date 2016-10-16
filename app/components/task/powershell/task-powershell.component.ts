import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../task';
import { PowerShellTask } from './powershell-task';

@Component({
    selector: 'task-powershell',
    templateUrl: '../../html/task/powershell/task-powershell.component.html',
})
export class TaskPowerShellComponent {
    @Input()
    task: PowerShellTask;
}
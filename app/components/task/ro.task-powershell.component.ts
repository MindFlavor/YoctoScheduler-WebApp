import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { WaitTask } from '../../entities/wait-task';

import { TaskPowerShellComponent } from './task-powershell.component';

@Component({
    selector: 'ro-task-powershell',
    templateUrl: '../../html/task/ro.task-powershell.component.html',
})
export class ROTaskPowerShellComponent extends TaskPowerShellComponent { }
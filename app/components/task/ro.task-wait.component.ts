import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { WaitTask } from '../../entities/wait-task';

import { TaskWaitComponent } from './task-wait.component';

@Component({
    selector: 'ro-task-wait',
    templateUrl: '../../html/task/ro.task-wait.component.html',
})
export class ROTaskWaitComponent extends TaskWaitComponent { }
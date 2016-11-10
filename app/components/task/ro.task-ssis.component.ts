import { Component, Input } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { TSQLTask } from '../../entities/tsql-task';

import { TaskSSISComponent } from './task-ssis.component';

@Component({
    selector: 'ro-task-ssis',
    templateUrl: '../../html/task/ro.task-ssis.component.html',
})
export class ROTaskSSISComponent extends TaskSSISComponent { }
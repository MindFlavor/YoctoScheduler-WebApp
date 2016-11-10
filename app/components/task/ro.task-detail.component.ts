import { Component, Input, OnChanges } from '@angular/core';
import { Task, TaskType } from '../../entities/task';
import { TaskService, MockTaskService } from '../../services/task.service'
import { TaskDetailComponent } from './task-detail.component'

@Component({
    selector: 'ro-task-detail',
    templateUrl: '../html/task/ro.task-detail.component.html',
    providers: [TaskService, MockTaskService]
})
export class ROTaskDetailComponent extends TaskDetailComponent {
}
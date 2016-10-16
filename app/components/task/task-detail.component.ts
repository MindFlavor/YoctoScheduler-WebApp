import { Component, Input, OnChanges } from '@angular/core';
import { Task, TaskType } from './task';

@Component({
    selector: 'task-detail',
    templateUrl: '../html/task/task-detail.component.html',
})
export class TaskDetailComponent implements OnChanges {
    @Input()
    task: Task;

    taskType = TaskType;

    localEnabled = true;
    globalEnabled = true;

    public persistTask() {
        this.task.updatePayload();

        console.log('persistTask(): ' + this.task);
    }

    public ngOnChanges() {
        if (this.task) {
            this.localEnabled = this.task.ConcurrencyLimitSameInstance > 0;
            this.globalEnabled = this.task.ConcurrencyLimitGlobal > 0;
        }
    }

    public changeConcurrencyLimit(type: string) {
        switch (type) {
            case 'local':
                if (this.task.ConcurrencyLimitSameInstance === 0)
                    this.task.ConcurrencyLimitSameInstance = 1;
                else
                    this.task.ConcurrencyLimitSameInstance = 0;
                break;
            case 'global':
                if (this.task.ConcurrencyLimitGlobal === 0)
                    this.task.ConcurrencyLimitGlobal = 1;
                else
                    this.task.ConcurrencyLimitGlobal = 0;
                break;
        }
    }
}
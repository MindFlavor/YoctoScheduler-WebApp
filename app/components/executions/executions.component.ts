import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../services/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { QueueItem } from '../../entities/queue_item';
import { ItemWithTaskStatus, DeadExecution, ItemWithTaskStatusPartitionedByStatus } from '../../entities/executions';
import { DeadExecutionService, DeadExecutionService_Mock } from '../../services/executions/dead_executions.service';
import { TaskStatus } from '../../entities/task_status';

import { GenericComponent } from '../generic.component';

@Component({
    selector: 'yocto-executions',
    templateUrl: '../html/executions/executions.component.html',
    providers: [DeadExecutionService, DeadExecutionService_Mock]
})
export class ExecutionsComponent implements OnInit, OnDestroy {
    protected TaskStatus = TaskStatus;

    protected pollingInterval: number;
    protected polling: Subscription;

    protected deadExecutions: ItemWithTaskStatusPartitionedByStatus<string>;
    protected deadExecutionCompleted: number;

    selectedTaskStatus: TaskStatus = TaskStatus.Unknown;

    constructor(private deadExecutionService: DeadExecutionService_Mock) {
        this.pollingInterval = 0;

        console.log('creating ExecutionsComponent with service: ' + this.deadExecutionService + '. pollingInterval == ' + this.pollingInterval);

        if (this.pollingInterval > 0) {
            this.polling = Observable.interval(this.pollingInterval)
                .subscribe(() => {
                    this.getData();
                });
        }
    }

    ngOnInit() {
        this.getData();
    }

    ngOnDestroy() {
        if (this.pollingInterval > 0 && this.polling !== undefined)
            this.polling.unsubscribe();
    }

    protected getData() {
        this.deadExecutionService.getFromREST()
            .then(r => {
                this.deadExecutions = ItemWithTaskStatus.partitionByStatus(r);
                //this.deadExecutionCompleted = this.deadExecutions[TaskStatus.Completed].length;
            })
            .catch((e) => console.log('Something went wrong: ' + e + '!'));
    }

    public selectTaskStatus(ts: TaskStatus) {
        this.selectedTaskStatus = ts;
    }

    public isTaskStatusSelected(ts: TaskStatus) {
        return ts === this.selectedTaskStatus;
    }
}
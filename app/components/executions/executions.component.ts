import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../services/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { QueueItem } from '../../entities/queue_item';
import { ItemWithTaskStatus, Execution, ItemWithTaskStatusPartitionedByStatus } from '../../entities/executions';
import { ExecutionService, ExecutionService_Mock } from '../../services/executions.service';
import { ServerService, MockServerService } from '../../services/server.service';

import { TaskStatus } from '../../entities/task_status';

import { GenericComponent } from '../generic.component';

@Component({
    selector: 'yocto-executions',
    templateUrl: '../html/executions/executions.component.html',
    providers: [ExecutionService, ExecutionService_Mock]
})
export class ExecutionsComponent implements OnInit, OnDestroy {
    protected TaskStatus = TaskStatus;

    protected pollingInterval: number;
    protected polling: Subscription;

    protected executions: ItemWithTaskStatusPartitionedByStatus<string>;
    protected executionCompleted: number;

    selectedTaskStatus: TaskStatus = TaskStatus.Unknown;
    selectedExecutions: Execution[];

    constructor(private executionService: ExecutionService, private serverService: ServerService) {
        this.pollingInterval = 5000;

        console.log('creating ExecutionsComponent with service: ' + this.executionService + ', serverService: ' + this.serverService + ', pollingInterval: ' + this.pollingInterval);

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
        this.executionService.getFromREST()
            .then(r => {
                r = r.sort((a, b) => {
                    if (a.LastUpdate > b.LastUpdate)
                        return -1;
                    else if (a.LastUpdate < b.LastUpdate)
                        return 1;
                    else
                        return 0;
                });
                this.executions = ItemWithTaskStatus.partitionByStatus(r);

                if (this.selectedTaskStatus)
                    this.selectedExecutions = this.executions[this.selectedTaskStatus] as Execution[];

            })
            .catch((e) => console.log('Something went wrong: ' + e + '!'));
    }

    public selectTaskStatus(ts: TaskStatus) {
        this.selectedTaskStatus = ts;
        this.selectedExecutions = this.executions[this.selectedTaskStatus] as Execution[];
    }

    public isTaskStatusSelected(ts: TaskStatus) {
        return ts === this.selectedTaskStatus;
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../services/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { QueueItem } from '../../entities/queue_item';
import { ItemWithStatus, DeadExecution } from '../../entities/executions';
import { DeadExecutionService } from '../../services/executions/dead_executions.service';
import { TaskStatus } from '../../entities/task_status';

import { GenericComponent } from '../generic.component';

@Component({
    selector: 'yocto-executions',
    templateUrl: '../html/executions/executions.component.html',
    providers: [DeadExecutionService]
})
export class ExecutionsComponent implements OnInit, OnDestroy {
    protected pollingInterval: number;
    protected polling: Subscription;

    protected deadExecutions: DeadExecution[];
    protected deadExecutionCompleted: number;

    constructor(private deadExecutionService: DeadExecutionService) {
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
                this.deadExecutions = r;

                this.deadExecutionCompleted = this.deadExecutions.filter((item) => { return item.Status === TaskStatus.Completed; }).length;
            })
            .catch((e) => console.log('Something went wrong: ' + e + '!'));
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Task, TaskType } from './task';
import { WaitTask } from './wait/wait-task';

import { GenericHTTPService } from '../../generics/generic_http.service'
import { GenericService } from '../../generics/generic.service'
import { GenericMockService } from '../../generics/generic_mock.service'

@Injectable()
export class TaskService extends GenericHTTPService<Task, number> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/tasks';  // URL to web api
    }

    getFromREST(): Promise<Task[]> {
        return super.getFromREST()
            .then(resp => {
                let tempArray: Task[] = [];
                this.tArray.map(obj => {
                    switch (obj.Type) {
                        case TaskType.Wait: tempArray.push(WaitTask.fromTask(obj));
                        default: tempArray.push(obj);
                    }
                });
                this.tArray = tempArray;
                return this.tArray;
            })
            .catch(super.handleError)
    }

    constructor(http: Http) { super(http); }
}

@Injectable()
export class MockTaskService extends GenericMockService<Task, number>  {
    protected initializeData(): Task[] {
        return [
            { ID: 1, Name: 'mock_1', ConcurrencyLimitGlobal: 0, ConcurrencyLimitLocal: 5, Description: "mock_task_1", ReenqueueOnDead: true, Type: TaskType.Wait, Payload: '{"SleepSeconds":35}' } as Task,
            { ID: 2, Name: 'mock_2', ConcurrencyLimitGlobal: 1, ConcurrencyLimitLocal: 1, Description: "mock_task_2", ReenqueueOnDead: true, Type: TaskType.Passthrough, Payload: '{}' } as Task,
            { ID: 3, Name: 'mock_3', ConcurrencyLimitGlobal: 1, ConcurrencyLimitLocal: 0, Description: "mock_task_3", ReenqueueOnDead: true, Type: TaskType.SSIS, Payload: '{}' } as Task,
            { ID: 4, Name: 'mock_4', ConcurrencyLimitGlobal: 1, ConcurrencyLimitLocal: 0, Description: "mock_task_4", ReenqueueOnDead: true, Type: TaskType.PowerShell, Payload: '{}' } as Task,
            { ID: 5, Name: 'mock_5', ConcurrencyLimitGlobal: 7, ConcurrencyLimitLocal: 10, Description: "mock_task_5", ReenqueueOnDead: true, Type: TaskType.TSQL, Payload: '{}' } as Task,
            { ID: 5, Name: 'mock_6', ConcurrencyLimitGlobal: 4, ConcurrencyLimitLocal: 4, Description: "mock_task_6", ReenqueueOnDead: true, Type: TaskType.Unknown, Payload: '{}' } as Task
        ];
    }

    getFromREST(): Promise<Task[]> {
        return super.getFromREST()
            .then(resp => {
                let tempArray: Task[] = [];
                this.data.map(obj => {
                    switch (obj.Type) {
                        case TaskType.Wait:
                            tempArray.push(WaitTask.fromTask(obj));
                            break;
                        default: tempArray.push(Task.fromTask(obj));
                    }
                });
                this.data = tempArray;
                return this.data;
            });
    }
}

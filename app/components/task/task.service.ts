import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Task } from './task';

import { GenericHTTPService } from '../../generics/generic_http.service'
import { GenericService } from '../../generics/generic.service'
import { GenericMockService } from '../../generics/generic_mock.service'

@Injectable()
export class TaskService extends GenericHTTPService<Task, number> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/tasks';  // URL to web api
    }

    constructor(http: Http) { super(http); }
}

@Injectable()
export class MockTaskService extends GenericMockService<Task, number>  {
    protected initializeData(): Task[] {
        return [
            { ID: 1, Name: 'mock_1', ConcurrencyLimitGlobal: 0, ConcurrencyLimitLocal: 5, Description: "mock_task_1", ReenqueueOnDead: true,  Type: 'WaitTask', Payload: '{"SleepSeconds":35}' } as Task,
            { ID: 2, Name: 'mock_2', ConcurrencyLimitGlobal: 1, ConcurrencyLimitLocal: 1, Description: "mock_task_2", ReenqueueOnDead: true,  Type: 'Passthrough', Payload: '{}' } as Task
        ];
    }
}


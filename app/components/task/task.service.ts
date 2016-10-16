import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Task, TaskFromWS, TaskType } from './task';
import { WaitTask } from './wait/wait-task';
import { TSQLTask } from './tsql/tsql-task';

import { GenericHTTPService } from '../../generics/generic_http.service'
import { GenericService } from '../../generics/generic.service'
import { GenericMockService } from '../../generics/generic_mock.service'

@Injectable()
export class TaskService extends GenericHTTPService<Task, number> {
    constructor(http: Http) { super(http); }

    protected getUrl(): string {
        return 'http://localhost:9000/api/tasks';  // URL to web api
    }

    getFromREST(): Promise<Task[]> {
        return this.http.get(this.getUrl())
            .toPromise()
            .then(resp => {
                let objs = resp.json() as Array<any>;

                let _tArray: TaskFromWS[] = [];
                this.tArray = [];

                objs.map(obj => _tArray.push(obj as TaskFromWS));

                _tArray.map(obj => {
                    console.log(obj);
                    switch (obj.Type) {
                        case "WaitTask":
                            this.tArray.push(WaitTask.fromTaskFromWS(obj));
                            break;
                        case "TSQLTask":
                            this.tArray.push(TSQLTask.fromTaskFromWS(obj));
                            break;
                        default: this.tArray.push(Task.fromTaskFromWS(obj));
                            break;
                    }
                });
                return this.tArray;
            })
            .catch(this.handleError)
    }


    protected put(t: Task) {
        let tws = t.toTaskFromWS();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = this.getUrl() + `/${t.ID}`;

        return this.http
            .put(url, JSON.stringify(tws), { headers: headers })
            .toPromise()
            .then(() => t)
            .catch(this.handleError);
    }
}

@Injectable()
export class MockTaskService extends GenericMockService<Task, number>  {
    private taskFromWS: TaskFromWS[];

    protected initializeData(): Task[] {
        this.taskFromWS = [
            { ID: 1, Name: 'mock_1', ConcurrencyLimitGlobal: 0, ConcurrencyLimitSameInstance: 5, Description: "mock_task_1", ReenqueueOnDead: false, Type: "WaitTask", Payload: '{"SleepSeconds":35}' } as TaskFromWS,
            { ID: 2, Name: 'mock_2', ConcurrencyLimitGlobal: 1, ConcurrencyLimitSameInstance: 1, Description: "mock_task_2", ReenqueueOnDead: true, Type: "PassthroughTask", Payload: '{}' } as TaskFromWS,
            { ID: 3, Name: 'mock_3', ConcurrencyLimitGlobal: 1, ConcurrencyLimitSameInstance: 0, Description: "mock_task_3", ReenqueueOnDead: true, Type: "SSISTask", Payload: '{}' } as TaskFromWS,
            { ID: 4, Name: 'mock_4', ConcurrencyLimitGlobal: 1, ConcurrencyLimitSameInstance: 0, Description: "mock_task_4", ReenqueueOnDead: true, Type: "PowerShellTask", Payload: '{"Script":"Get-PSDrive | foreach { $_.Name, $_.Root, $_.Used, $_.Free | Out-String }"}' } as TaskFromWS,
            { ID: 5, Name: 'mock_5', ConcurrencyLimitGlobal: 7, ConcurrencyLimitSameInstance: 10, Description: "mock_task_5", ReenqueueOnDead: true, Type: "TSQLTask", Payload: '{"ConnectionString":"%%[MyConnectionString]%%", "Statement":"SELECT @@SERVERNAME","CommandTimeout":600}' } as TaskFromWS,
            { ID: 5, Name: 'mock_6', ConcurrencyLimitGlobal: 4, ConcurrencyLimitSameInstance: 4, Description: "mock_task_6", ReenqueueOnDead: true, Type: "UnknownTask", Payload: '{}' } as TaskFromWS
        ];

        return undefined;
    }

    getFromREST(): Promise<Task[]> {
        return super.getFromREST()
            .then(resp => {
                this.data = [];

                this.taskFromWS.map(obj => {
                    switch (obj.Type) {
                        case "WaitTask":
                            this.data.push(WaitTask.fromTaskFromWS(obj));
                            break;
                        case "TSQLTask":
                            this.data.push(TSQLTask.fromTaskFromWS(obj));
                            break;
                        default: this.data.push(Task.fromTaskFromWS(obj));
                            break;
                    }
                });
                return this.data;
            });
    }
}


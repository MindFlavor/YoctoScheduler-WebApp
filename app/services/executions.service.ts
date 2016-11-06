import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TaskID } from '../entities/task';
import { TaskStatus } from '../entities/task_status';
import { Execution } from '../entities/executions';

import { GenericHTTPService } from './generic_http.service'
import { GenericService } from './generic.service'
import { GenericMockService } from './generic_mock.service'

@Injectable()
export class ExecutionService extends GenericHTTPService<Execution, string> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/executions';  // URL to web api
    }

    public getFromREST(): Promise<Execution[]> {
        return super.getFromREST().then(resp => {
            for (let i = 0; i < resp.length; i++) {
                resp[i] = new Execution(
                    resp[i].ID,
                    resp[i].Status,
                    new Date(resp[i].Inserted),
                    new Date(resp[i].LastUpdate),
                    resp[i].ReturnCode,
                    resp[i].ScheduleID,
                    resp[i].ServerID,
                    resp[i].TaskID
                );
            }

            return resp;
        });
    }

    constructor(http: Http) { super(http); }
}

export class ExecutionService_Mock extends GenericMockService<Execution, string> {
    initializeData(): Execution[] {
        return [
            new Execution("a", TaskStatus.Completed, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new Execution("b", TaskStatus.Completed, new Date("20110101"),
                new Date("20110105"), "ReturnCode", "schedule_0", 1, 1),
            new Execution("c", TaskStatus.Aborted, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new Execution("d", TaskStatus.Dead, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new Execution("e", TaskStatus.ExceptionAtStartup, new Date("20110101"),
                new Date("20110105"), "ReturnCode excetartup", undefined, 1, 1),
            new Execution("f", TaskStatus.ExceptionDuringExecution, new Date("20110101"),
                new Date("20110105"), "ReturnCode exceptionxceution", undefined, 1, 1)
        ];
    }
}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TaskID } from '../../entities/task';
import { TaskStatus } from '../../entities/task_status';
import { DeadExecution } from '../../entities/executions';

import { GenericHTTPService } from '../generic_http.service'
import { GenericService } from '../generic.service'
import { GenericMockService } from '../generic_mock.service'

@Injectable()
export class DeadExecutionService extends GenericHTTPService<DeadExecution, string> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/executions';  // URL to web api
    }

    public getFromREST(): Promise<DeadExecution[]> {
        return super.getFromREST().then(resp => {
            let tmp: DeadExecutionService[] = [];
            for (let i = 0; i < resp.length; i++) {
                resp[i] = new DeadExecution(
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

export class DeadExecutionService_Mock extends GenericMockService<DeadExecution, string> {
    initializeData(): DeadExecution[] {
        return [
            new DeadExecution("a", TaskStatus.Completed, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new DeadExecution("b", TaskStatus.Completed, new Date("20110101"),
                new Date("20110105"), "ReturnCode", "schedule_0", 1, 1),
            new DeadExecution("c", TaskStatus.Aborted, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new DeadExecution("d", TaskStatus.Dead, new Date("20110101"),
                new Date("20110105"), "ReturnCode", undefined, 1, 1),
            new DeadExecution("e", TaskStatus.ExceptionAtStartup, new Date("20110101"),
                new Date("20110105"), "ReturnCode excetartup", undefined, 1, 1),
            new DeadExecution("f", TaskStatus.ExceptionDuringExecution, new Date("20110101"),
                new Date("20110105"), "ReturnCode exceptionxceution", undefined, 1, 1)
        ];
    }
}

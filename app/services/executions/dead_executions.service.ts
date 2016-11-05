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
        return 'http://localhost:9000/api/deadexecutions';  // URL to web api
    }

    constructor(http: Http) { super(http); }
}

export class DeadExecutionService_Mock extends GenericMockService<DeadExecution, string> {
    initializeData(): DeadExecution[] {
        return [
            {
                ID: "a", Status: TaskStatus.Completed, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode", ScheduleID: undefined, ServerID: 1,
                TaskID: 1
            },
            {
                ID: "b", Status: TaskStatus.Completed, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode", ScheduleID: "schedule_0", ServerID: 1,
                TaskID: 1
            },
            {
                ID: "c", Status: TaskStatus.Aborted, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode", ScheduleID: undefined, ServerID: 1,
                TaskID: 1
            },
            {
                ID: "d", Status: TaskStatus.Dead, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode", ScheduleID: undefined, ServerID: 1,
                TaskID: 1
            },
            {
                ID: "e", Status: TaskStatus.ExceptionAtStartup, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode exce at startup", ScheduleID: undefined, ServerID: 1,
                TaskID: 1
            },
            {
                ID: "f", Status: TaskStatus.ExceptionDuringExecution, Inserted: new Date("20110101"), 
                LastUpdate: new Date("20110105"),
                ReturnCode: "ReturnCode exception during exceution", ScheduleID: undefined, ServerID: 1,
                TaskID: 1
            }
        ];
    }
}

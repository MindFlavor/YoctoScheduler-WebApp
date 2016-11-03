import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TaskID } from '../../entities/task';
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

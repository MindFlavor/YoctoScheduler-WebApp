import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TaskID } from '../entities/task';
import { QueueItem } from '../entities/queue_item';

import { GenericHTTPService } from './generic_http.service'
import { GenericService } from './generic.service'
import { GenericMockService } from './generic_mock.service'

@Injectable()
export class QueueItemService extends GenericHTTPService<QueueItem, string> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/queueitems';  // URL to web api
    }

    constructor(http: Http) { super(http); }
}

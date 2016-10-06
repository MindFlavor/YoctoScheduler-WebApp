import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from './server';

import { GenericHTTPService } from '../generic_http.service'

@Injectable()
export class ServerService extends GenericHTTPService<Server, number> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/servers';  // URL to web api
    }

    constructor(http: Http) { super(http); }
}
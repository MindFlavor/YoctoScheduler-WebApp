import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from '../entities/server';

import { GenericHTTPService } from './generic_http.service'
import { GenericService } from './generic.service'
import { GenericMockService } from './generic_mock.service'

@Injectable()
export class ServerService extends GenericHTTPService<Server, number> {
    protected getUrl(): string {
        return GenericHTTPService.BASE_URL + '/servers';  // URL to web api
    }

    constructor(http: Http) { super(http); }

    public toString() : string {
        return "ServerService";
    }
}

@Injectable()
export class MockServerService extends GenericMockService<Server, number>  {
    protected initializeData(): Server[] {
        return [
            { ID: 1, HostName: 'mock_1', Description: 'desc_1', Status: 100, LastPing: new Date(), IPs: ['localhost'] } as Server,
            { ID: 2, HostName: 'mock_2', Description: 'desc_1', Status: -300, LastPing: new Date(), IPs: ['127.0.0.1', '10.1.0.1'] } as Server
        ];
    }
}


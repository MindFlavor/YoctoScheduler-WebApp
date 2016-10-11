import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from './server';

import { GenericHTTPService } from '../generic_http.service'
import { GenericService } from '../generic.service'

@Injectable()
export class ServerService extends GenericHTTPService<Server, number> {
    protected getUrl(): string {
        return 'http://localhost:9000/api/servers';  // URL to web api
    }

    constructor(http: Http) { super(http); }
}

@Injectable()
export class MockServerService implements GenericService<Server, number>  {
    private data: Server[];

    constructor() {
        this.data = [
            { ID: 1, HostName: 'mock_1', Description: 'desc_1', Status: 100, LastPing: new Date(), IPs: ['localhost'] } as Server,
            { ID: 2, HostName: 'mock_2', Description: 'desc_1', Status: -300, LastPing: new Date(), IPs: ['127.0.0.1', '10.1.0.1'] } as Server
        ];
    }

    getFromREST(): Promise<Server[]> {
        return new Promise((res, rej) => {
            res(this.data);
        });
    }

    get(id: number): Promise<Server> {
        return new Promise((res, rej) => {
            let ret = this.data.find((i) => i.ID == id);
            if (ret)
                res(ret);
            else
                rej("cannot find ID " + id);
        });
    }

    save(t: Server): Promise<Server> { return undefined }
}


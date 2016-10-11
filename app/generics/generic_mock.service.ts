import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenericHTTPService } from './generic_http.service'
import { EntityWithID } from './entity_with_id'
import { GenericService } from './generic.service'

@Injectable()
export abstract class GenericMockService<T extends EntityWithID<K>, K> implements GenericService<T, K>  {
    protected data: T[];

    constructor() {
        this.data = this.initializeData();
    }

    protected abstract initializeData(): T[];

    getFromREST(): Promise<T[]> {
        return new Promise((res, rej) => {
            res(this.data);
        });
    }

    get(id: K): Promise<T> {
        return new Promise((res, rej) => {
            let ret = this.data.find((i) => i.ID == id);
            if (ret)
                res(ret);
            else
                rej("cannot find ID " + id);
        });
    }

    save(t: T): Promise<T> {
        return new Promise((res, rej) => {
            let idx = this.data.findIndex((i) => i.ID == t.ID);
            if (idx) {
                let old = this.data[idx];
                this.data[idx] = t;
                res(old);
            }
            else
                rej("cannot find ID " + t.ID);
        });
    }
}
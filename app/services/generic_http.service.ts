import { Injectable } from "@angular/core";
import { HttpModule, Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { EntityWithID } from "../entities/entity_with_id";
import { GenericService } from "./generic.service";

@Injectable()
export abstract class GenericHTTPService<T extends EntityWithID<K>, K> implements GenericService<T, K>  {

    // public static BASE_URL = "http://localhost:9000/api";
    // public static BASE_URL = "http://frcognozbook:9000/api";
    public static BASE_URL = "http://cantun.mindflavor.it:9000/api";

    protected abstract getUrl(): string;

    constructor(protected http: Http) { }

    protected tArray: T[];

    getFromREST(): Promise<T[]> {
        return this.http.get(this.getUrl())
            .toPromise()
            .then(resp => {
                let objs = resp.json() as Array<any>;

                this.tArray = [];
                objs.map(obj => this.tArray.push(obj as T));
                return this.tArray;
            })
            .catch(this.handleError);
    }

    getAll(): Promise<T[]> {
        if (this.tArray) {
            console.log(this + ".getAll() from cache");
            return new Promise((res, rej) => { res(this.tArray); });
        }
        else {
            console.log(this + ".getAll() performing REST call");
            return this.getFromREST();
        }
    }

    get(id: K): Promise<T> {
        if (this.tArray) {
            let v = this.tArray.find(t => t.ID === id);
            return new Promise((res, rej) => {
                console.log("calling res with: " + v);
                res(v);
            });
        }

        this.getFromREST().then(arr => {
            let v = arr.find(t => t.ID === id);
            return new Promise((res, rej) => { res(v); });
        });
    }

    protected post(t: T): Promise<T> {
        let headers = new Headers({
            "Content-Type": "application/json"
        });

        return this.http
            .post(this.getUrl(), JSON.stringify(t), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    protected put(t: T): Promise<T> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let url = this.getUrl() + `/${t.ID}`;

        return this.http
            .put(url, JSON.stringify(t), { headers: headers })
            .toPromise()
            .then(() => t)
            .catch(this.handleError);
    }

    protected handleError(error: any) {
        console.error("GenericHTTPService::" + this + " - An error occurred", error);
        return Promise.reject(error.message || error);
    }

    save(t: T): Promise<T> {
        if (t.ID) {
            return this.put(t);
        }
        return this.post(t);
    }

    insertLocal(t: T) {
        this.tArray.push(t);
    }
}
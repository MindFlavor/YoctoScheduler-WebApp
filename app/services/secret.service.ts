import { Injectable } from '@angular/core';
import { HttpModule, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { EntityWithID } from '../entities/entity_with_id';
import { SecretID, Secret, EncryptedSecret, PlainTextSecret } from '../entities/secret';
import { GenericService } from './generic.service';
import { GenericHTTPService } from './generic_http.service';

@Injectable()
export class SecretService extends GenericHTTPService<Secret, SecretID> {
    constructor(protected http: Http) { super(http); }

    protected getUrl(): string { return ''; }

    protected getUrlPlainText(): string {
        return GenericHTTPService.BASE_URL + "/plaintextsecretitems";
    }

    protected getUrlEncrypted(): string {
        return GenericHTTPService.BASE_URL + "/encryptedsecretitems";
    }

    public toString(): string {
        return "SecretService";
    }

    protected encSecrets: EncryptedSecret[];

    getFromREST(): Promise<EncryptedSecret[]> {
        return this.http.get(this.getUrlEncrypted())
            .toPromise()
            .then(resp => {
                let objs = resp.json() as Array<EncryptedSecret>;
                this.encSecrets = [];
                objs.map(obj => this.encSecrets.push(
                    new EncryptedSecret(obj.ID, obj.CertificateThumbprint, obj.EncryptedValue)
                ));
                return this.encSecrets;
            })
            .catch(this.handleError)
    }

    getAll(): Promise<EncryptedSecret[]> {
        if (this.encSecrets) {
            console.log(this + '.getAll() from cache');
            return new Promise((res, rej) => { res(this.encSecrets); })
        }
        else {
            console.log(this + '.getAll() performing REST call');
            return this.getFromREST();
        }
    }

    get(id: string): Promise<EncryptedSecret> {
        if (this.encSecrets) {
            let v = this.encSecrets.find(t => t.ID === id);
            return new Promise((res, rej) => {
                console.log('calling res with: ' + v);
                res(v);
            });
        }

        this.getFromREST().then(arr => {
            let v = arr.find(t => t.ID === id);
            return new Promise((res, rej) => { res(v); });
        });
    }

    public post(t: PlainTextSecret): Promise<PlainTextSecret> {
        console.log('post');
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.getUrlPlainText(), JSON.stringify(t), { headers: headers })
            .toPromise()
            .then(res => {
                console.log('wow!');
                return res.json().data
            })
            .catch(this.handleError);
    }

    public put(t: PlainTextSecret): Promise<PlainTextSecret> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = this.getUrlPlainText() + `/${t.ID}`;

        return this.http
            .put(url, JSON.stringify(t), { headers: headers })
            .toPromise()
            .then(() => t)
            .catch(this.handleError);
    }

    public delete(id: SecretID): Promise<boolean> {
        let url = this.getUrlEncrypted() + `/${id}`;

        return this.http
            .delete(url)
            .toPromise()
            .then(() => { return true })
            .catch(this.handleError);
    }

    save(t: PlainTextSecret): Promise<PlainTextSecret> {
        if (t.ID) {
            return this.put(t);
        }
        return this.post(t);
    }

    insertLocal(t: PlainTextSecret) {
        throw "Cannot insert a plain text secret!";
    }

    protected handleError(error: any) {
        console.error('GenericHTTPService::' + this + ' - An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
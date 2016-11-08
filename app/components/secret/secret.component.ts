import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../../services/generic_http.service';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { Secret, PlainTextSecret, EncryptedSecret, CompleteSecret } from '../../entities/secret';
import { SecretService } from '../../services/secret.service';

import { GenericComponent } from '../generic.component';

@Component({
    selector: 'yocto-secrets',
    templateUrl: '../html/secret/secret.component.html',
    providers: []
})
export class SecretComponent implements OnInit {
    newSecret: CompleteSecret = undefined;
    secrets: CompleteSecret[];
    selectedSecret: CompleteSecret;

    constructor(private secretService: SecretService) { }

    ngOnInit() {
        this.getData();
    }

    protected getData() {
        this.secretService.getFromREST()
            .then(r => {
                this.secrets = [];
                r.map((s) => this.secrets.push(new CompleteSecret(s.ID, s.CertificateThumbprint, '', s.EncryptedValue)));
            })
            .catch((e) => console.log('Something went wrong: ' + e + '!'));
    }

    public onSelect(secret: CompleteSecret) {
        this.selectedSecret = secret;
        if (this.selectedSecret != this.newSecret) {
            return;
        }
    }

    public createNewSecret() {
        if (this.newSecret) {
            this.selectedSecret = this.newSecret;
            return;
        }
        this.newSecret = new CompleteSecret('', '', '', '');
        this.secrets.push(
            this.newSecret
        );
        this.selectedSecret = this.newSecret;
    }
}
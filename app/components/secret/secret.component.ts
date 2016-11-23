import { Component, OnInit, OnDestroy } from "@angular/core";
import { GenericHTTPService } from "../../services/generic_http.service";
import { HttpModule } from "@angular/http";

import { Observable, Subscription } from "rxjs/Rx";

import { Secret, PlainTextSecret, EncryptedSecret, CompleteSecret } from "../../entities/secret";
import { SecretService } from "../../services/secret.service";

import { GenericComponent } from "../generic.component";

@Component({
    selector: "yocto-secrets",
    templateUrl: "../html/secret/secret.component.html",
    providers: []
})
export class SecretComponent implements OnInit {
    secrets: CompleteSecret[];
    selectedSecret: CompleteSecret;

    lastError: string = undefined;

    constructor(private secretService: SecretService) { }

    ngOnInit() {
        this.getData();
    }

    protected getData() {
        this.secretService.getFromREST()
            .then(r => {
                this.secrets = [];
                r.map((s) => this.secrets.push(new CompleteSecret(s.ID, s.CertificateThumbprint, "", s.EncryptedValue)));
            })
            .catch((e) => console.log("Something went wrong: " + e + "!"));
    }

    public onSelect(secret: CompleteSecret) {
        this.selectedSecret = secret;
    }

    public createNewSecret() {
        let idxNewSecret = this.secrets.findIndex((s) => s.ID === "");
        if (idxNewSecret !== -1) {
            this.selectedSecret = this.secrets[idxNewSecret];
            return;
        }
        let newSecret = new CompleteSecret("", "", "", "");
        if (!this.secrets)
            this.secrets = [];
        this.secrets.push(
            newSecret
        );
        this.selectedSecret = newSecret;
    }

    public deleteSecret(sec: CompleteSecret) {
        this.lastError = undefined;

        let idxToDelete = this.secrets.findIndex((s) => s.ID === sec.ID);
        console.log("idxToDelete === " + idxToDelete);

        this.secrets.splice(idxToDelete, 1);
        if (sec.ID === "")
            return;

        // perform the async delete
        this.secretService.delete(sec).catch((ex) => {
            this.lastError = `Last delete failed ${ex}.`;
        });
    }
}
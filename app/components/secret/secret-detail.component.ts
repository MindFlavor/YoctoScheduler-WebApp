import { Component, Input } from "@angular/core";
import { SecretService } from "../../services/secret.service";
import { Secret, PlainTextSecret, EncryptedSecret, CompleteSecret } from "../../entities/secret";

@Component({
    selector: "secret-detail",
    templateUrl: "../html/secret/secret-detail.component.html",
})
export class SecretDetailComponent {
    @Input()
    secret: Secret;

    lastError: string = undefined;
    lastSuccess: string = undefined;

    constructor(private secretService: SecretService) { }

    public persistSecret(pts: CompleteSecret) {
        if (pts.ID === "") {
            this.lastSuccess = undefined;
            this.lastError = "Secrets must have a valid name.";
            return;
        }
        this.secretService.post(new PlainTextSecret(pts.ID, pts.CertificateThumbprint, pts.PlainTextValue)).then(() => {
            this.lastError = "";
            this.lastSuccess = "Operation completed";
        }).catch((e) => {
            this.lastSuccess = undefined;
            this.lastError = e;
        });
    }
}
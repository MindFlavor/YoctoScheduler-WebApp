import { EntityWithID } from "./entity_with_id";

export type SecretID = string;

export abstract class Secret implements EntityWithID<SecretID> {
    constructor(public ID: SecretID,
        public CertificateThumbprint: string) { }
}

export class EncryptedSecret extends Secret {
    constructor(ID: SecretID,
        CertificateThumbprint: string,
        public EncryptedValue: string) {
        super(ID, CertificateThumbprint);
    }
}

export class PlainTextSecret extends Secret {
    constructor(ID: SecretID,
        CertificateThumbprint: string,
        public PlainTextValue: string) {
        super(ID, CertificateThumbprint);
    }
}

export class CompleteSecret extends PlainTextSecret {
    constructor(ID: SecretID,
        CertificateThumbprint: string,
        PlainTextValue: string, public EncryptedValue: string) {
        super(ID, CertificateThumbprint, PlainTextValue);
    }
}
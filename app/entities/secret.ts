import { EntityWithID } from './entity_with_id';

export abstract class Secret implements EntityWithID<string> {
    constructor(public ID: string,
        public CertificateThumbprint: string)
    { }
}

export class EncryptedSecret extends Secret {
    constructor(ID: string,
        CertificateThumbprint: string,
        public EncryptedValue: string) {
        super(ID, CertificateThumbprint);
    }
}

export class PlainTextSecret extends Secret {
    constructor(ID: string,
        CertificateThumbprint: string,
        public PlainTextValue: string) {
        super(ID, CertificateThumbprint);
    }
}

export class CompleteSecret extends PlainTextSecret {
    constructor(ID: string,
        CertificateThumbprint: string,
        PlainTextValue: string, public EncryptedValue: string) {
        super(ID, CertificateThumbprint, PlainTextValue);
    }
}
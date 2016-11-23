import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Schedule, ScheduleID } from "../entities/schedule";

import { GenericHTTPService } from "./generic_http.service";
import { GenericService } from "./generic.service";
import { GenericMockService } from "./generic_mock.service";

@Injectable()
export class ScheduleService extends GenericHTTPService<Schedule, ScheduleID> {
    protected getUrl(): string {
        return GenericHTTPService.BASE_URL + "/schedules";  // URL to web api
    }

    constructor(http: Http) { super(http); }

    public toString(): string {
        return "ScheduleService";
    }
}


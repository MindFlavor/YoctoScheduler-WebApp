import { Component, OnInit, OnDestroy } from "@angular/core";
import { GenericHTTPService } from "../../services/generic_http.service";
import { HttpModule } from "@angular/http";

import { Observable, Subscription } from "rxjs/Rx";

import { Server } from "../../entities/server";
import { ServerService, MockServerService } from "../../services/server.service";

import { GenericComponent } from "../generic.component";

@Component({
    selector: "yocto-servers",
    templateUrl: "../html/server/server.component.html",
    providers: []
})
export class ServerComponent extends GenericComponent<Server, number> {
    selectedServer: Server;

    constructor(private serverService: ServerService) {
        super(serverService, 0);
    }

    protected AfterDataRetrieval() {
        if (!this.Entities)
            return;

        this.Entities = this.Entities.sort((a: Server, b: Server): number => {
            if (a.Status > b.Status)
                return -1;
            else if (a.Status < b.Status)
                return 1;
            else
                return 0;
        });
    }

    public onSelect(server: Server) {
        this.selectedServer = server;
    }
}
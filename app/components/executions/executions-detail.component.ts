import { Component, Input } from '@angular/core';
import { Execution, ItemWithTaskStatus } from '../../entities/executions';
import { TaskStatus } from '../../entities/task_status';
import { ServerID, Server } from '../../entities/server';

import { ServerService, MockServerService } from '../../services/server.service';

@Component({
    selector: 'executions-detail',
    templateUrl: '../html/executions/executions-detail.component.html',
})
export class ExecutionsDetailComponent {
    @Input()
    executions: Execution[];
    server: Server[] = [];

    constructor(private serverService: ServerService) {
        this.serverService.getAll().then((srvs) => {
            this.server = srvs;
        })
    }

    public serverByID(serverID: ServerID) : Server {
        return this.server.find((srv) => { return srv.ID === serverID});
    }
}
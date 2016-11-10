import { Component, Input } from "@angular/core";
import { Execution, ItemWithTaskStatus } from "../../entities/executions";
import { Task, TaskID } from "../../entities/task";
import { TaskStatus } from "../../entities/task_status";
import { ServerID, Server } from "../../entities/server";

import { ServerService, MockServerService } from "../../services/server.service";
import { TaskService, MockTaskService } from "../../services/task.service";

@Component({
    selector: "executions-detail",
    templateUrl: "../html/executions/executions-detail.component.html",
})
export class ExecutionsDetailComponent {
    @Input()
    executions: Execution[];
    server: Server[] = [];
    tasks: Task[] = [];

    constructor(private serverService: ServerService, private taskService: TaskService) {
        this.serverService.getAll().then((srvs) => {
            this.server = srvs;
        });
        this.taskService.getAll().then((tsks) => {
            this.tasks = tsks;
        });
    }

    public serverByID(serverID: ServerID): Server {
        return this.server.find((srv) => { return srv.ID === serverID; });
    }

    public taskByID(taskID: TaskID): Task {
        return this.tasks.find((tsk) => { return tsk.ID === taskID; });
    }
}
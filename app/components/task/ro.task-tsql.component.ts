import { Component, Input } from "@angular/core";
import { Task, TaskType } from "../../entities/task";
import { TSQLTask } from "../../entities/tsql-task";

import { TaskTSQLComponent } from "./task-tsql.component";

@Component({
    selector: "ro-task-tsql",
    templateUrl: "../../html/task/ro.task-tsql.component.html",
})
export class ROTaskTSQLComponent extends TaskTSQLComponent { }
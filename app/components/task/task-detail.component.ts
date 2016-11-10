import { Component, Input, OnChanges } from "@angular/core";
import { Task, TaskType } from "../../entities/task";
import { TaskService, MockTaskService } from "../../services/task.service";

@Component({
    selector: "task-detail",
    templateUrl: "../html/task/task-detail.component.html",
    providers: [TaskService, MockTaskService]
})
export class TaskDetailComponent implements OnChanges {
    @Input()
    task: Task;

    taskType = TaskType;

    localEnabled = true;
    globalEnabled = true;
    buttonEnabled = true;

    lastError: string = undefined;

    constructor(private taskService: TaskService) { }

    public persistTask() {
        this.buttonEnabled = false;
        this.task.updatePayload();

        this.taskService.save(this.task)
            .then(() => {
                this.lastError = undefined;
                console.log("persistTask() completed: " + this.task);
                this.buttonEnabled = true;
            })
            .catch((exce) => {
                if (exce._body) {
                    let t = JSON.parse(exce._body);

                    if (t.ExceptionMessage)
                        this.lastError = t.ExceptionMessage;
                    else
                        this.lastError = exce.Message;
                }
                else {
                    this.lastError = exce;
                }

                console.log("persistTask failed: " + this.lastError);
                this.buttonEnabled = true;
            });
    }

    public ngOnChanges() {
        if (this.task) {
            this.localEnabled = this.task.ConcurrencyLimitSameInstance > 0;
            this.globalEnabled = this.task.ConcurrencyLimitGlobal > 0;
        }
    }

    public changeConcurrencyLimit(type: string) {
        switch (type) {
            case "local":
                if (this.task.ConcurrencyLimitSameInstance === 0)
                    this.task.ConcurrencyLimitSameInstance = 1;
                else
                    this.task.ConcurrencyLimitSameInstance = 0;
                break;
            case "global":
                if (this.task.ConcurrencyLimitGlobal === 0)
                    this.task.ConcurrencyLimitGlobal = 1;
                else
                    this.task.ConcurrencyLimitGlobal = 0;
                break;
        }
    }
}
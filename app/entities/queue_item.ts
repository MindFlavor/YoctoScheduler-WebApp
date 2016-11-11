import { TaskID } from "./task";
import { EntityWithID } from "./entity_with_id";
import { TaskPriority } from "./task_priority";

export class QueueItem implements EntityWithID<string> {
    constructor(public ID: string, public TaskID: TaskID, public Priority: TaskPriority) { }
}
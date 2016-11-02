import { TaskID } from './task';
import { EntityWithID } from './entity_with_id';

export class QueueItem implements EntityWithID<string> {
    constructor(public ID: string, public TaskID: TaskID, public Priority: number) { }
}
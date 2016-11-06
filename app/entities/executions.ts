import { EntityWithID } from './entity_with_id';
import { TaskID } from './task';
import { ScheduleID } from './schedule';
import { TaskStatus } from './task_status';
import { ServerID } from './server';

export type ItemWithTaskStatusPartitionedByStatus<T> = { [status: number]: ItemWithTaskStatus<T>[] };

export abstract class ItemWithTaskStatus<T> implements EntityWithID<T> {
    ID: T;
    constructor(public Status: TaskStatus) { }

    public static partitionByStatus<T>(iws: ItemWithTaskStatus<T>[]): ItemWithTaskStatusPartitionedByStatus<T> {
        var map: ItemWithTaskStatusPartitionedByStatus<T> = {};

        for (status in TaskStatus) {
            let statusNum = parseInt(status);
            if (!isNaN(statusNum)) {
                map[status] = iws.filter((i) => i.Status as number === statusNum);
            }
        }

        return map;
    }
}

export class Execution extends ItemWithTaskStatus<string> {
    constructor(ID: string,
        Status: TaskStatus,
        public Inserted: Date,
        public LastUpdate: Date,
        public ReturnCode: string,
        public ScheduleID: ScheduleID,
        public ServerID: ServerID,
        public TaskID: TaskID) {
        super(Status)
        this.ID = ID;
    }

    get Elapsed(): number {
        return this.LastUpdate.getTime() - this.Inserted.getTime();
    }
}
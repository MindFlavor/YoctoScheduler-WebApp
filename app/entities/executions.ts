import { EntityWithID } from './entity_with_id';
import { TaskID } from './task';
import { ScheduleID } from './schedule';
import { TaskStatus } from './task_status';
import { ServerID } from './server';

export abstract class ItemWithTaskStatus<T> implements EntityWithID<T> {
    ID: T;
    Status: TaskStatus;

    public static partitionByStatus<T>(iws: ItemWithTaskStatus<T>[]): ItemWithTaskStatus<T>[] {
        var map: { [status: number]: ItemWithTaskStatus<T>[] };

        for(status in TaskStatus) {
            map[status] = iws.filter((i) => i.Status === status);
        }

        return undefined;
    }
}

export interface DeadExecution extends ItemWithTaskStatus<string> {
    Inserted: Date;
    LastUpdate: Date;
    ReturnCode: string;
    ScheduleID: ScheduleID;
    ServerID: ServerID;
    TaskID: TaskID;
}
import { EntityWithID } from './entity_with_id';
import { TaskID } from './task';
import { ScheduleID } from './schedule';
import { TaskStatus } from './task_status';
import { ServerID } from './server';

export type ItemWithTaskStatusPartitionedByStatus<T> = { [status: number]: ItemWithTaskStatus<T>[] };

export abstract class ItemWithTaskStatus<T> implements EntityWithID<T> {
    ID: T;
    Status: TaskStatus;

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

export interface DeadExecution extends ItemWithTaskStatus<string> {
    Inserted: Date;
    LastUpdate: Date;
    ReturnCode: string;
    ScheduleID: ScheduleID;
    ServerID: ServerID;
    TaskID: TaskID;
}
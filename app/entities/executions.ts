import { EntityWithID } from './entity_with_id';
import { TaskID } from './task';
import { ScheduleID } from './schedule';
import { TaskStatus } from './task_status';
import { ServerID } from './server';

export abstract class ItemWithStatus<T> implements EntityWithID<T> {
    ID: T;
    Status : TaskStatus;

    public static partitionByStatus<T>(iws : ItemWithStatus<T>) : number {
        // TODO
        // return 1;
    }
}

export interface DeadExecution extends ItemWithStatus<string> {
    Inserted: Date;
    LastUpdate: Date;
    ReturnCode: string;
    ScheduleID: ScheduleID;
    ServerID: ServerID;
    TaskID: TaskID;
}
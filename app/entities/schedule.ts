import { EntityWithID } from "./entity_with_id";
import { TaskID } from "./task";

export type ScheduleID = string;

export class Schedule implements EntityWithID<ScheduleID> {
    public ID: ScheduleID;
    public Cron: string;
    public Enabled: boolean;
    public TaskID: TaskID;
    public LastFired: Date;
}
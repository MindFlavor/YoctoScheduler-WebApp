import { EntityWithID } from "./entity_with_id";

export type ScheduleID = string;

export class Schedule implements EntityWithID<ScheduleID> {
    public ID: ScheduleID;
    public Cron: string;
    public Enabled: boolean;
    public LastFired: Date;
}
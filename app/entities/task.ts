import { EntityWithID } from './entity_with_id';

export type TaskID = number;

export enum TaskType {
    Generic,
    Wait,
    TSQL,
    PowerShell,
    SSIS,
    Passthrough,
    Unknown = 5000
}

export interface TaskFromWS {
    ID: TaskID;
    Name: string;
    ConcurrencyLimitGlobal: number;
    ConcurrencyLimitSameInstance: number;
    Description: string;
    ReenqueueOnDead: boolean;
    Type: string;
    Payload: string;
}

export class Task {
    ID: TaskID;
    Name: string;
    ConcurrencyLimitGlobal: number;
    ConcurrencyLimitSameInstance: number;
    Description: string;
    ReenqueueOnDead: boolean;
    Type: TaskType;
    Payload: string;

    constructor() {
        this.ID = -1000;
        this.Type = TaskType.Generic;
        this.ConcurrencyLimitGlobal = 0;
        this.ConcurrencyLimitSameInstance = 0;
        this.ReenqueueOnDead = false;
    }

    public toString(): string {

        return `Task (ID: ${this.ID}, Name: ${this.Name})`;
    }

    protected cloneData(from: TaskFromWS) {
        this.ID = from.ID;
        this.Name = from.Name;
        this.ConcurrencyLimitGlobal = from.ConcurrencyLimitGlobal;
        this.ConcurrencyLimitSameInstance = from.ConcurrencyLimitSameInstance;
        this.Description = from.Description;
        this.ReenqueueOnDead = from.ReenqueueOnDead;

        // TODO
        // this.Type = from.Type;
        this.Payload = from.Payload;
    }

    public static fromTaskFromWS(t: TaskFromWS): Task {
        let wt: Task = new Task();
        wt.cloneData(t);
        wt.paramsFromPayload();

        return wt;
    }

    public toTaskFromWS(): TaskFromWS {
        let tws: TaskFromWS = {} as TaskFromWS;

        tws.ID = this.ID;
        tws.Name = this.Name;
        tws.ConcurrencyLimitGlobal = this.ConcurrencyLimitGlobal;
        tws.ConcurrencyLimitSameInstance = this.ConcurrencyLimitSameInstance;
        tws.Description = this.Description;
        tws.ReenqueueOnDead = this.ReenqueueOnDead;
        tws.Payload = this.Payload;

        switch (this.Type) {
            case TaskType.Wait:
                tws.Type = "WaitTask";
                break;
            case TaskType.TSQL:
                tws.Type = "TSQLTask";
                break;
            case TaskType.PowerShell:
                tws.Type = "PowerShellTask";
                break;
            case TaskType.SSIS:
                tws.Type = "SSISTask";
                break;
            default:
                tws.Type = "Unknown";
                break;
        }
        return tws;
    }

    public TypeToString() {
        return TaskType[this.Type];
    }

    public updatePayload(): void {
    }

    public paramsFromPayload(): void {
    }

    public taskImage(): string {
        switch (this.Type) {
            case TaskType.Wait: return "html/imgs/wait_16x16.png";
            case TaskType.Passthrough: return "html/imgs/passthrough_16x16.png";
            case TaskType.SSIS: return "html/imgs/ssis_16x16.png";
            case TaskType.PowerShell: return "html/imgs/powershell_16x16.png";
            case TaskType.TSQL: return "html/imgs/tsql_16x16.png";
            default: return "html/imgs/unknown_16x16.png";
        }
    }
}


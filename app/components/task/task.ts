import { EntityWithID } from '../../generics/entity_with_id';

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
    ID: number;
    Name: string;
    ConcurrencyLimitGlobal: number;
    ConcurrencyLimitSameInstance: number;
    Description: string;
    ReenqueueOnDead: boolean;
    Type: string;
    Payload: string;
}

export class Task {
    ID: number;
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
        wt.paramsToPayload();

        return wt;
    }

    public TypeToString() {
        return TaskType[this.Type];
    }

    public updatePayload(): void {
    }

    public paramsToPayload(): void {
    }
}


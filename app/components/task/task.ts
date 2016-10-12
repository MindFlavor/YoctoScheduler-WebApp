import { EntityWithID } from '../../generics/entity_with_id';


export class Task {
    ID: number;
    Name: string;
    ConcurrencyLimitGlobal: number;
    ConcurrencyLimitLocal: number;
    Description: string;
    ReenqueueOnDead: boolean;
    Type: string;
    Payload: string;

    protected cloneData(from: Task) {
        this.ID = from.ID;
        this.Name = from.Name;
        this.ConcurrencyLimitGlobal = from.ConcurrencyLimitGlobal;
        this.ConcurrencyLimitLocal = from.ConcurrencyLimitLocal;
        this.Description = from.Description;
        this.ReenqueueOnDead = from.ReenqueueOnDead;
        this.Type = from.Type;
        this.Payload = from.Payload;
    }

    public static fromTask(t: Task): Task {
        let wt: Task = new Task();
        wt.cloneData(t);
        wt.paramsToPayload();

        return wt;
    }

    public updatePayload(): void {
    }

    public paramsToPayload(): void {
    }
}

export class WaitTask extends Task {
    SleepSeconds: number;

    public static fromTask(t: Task): WaitTask {
        if (!(t.Type === "Wait"))
            throw "Unsupported conversion"

        let wt: WaitTask = new WaitTask();
        wt.cloneData(t);
        wt.paramsToPayload();

        return wt;
    }

    public updatePayload(): void {
        this.Payload = JSON.stringify(this);
        console.log('payload == ' + this.Payload);
    }

    public paramsToPayload(): void {
        let objs = JSON.parse(this.Payload) as WaitTask;
        console.log(objs);
        this.SleepSeconds = objs.SleepSeconds;
    }
}
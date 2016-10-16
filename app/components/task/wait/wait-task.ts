import { Task, TaskFromWS, TaskType } from '../task';

export class WaitTask extends Task {
    SleepSeconds: number;

    constructor() {
        super();

        this.Type = TaskType.Wait;
        this.SleepSeconds = 60;
    }

    public static fromTaskFromWS(t: TaskFromWS): WaitTask {
        if (!(t.Type === "WaitTask"))
            throw "Unsupported conversion"

        let wt: WaitTask = new WaitTask();
        wt.cloneData(t);
        wt.paramsFromPayload();

        return wt;
    }

    public updatePayload(): void {
        let wt: any = {};

        wt.SleepSeconds = this.SleepSeconds;

        this.Payload = JSON.stringify(wt);
        console.log('this == ' + JSON.stringify(this));
    }

    public paramsFromPayload(): void {
        let objs = JSON.parse(this.Payload) as WaitTask;
        this.SleepSeconds = objs.SleepSeconds;
    }
}
import { Task, TaskType } from '../task';

export class WaitTask extends Task {
    SleepSeconds: number;

    constructor() {
        super();

        this.Type = TaskType.Wait;
    }

    public static fromTask(t: Task): WaitTask {
        if (!(t.Type === TaskType.Wait))
            throw "Unsupported conversion"

        let wt: WaitTask = new WaitTask();
        wt.cloneData(t);
        wt.paramsToPayload();

        return wt;
    }

    public updatePayload(): void {
        let wt = new WaitTask();
        wt.SleepSeconds = this.SleepSeconds;        
        this.Payload = JSON.stringify(wt);
        console.log('this == ' + JSON.stringify(this));        
    }

    public paramsToPayload(): void {
        let objs = JSON.parse(this.Payload) as WaitTask;
        console.log(objs);
        this.SleepSeconds = objs.SleepSeconds;
    }
}
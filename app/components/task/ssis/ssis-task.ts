import { Task, TaskFromWS, TaskType } from '../task';

export class SSISTask extends Task {
    Use32Bit: boolean;
    SQLVersion: string;
    Arguments: string;
    Timeout: number;


    constructor() {
        super();

        this.Type = TaskType.SSIS;

        this.Timeout = 0;
        this.Use32Bit = false;
        this.SQLVersion = "120";
    }

    public static fromTaskFromWS(t: TaskFromWS): SSISTask {
        if (!(t.Type === "SSISTask"))
            throw "Unsupported conversion"

        let wt: SSISTask = new SSISTask();
        wt.cloneData(t);
        wt.paramsFromPayload();

        return wt;
    }

    public updatePayload(): void {
        let wt: any = {};

        wt.Use32Bit = this.Use32Bit;
        wt.SQLVersion = this.SQLVersion;
        wt.Arguments = this.Arguments;
        wt.Timeout = this.Timeout;

        this.Payload = JSON.stringify(wt);
        console.log('this == ' + JSON.stringify(this));
    }

    public paramsFromPayload(): void {
        let objs = JSON.parse(this.Payload);
        this.Use32Bit = objs.Use32Bit;
        this.SQLVersion = objs.SQLVersion;
        this.Arguments = objs.Arguments;
        this.Timeout = objs.Timeout;
    }
}
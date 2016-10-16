import { Task, TaskFromWS, TaskType } from '../task';

export class TSQLTask extends Task {
    ConnectionString: string;
    Statement: string;
    CommandTimeout: number;

    constructor() {
        super();

        this.Type = TaskType.TSQL;
    }

    public static fromTaskFromWS(t: TaskFromWS): TSQLTask {
        if (!(t.Type === "TSQLTask"))
            throw "Unsupported conversion"

        let wt: TSQLTask = new TSQLTask();
        wt.cloneData(t);
        wt.paramsFromPayload();

        return wt;
    }

    public updatePayload(): void {
        let wt: any = {};
        wt.ConnectionString = this.ConnectionString;
        wt.Statement = this.Statement;
        wt.CommandTimeout = this.CommandTimeout;
        this.Payload = JSON.stringify(wt);
        console.log('this == ' + JSON.stringify(this));
    }

    public paramsFromPayload(): void {
        let objs = JSON.parse(this.Payload);
        console.log(objs);
        this.ConnectionString = objs.ConnectionString;
        this.Statement = objs.Statement;
        this.CommandTimeout = objs.CommandTimeout;
    }
}
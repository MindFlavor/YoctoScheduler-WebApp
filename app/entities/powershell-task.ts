import { Task, TaskFromWS, TaskType } from "./task";

export class PowerShellTask extends Task {
    Script: string;

    constructor() {
        super();

        this.Type = TaskType.PowerShell;
    }

    public static fromTaskFromWS(t: TaskFromWS): PowerShellTask {
        if (!(t.Type === "PowerShellTask"))
            throw "Unsupported conversion";

        let wt: PowerShellTask = new PowerShellTask();
        wt.cloneData(t);
        wt.paramsFromPayload();

        return wt;
    }

    public updatePayload(): void {
        let wt: any = {};

        wt.Script = this.Script;

        this.Payload = JSON.stringify(wt);
        console.log("this == " + JSON.stringify(this));
    }

    public paramsFromPayload(): void {
        let objs = JSON.parse(this.Payload);
        this.Script = objs.Script;
    }
}
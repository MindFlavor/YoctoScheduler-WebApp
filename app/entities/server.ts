export type ServerID = number;

export interface Server {
    ID: ServerID;
    HostName: string;
    Description: string;
    Status: number;
    LastPing: Date;
    IPs: string[];
}
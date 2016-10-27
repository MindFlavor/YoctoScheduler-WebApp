export interface Server {
    ID: number,
    HostName: string,
    Description: string,
    Status: number,
    LastPing: Date,
    IPs: string[]
}
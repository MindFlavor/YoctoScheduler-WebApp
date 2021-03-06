export enum TaskStatus {
    Unknown = 0,
    Idle = 100,
    Starting = 200,
    Running = 300,
    Completed = 1000,
    Aborted = -2000,
    ExceptionDuringExecution = -3000,
    ExceptionAtStartup = -3500,
    Dead = -100
};
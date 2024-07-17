export interface Runner {
    ip: string;
    state: RunnerState;
}

export interface MessageResponse {
    message: boolean;
}

export enum RunnerState {
    NOT_STARTED = "not started",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    STOPPED = "stopped"
}
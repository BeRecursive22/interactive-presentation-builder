


export interface JobStatusEventType {
    type: "status";
    message: string;
}


export interface JobStatusType {
    id: string;
    message: string;
    isInProgress: boolean;
    streamId: string;
}
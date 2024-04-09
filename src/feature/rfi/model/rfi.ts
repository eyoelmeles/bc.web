
export interface RFI {
    id: string;
    title: string
    description: string;
    date: string;
    siteId: string;
    assignee: string;
    attachement: string;
    status: RFIStatus;
}

export enum RFIStatus {
    pending,
    declined,
    resolved
}
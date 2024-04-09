import { Schedule } from "../../schedule/model/schedule";

export interface Inspection {
  id: string;
  description: string;
  status: InspectionStatus | null;
  scheduleId: string;
  schedule: Schedule;
}

export enum InspectionStatus {
  Pass,
  Fail,
  NA,
}

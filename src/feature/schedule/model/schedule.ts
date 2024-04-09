export interface Schedule {
  id: string;
  name: string;
  description: string;
  fromDate: string;
  toDate: string;
  siteId: string;
  parentSchedule: string | null;
  status: boolean;
}

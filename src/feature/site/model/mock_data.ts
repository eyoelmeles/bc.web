interface UserDTO {
  id: number;
  name: string;
  email: string;
  //... other fields
}

interface StaffOnSiteDTO {
  id: number;
  name: string;
  role: string;
  //... other fields
}

interface LabourForceDTO {
  id: number;
  role: string;
  count: number;
  //... other fields
}

interface MaterialReportDTO {
  id: number;
  materialName: string;
  quantityUsed: number;
  //... other fields
}

interface EquipmentReportDTO {
  id: number;
  equipmentName: string;
  hoursUsed: number;
  //... other fields
}

interface DailyReportDTO {
  date: Date;
  workHour: number;
  interruptedHour: number;
  weather: string;
  staffsOnSite: StaffOnSiteDTO[];
  labourForces: LabourForceDTO[];
  materialsReport: MaterialReportDTO[];
  equipmentReport: EquipmentReportDTO[];
  createdByUser: UserDTO;
  approvedByUser?: UserDTO | null;
  profitable: number;
}

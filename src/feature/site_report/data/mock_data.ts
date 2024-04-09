export const mockDailyReport: DailyReportDTO[] = [
  {
    date: new Date(),
    workHour: 8,
    interruptedHour: 2,
    weather: "Sunny",
    staffsOnSite: [
      { id: 1, name: "Alice", role: "Engineer" },
      //... other staff
    ],
    labourForces: [
      { id: 1, role: "Mason", count: 5 },
      //... other labour forces
    ],
    materialsReport: [
      { id: 1, materialName: "Bricks", quantityUsed: 100 },
      //... other materials
    ],
    equipmentReport: [
      { id: 1, equipmentName: "Crane", hoursUsed: 5 },
      { id: 2, equipmentName: "Crane", hoursUsed: 5 },
      { id: 3, equipmentName: "Crane", hoursUsed: 5 },
      { id: 4, equipmentName: "Crane", hoursUsed: 5 },
      { id: 5, equipmentName: "Crane", hoursUsed: 5 },
      //... other equipment
    ],
    createdByUser: { id: 1, name: "Admin", email: "admin@example.com" },
    approvedByUser: { id: 2, name: "Manager", email: "manager@example.com" },
    profitable: 1000,
  },
  //... other reports
  {
    date: new Date(),
    workHour: 8,
    interruptedHour: 2,
    weather: "Sunny",
    staffsOnSite: [
      { id: 1, name: "Alice", role: "Engineer" },
      //... other staff
    ],
    labourForces: [
      { id: 1, role: "Mason", count: 5 },
      //... other labour forces
    ],
    materialsReport: [
      { id: 1, materialName: "Bricks", quantityUsed: 100 },
      //... other materials
    ],
    equipmentReport: [
      { id: 1, equipmentName: "Crane", hoursUsed: 5 },
      { id: 2, equipmentName: "Crane", hoursUsed: 5 },
      { id: 3, equipmentName: "Crane", hoursUsed: 5 },
      { id: 4, equipmentName: "Crane", hoursUsed: 5 },
      { id: 5, equipmentName: "Crane", hoursUsed: 5 },
      //... other equipment
    ],
    createdByUser: { id: 1, name: "Admin", email: "admin@example.com" },
    approvedByUser: { id: 2, name: "Manager", email: "manager@example.com" },
    profitable: 1000,
  },
  {
    date: new Date(),
    workHour: 8,
    interruptedHour: 2,
    weather: "Sunny",
    staffsOnSite: [
      { id: 1, name: "Alice", role: "Engineer" },
      //... other staff
    ],
    labourForces: [
      { id: 1, role: "Mason", count: 5 },
      //... other labour forces
    ],
    materialsReport: [
      { id: 1, materialName: "Bricks", quantityUsed: 100 },
      //... other materials
    ],
    equipmentReport: [
      { id: 1, equipmentName: "Crane", hoursUsed: 5 },
      { id: 2, equipmentName: "Crane", hoursUsed: 5 },
      { id: 3, equipmentName: "Crane", hoursUsed: 5 },
      { id: 4, equipmentName: "Crane", hoursUsed: 5 },
      { id: 5, equipmentName: "Crane", hoursUsed: 5 },
      //... other equipment
    ],
    createdByUser: { id: 1, name: "Admin", email: "admin@example.com" },
    approvedByUser: { id: 2, name: "Manager", email: "manager@example.com" },
    profitable: 1000,
  },
];

import { Lookup } from "../../lookup/model/lookup";
import { Material } from "../../material/model/material";

export interface WorkItem {
  id: string;
  name: string;
  description: string;
  scheduleId: string;
  quantity: number;
  rate: number;
  unit: string;
  materialCostId?: string;
  equipmentCostId?: string;
  manPowerCostId?: string;
}


export enum WorkItemCost {
  manpower,
  material,
  equipment
}

export interface ManPowerCost {
  count: number;
  hourlyIndex: number;
  id: string;
  labourId: string;
  labour: Lookup;
  unitFactor: number;
  workItem: string;
}

export interface EquipmentCost {
  equipmentId: string;
  count: number;
  equipment: Lookup;
  hourlyRental: number;
  id: string;
  unitFactor: 44;
  workItem: string;
}
export interface MaterialCost {
  costPerUnit: number;
  id: string;
  material: Material
  materialId: string;
  quantity: 5;
  rate: 2;
  unitOfMeasure: Lookup;
  unitOfMeasureId: string;
  workItem: string;
}
export enum LookupType {
  UnitOfMeasure,
  Material,
  Equipment,
  Labour,
  StaffOnSite,
  Weather
}

export interface Lookup {
  id: string;
  name: string;
  lookupType: LookupType;
  description: string;
}

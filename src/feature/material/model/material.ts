import { Lookup } from "../../lookup/model/lookup";

export interface Material {
    id: string;
    name: string;
    unitOfMeasureId: string;
    unitOfMeasure: Lookup;
    siteId: string;
}
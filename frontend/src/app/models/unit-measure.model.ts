import { TypeMaterialModel } from "./type-material.model";

export interface UnitMeasureModel {
    idUnitMeasure?: number;
    nameUnitMeasure?: string;
    abbreviation?: string;
    multiplication?: number;
    idtypeMaterial?: TypeMaterialModel;
    authdata?: string
}
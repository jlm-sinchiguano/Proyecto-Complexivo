import { UnitMeasureModel } from "./unit-measure.model";

export interface MaterialModel {
    idMaterial?: number;
    nameMaterial?: string;
    widthMaterial?: number;
    lengthMaterial?: number;
    weightMaterial?: number;
    quantityMaterial?: number;
    extentMaterial?: number;
    priceMaterial?: number;
    unitMeasure?: UnitMeasureModel;
    typeMaterial?: string;
    authdata?: string
}
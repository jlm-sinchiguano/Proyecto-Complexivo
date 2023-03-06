import { MaterialModel } from "./material.model";
import { QuotationModel } from "./quotation.model";
import { UnitMeasureModel } from "./unit-measure.model";

export interface MaterialQuotationModel {
    idDetail?: number;
    widthDetail?: number;
    lengthDetail?: number;
    weightDetail?: number;
    quantityDetail?: number;
    extentDetail?: number;
    priceDetail?: number;
    material?: MaterialModel;
    idQuotation?: QuotationModel;
    idUnitMeasure?: UnitMeasureModel;
    authdata?: string
}
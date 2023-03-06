import { HandWorkModel } from "./hand-work.model";
import { QuotationModel } from "./quotation.model";

export interface HandWorkQuotationModel {
    idDetailHand?: number;
    hours?: number;
    minutes?: number;
    priceTime?: number;
    idQuotation?: QuotationModel;
    handWork?: HandWorkModel;
    authdata?: string
}
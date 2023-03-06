import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MaterialQuotationModel } from '../models/material-quotation.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialQuotationHttpService {
  API_URL:string;

  constructor( private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
   }

  index() {
    const url = `${this.API_URL}/detail-material-quotation`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id:number){
    const url = `${this.API_URL}/detail-material-quotation/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  filter(id:number){
    const url = `${this.API_URL}/price-material/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(materialQuotation: MaterialQuotationModel){
    const url = `${this.API_URL}/detail-material-quotation`;
    return this.httpClient.post<ResponseModel>(url,materialQuotation);
  }

  update(id:number, materialQuotation: MaterialQuotationModel){
    const url = `${this.API_URL}/detail-material-quotation/${id}`;
    return this.httpClient.put<ResponseModel>(url, materialQuotation);
  }

  destroy(id: number){
    const url = `${this.API_URL}/detail-material-quotation/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

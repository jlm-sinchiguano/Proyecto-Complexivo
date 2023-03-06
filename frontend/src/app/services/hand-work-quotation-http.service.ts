import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HandWorkQuotationModel } from '../models/hand-work-quotation.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HandWorkQuotationHttpService {
  API_URL: string;

  constructor( private httpClient:HttpClient) {
    this.API_URL = environment.API_URL;
   }

   index() {
    const url = `${this.API_URL}/detail-hand-work-quotation`;
    return this.httpClient.get<ResponseModel>(url);
  }

  filter(id:number){
    const url = `${this.API_URL}/price-hand/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id:number){
    const url = `${this.API_URL}/detail-hand-work-quotation/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(handQuotation: HandWorkQuotationModel){
    const url = `${this.API_URL}/detail-hand-work-quotation`;
    return this.httpClient.post<ResponseModel>(url,handQuotation);
  }

  update(id:number, handQuotation: HandWorkQuotationModel){
    const url = `${this.API_URL}/detail-hand-work-quotation/${id}`;
    return this.httpClient.put<ResponseModel>(url, handQuotation);
  }

  destroy(id: number){
    const url = `${this.API_URL}/detail-hand-work-quotation/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

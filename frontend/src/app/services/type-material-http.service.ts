import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { TypeMaterialModel } from '../models/type-material.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterialHttpService {
  API_URL:string;

  constructor( private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
   }

  index() {
    const url = `${this.API_URL}/type-material`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id:number){
    const url = `${this.API_URL}/type-material/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(typeMaterial: TypeMaterialModel){
    const url = `${this.API_URL}/type-material`;
    return this.httpClient.post<ResponseModel>(url,typeMaterial);
  }

  update(id:number, typeMaterial:TypeMaterialModel){
    const url = `${this.API_URL}/type-material/${id}`;
    return this.httpClient.put<ResponseModel>(url, typeMaterial);
  }

  destroy(id: number){
    const url = `${this.API_URL}/type-material/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

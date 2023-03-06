import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { MaterialModel } from '../models/material.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialHttpService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  index() {
    const url = `${this.API_URL}/material`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id: number) {
    const url = `${this.API_URL}/material/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(material: MaterialModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/material`;
    return this.httpClient.post<ResponseModel>(url, material)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            return throwError(new Error('Cotización ya existe'));
          } else {
            return throwError('error al crear cotización')
          }
        })
      )
  }

  update(id: number, material: MaterialModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/material/${id}`;
    return this.httpClient.put<ResponseModel>(url, material)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            return throwError(new Error('Material ya existe'));
          } else {
            return throwError('error al editar material')
          }
        })
      )

  }

  destroy(id: number) {
    const url = `${this.API_URL}/material/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

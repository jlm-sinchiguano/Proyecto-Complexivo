import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { UnitMeasureModel } from '../models/unit-measure.model';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasureHttpService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  index() {
    const url = `${this.API_URL}/unit-measure`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id: number) {
    const url = `${this.API_URL}/unit-measure/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(unitMeasure: UnitMeasureModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/unit-measure`;
    return this.httpClient.post<ResponseModel>(url, unitMeasure)
    .pipe(
      catchError(error => {
        if(error.status === 409) {
          return throwError(new Error('Unidad ya existe'));
        }else {
          return throwError('error al crear unidad')
        }
      })
    )
  }

  update(id: number, unitMeasure: UnitMeasureModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/unit-measure/${id}`;
    return this.httpClient.put<ResponseModel>(url, unitMeasure)
    .pipe(
      catchError(error => {
        if (error.status === 409) {
          return throwError(new Error('Unidad de medida ya existe'));
        } else {
          return throwError('error al editar unidad de medida')
        }
      })
    )
  }

  destroy(id: number) {
    const url = `${this.API_URL}/unit-measure/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

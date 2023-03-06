import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuotationModel } from '../models/quotation.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationHttpService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  index() {
    const url = `${this.API_URL}/quotation`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id: number) {
    const url = `${this.API_URL}/quotation/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(quotation: QuotationModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/quotation`;
    return this.httpClient.post<ResponseModel>(url, quotation)
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

  update(id: number, quotation: QuotationModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/quotation/${id}`;
    return this.httpClient.put<ResponseModel>(url, quotation)
    .pipe(
      catchError(error => {
        if (error.status === 409) {
          return throwError(new Error('Cotización ya existe'));
        } else {
          return throwError('error al editar cotización')
        }
      })
    )
  }

  destroy(id: number) {
    const url = `${this.API_URL}/quotation/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

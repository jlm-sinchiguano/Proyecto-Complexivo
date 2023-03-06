import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandWorkModel } from '../models/hand-work.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HandWorHttpService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  index() {
    const url = `${this.API_URL}/hand-work`;
    return this.httpClient.get<ResponseModel>(url);
  }

  show(id: number) {
    const url = `${this.API_URL}/hand-work/${id}`;
    return this.httpClient.get<ResponseModel>(url);
  }

  store(hand: HandWorkModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/hand-work`;
    return this.httpClient.post<ResponseModel>(url, hand)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            return throwError(new Error('Mano de obra ya existe'));
          } else {
            return throwError('error al crear mano de obra')
          }
        })
      )
  }

  update(id: number, hand: HandWorkModel): Observable<ResponseModel> {
    const url = `${this.API_URL}/hand-work/${id}`;
    return this.httpClient.put<ResponseModel>(url, hand)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            return throwError(new Error('Mano de obra ya existe'));
          } else {
            return throwError('error al editar mano de obra')
          }
        })
      )
  }

  destroy(id: number) {
    const url = `${this.API_URL}/hand-work/${id}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../interfaces/category';
import {Delivery} from '../interfaces/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  create(order: string): Observable<any> {
    return this._http.post<string>(this._backendURL.addDelivery, order, this._options());
  }

  fetchById(id: number): Observable<Delivery[]> {
    return this._http.get<Delivery[]>(this._backendURL.getDeliveryUser.replace(':id', id));
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

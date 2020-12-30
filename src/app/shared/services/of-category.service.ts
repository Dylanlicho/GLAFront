import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import {OfCategory} from '../interfaces/of-category';

@Injectable({
  providedIn: 'root'
})
export class OfCategoryService {
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

  fetch(): Observable<OfCategory[]> {
    return this._http.get<OfCategory[]>(this._backendURL.allCategories)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<OfCategory> {
    return this._http.get<OfCategory>(this._backendURL.oneUser.replace(':id', id));
  }

  create(ofCategory: OfCategory): Observable<any> {
    return this._http.post<OfCategory>(this._backendURL.addOfCategory, ofCategory, this._options());
  }

  update(id: string, user: OfCategory): Observable<any> {
    return this._http.put<OfCategory>(this._backendURL.oneUser.replace(':id', id), user, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneUser.replace(':id', id), this._options())
      .pipe(
        map(_ => id)
      );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import {Category} from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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

  fetch(): Observable<Category[]> {
    return this._http.get<Category[]>(this._backendURL.allCategories)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Category> {
    return this._http.get<Category>(this._backendURL.oneUser.replace(':id', id));
  }

  create(category: Category): Observable<any> {
    return this._http.post<Category>(this._backendURL.addUser, category, this._options());
  }

  update(id: string, user: Category): Observable<any> {
    return this._http.put<Category>(this._backendURL.oneUser.replace(':id', id), user, this._options());
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

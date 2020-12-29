import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import {Bid} from '../interfaces/bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
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

  fetch(): Observable<Bid[]> {
    return this._http.get<Bid[]>(this._backendURL.allArticles)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Bid> {
    return this._http.get<Bid>(this._backendURL.oneArticle.replace(':id', id));
  }

  create(bid: Bid): Observable<any> {
    return this._http.post<Bid>(this._backendURL.addArticle, bid, this._options());
  }

  update(id: string, bid: Bid): Observable<any> {
    return this._http.put<Bid>(this._backendURL.oneArticle.replace(':id', id), bid, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneArticle.replace(':id', id), this._options())
      .pipe(
        map(_ => id)
      );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

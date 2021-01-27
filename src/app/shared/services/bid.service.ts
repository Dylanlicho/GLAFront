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

  fetchOne(id: number): Observable<Bid> {
    return this._http.get<Bid>(this._backendURL.oneArticle.replace(':id', id));
  }

  fetchBySeller(seller: number): Observable<Bid[]> {
    console.log(seller);
    console.log(this._backendURL.allArticlesBySeller);
    return this._http.get<Bid[]>(this._backendURL.allArticlesBySeller.replace(':seller', seller));
  }

  fetchByName(name: string): Observable<Bid[]> {
    return this._http.get<Bid[]>(this._backendURL.allArticlesByName.replace(':name', name));
  }

  fetchByCategory(category: string): Observable<Bid[]> {
    return this._http.get<Bid[]>(this._backendURL.allArticlesByCategory.replace(':category', category));
  }

  create(bid: Bid): Observable<any> {
    return this._http.post<Bid>(this._backendURL.addArticle, bid, this._options());
  }

  update(id: number, bid: Bid): Observable<any> {
    return this._http.put<Bid>(this._backendURL.oneArticle.replace(':id', id), bid, this._options());
  }

  delete(id: number): Observable<number> {
    return this._http.delete(this._backendURL.deleteArticle.replace(':id', id), this._options())
      .pipe(
        map(_ => id)
      );
  }

  fetchParticipationUser(id: number): Observable<Bid[]>{
    return this._http.get<Bid[]>(this._backendURL.participationOf.replace(':id', id))
    .pipe(
      filter(_ => !!_),
      defaultIfEmpty([])
    );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

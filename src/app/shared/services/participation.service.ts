import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import {Participation} from '../interfaces/participation';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
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

  fetch(): Observable<Participation[]> {
    return this._http.get<Participation[]>(this._backendURL.allUsers)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Participation> {
    return this._http.get<Participation>(this._backendURL.oneUser.replace(':id', id));
  }

  fetchBest(idArticle: number): Observable<Participation> {
    return this._http.get<Participation>(this._backendURL.bestParticipationByIdArticle.replace(':idArticle', idArticle));
  }

  create(participation: Participation): Observable<any> {
    return this._http.post<Participation>(this._backendURL.createParticipation, participation, this._options());
  }

  update(id: string, participation: Participation): Observable<any> {
    return this._http.put<Participation>(this._backendURL.oneUser.replace(':id', id), participation, this._options());
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {defaultIfEmpty, filter} from 'rxjs/operators';
import {Promotion} from '../interfaces/promotion';

@Injectable({
  providedIn: 'root'
})

export class PromotionService{

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

  fetch(): Observable<Promotion[]> {
    return this._http.get<Promotion[]>(this._backendURL.allPromotions)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }
}

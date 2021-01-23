import {Component, Injectable, OnInit} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable()
export class JwtInterceptorComponent implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  // Intercept a request before its send to the server
  // and add authorization header with jwt token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }

    return next.handle(request);
  }

}

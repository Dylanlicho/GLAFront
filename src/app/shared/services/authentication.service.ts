import {Component, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UrlSerializer} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public token;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Return the user authenticated
  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  // Login a user and keep it in mind
  login(login: string, password: string) {
    let res = this.http.post<any>(`http://localhost:8080/auth/login`, { login, password })
      .pipe(map(user => {
        // store user and his details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));

    return res;
  }

  // Forget the user authenticated
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Return true if someone is logged
  logged(): boolean{
    return localStorage.getItem('currentUser') != null;
  }

}

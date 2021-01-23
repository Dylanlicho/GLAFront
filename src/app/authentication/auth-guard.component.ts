import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../shared/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardComponent implements CanActivate {

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authenticationService.logged();

    // If we haven't an authenticate user we redirect to the login page and return false
    /*this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;*/
  }

}

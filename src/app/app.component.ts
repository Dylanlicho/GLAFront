import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthenticationService} from "./shared/services/authentication.service";
import {User} from "./shared/interfaces/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  title = 'GLAFront';

  constructor(private _cookieService: CookieService, private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get logged(): boolean {
    //return this._cookieService.check("login") && this.currentUser != null;
    return this.currentUser != null;
  }

  disconnect(): void {
    this.currentUser = null;
    this.authenticationService.logout();
    //this._cookieService.delete("login");
    this._router.navigate(['/home']);
  }

}

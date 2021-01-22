import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly _username: string;
  currentUser: User;

  constructor(private _cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.logged)
      this._username = this.currentUser.login;
    else
      this._username = null;
  }

  get logged(): boolean {
    //return this._cookieService.check("login");
    return this.authenticationService.logged();
  }

  get username(): string {
    return this._username;
  }

  ngOnInit(): void {
  }

}

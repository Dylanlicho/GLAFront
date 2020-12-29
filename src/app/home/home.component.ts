import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly _username: string;

  constructor(private _cookieService: CookieService) {
    if (this.logged)
      this._username = JSON.parse(this._cookieService.get("login"))['login'];
    else
      this._username = null;
  }

  get logged(): boolean {
    return this._cookieService.check("login");
  }

  get username(): string {
    return this._username;
  }

  ngOnInit(): void {
  }

}

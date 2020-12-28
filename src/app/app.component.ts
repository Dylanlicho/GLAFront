import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'GLAFront';

  constructor(private _cookieService: CookieService, private _router: Router) {
  }

  get logged(): boolean {
    return this._cookieService.check("login");
  }

  disconnect(): void {
    this._cookieService.delete("login");
    this._router.navigate(['/home']);
  }

}

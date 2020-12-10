import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GLAFront';

  private _conn: boolean;

  constructor() {
    this._conn = false;
  }

  get conn(): boolean {
    return this._conn;
  }

}

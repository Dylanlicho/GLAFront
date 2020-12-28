import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../shared/interfaces/login';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;

  private _form: FormGroup;

  constructor(private _router: Router, private _cookieService: CookieService) {
    this._form = this._buildForm();
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
  }

  cookieTest(login: string): void {
    this._cookieService.set("login", login, 300);
    this._router.navigate(['/home']);
  }

  submit(login: Login): void {
    //PARAMETER
    //login :
    // login: string
    // password: string

    //BEHAVIOR
    //manage login here I guess, thought about finding if (login, password) exists in DB and if so, set the cookie
    // () => _router.navigate(['/home']);
    // (err) => console.log(err);

    //COOKIE
    //this._cookieService.set("login", login.login, 300)
    // -> sets a login cookie for 5 minutes containing the name of the connected user
  }

  cancel(): void {
    this._router.navigate(['/home']);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
    });
  }

}

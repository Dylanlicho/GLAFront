import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../shared/interfaces/login';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/interfaces/user';
import {HttpErrorResponse} from '@angular/common/http';
import {first} from "rxjs/operators";
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;

  private _form: FormGroup;
  error = '';

  constructor(private _router: Router, private _cookieService: CookieService, private _userService: UserService, private authenticationService: AuthenticationService) {
    this._form = this._buildForm();

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this._router.navigate(['/']);
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
  }

  cookieTest(login: string): void {
    if (this._cookieService.check("login"))
      this._cookieService.delete("login");

    this._userService.fetchOneByLogin(login)
      .subscribe(
        (user: User) => {
          if (!!user) {
            this._cookieService.set("login", JSON.stringify(user), 300);
            this._router.navigate(['/home']);
          }
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
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

    // stop here if form is invalid
    if (this._form.invalid) {
      return;
    }

    this.authenticationService.login(this._form.controls.login.value, this._form.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(['/home']);
        },
        error => {
          this.error = error;
        });
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

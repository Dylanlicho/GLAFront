import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/user';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public hide: boolean = true;

  private readonly _form: FormGroup;

  constructor(private _router: Router, private _userService: UserService) {
    this._form = this._buildForm();
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
  }

  submit(user: User): void {
    this._userService.create(user)
      .subscribe(
        () => {
          this._router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  cancel(): void {
    this._router.navigate(['/home']);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      address: new FormControl('', Validators.minLength(2)),
      login: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
    });
  }

}

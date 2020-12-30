import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Bid} from '../shared/interfaces/bid';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BidService} from '../shared/services/bid.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.css']
})
export class CreateBidComponent implements OnInit {

  private readonly _form: FormGroup;

  constructor(private _router: Router, private _bidService: BidService, private _cookieService: CookieService) {
    this._form = this._buildForm();
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
  }

  submit(bid: Bid): void {
    //don't forget to add the id of the seller (user) & price = startPrice
    bid['seller'] = JSON.parse(this._cookieService.get("login"))['id'];
    bid['price'] = bid['startPrice'];
    this._bidService.create(bid)
      .subscribe(
        () => {
          this._router.navigate(['/auction']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  cancel(): void {
    this._router.navigate(['/auction']);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      startPrice: new FormControl(.0, Validators.min(.0)),
      startDate: new FormControl(new Date(), Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      endDate: new FormControl(new Date(), Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      weight: new FormControl(.0, Validators.compose([
        Validators.required, Validators.min(.0)
      ])),
    });
  }

}

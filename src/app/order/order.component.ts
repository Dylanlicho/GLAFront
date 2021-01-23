import { Component, OnInit } from '@angular/core';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {BidService} from '../shared/services/bid.service';
import {Bid} from '../shared/interfaces/bid';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from '../shared/interfaces/user';
import {Order} from '../shared/interfaces/order';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {DeliveryService} from '../shared/services/delivery.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private _bid: Bid;
  private _user: User;
  private readonly _form: FormGroup;

  constructor(private _deliveryService: DeliveryService, private _router: Router, private _route: ActivatedRoute, private _bidService: BidService, private _authService: AuthenticationService) {
    this._authService.currentUser.subscribe(usr => this._user = usr);
    this._form = this._buildForm();
    this._bid = {} as Bid;
  }

  get bid(): Bid {
    return this._bid;
  }

  get form(): FormGroup {
    return this._form;
  }

  cancel() {
    this._router.navigate(['/home']);
  }

  submit(order: Order) {
    order['buyer'] = this._user.id + '';
    order['date'] = formatDate(new Date(), 'y-MM-dd h:mm:ss', 'en');

    //debug
    console.log('buyer: ' + order['buyer'] + ' | date: ' + order['date'] + ' | address: ' + order['address']);

    //objet à envoyer : JSON.stringify(order);
    this._deliveryService.create(JSON.stringify(order)).subscribe(
      () => this._router.navigate(['/home']),
      (err: HttpErrorResponse) => console.log(err)
    );
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._bidService.fetchOne(params.id)),
      )
    )
      .subscribe(
        (bid: any) => {
          this._bid = bid;
        },
      );
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      address: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }

}

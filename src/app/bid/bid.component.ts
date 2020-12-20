import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';
import {BidService} from '../shared/services/bid.service';
import {Bid} from '../shared/interfaces/bid';
import {User} from '../shared/interfaces/user';
import {UserService} from '../shared/services/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  private _bid: Bid;
  private _seller: User;

  constructor(private _route: ActivatedRoute, private _bidService: BidService, private _userService: UserService, private _datePipe: DatePipe) {
    this._bid = {} as Bid;
    this._seller = {} as User;
  }

  get bid(): Bid {
    return this._bid;
  }

  get seller(): User {
    return this._seller;
  }

  get isBiddable(): boolean {
    let today = this._datePipe.transform(new Date(), 'short');
    return today > this._datePipe.transform(this._bid.startDate, 'short') &&
      today < this._datePipe.transform(this._bid.endDate, 'short');
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
          this._userService.fetchOne(bid['seller'])
            .subscribe((user: any) => this._seller = user);
        },
      );
  }

}

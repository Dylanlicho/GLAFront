import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {CookieService} from 'ngx-cookie-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];

  private _bids: Bid[];

  constructor(private _bidService: BidService, private _cookieService: CookieService, private _datePipe: DatePipe) {
    this._bids = [];
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return this._datePipe.transform(date, 'short') < this._datePipe.transform(today, 'short');
  }

  logged(): boolean {
    return this._cookieService.check("login");
  }

  ngOnInit(): void {
    this._bidService
      .fetch().subscribe((bids: Bid[]) => this._bids = bids);
  }

  get bids(): Bid[] {
    return this._bids;
  }

}

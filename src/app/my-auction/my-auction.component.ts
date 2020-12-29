import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];

  private _myBids: Bid[];

  constructor(private _bidService: BidService, private _cookieService: CookieService, private _router: Router) {
    this._myBids = [];
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < (new Date(today)).getTime();
  }

  logged(): boolean {
    return this._cookieService.check("login");
  }

  ngOnInit(): void {
    if (this.logged())
      this._bidService
        .fetchBySeller(JSON.parse(this._cookieService.get("login"))['id'])
        .subscribe((bids: Bid[]) => this._myBids = bids);
    else
      this._router.navigate(['/home']);
  }

  get myBids(): Bid[] {
    return this._myBids;
  }

}

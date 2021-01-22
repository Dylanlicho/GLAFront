import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/interfaces/user";

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];
  currentUser: User;

  private _myBids: Bid[];

  constructor(private _bidService: BidService, private _cookieService: CookieService, private _router: Router, private authenticationService: AuthenticationService) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._myBids = [];
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < (new Date(today)).getTime();
  }

  logged(): boolean {
    //return this._cookieService.check("login");
    return this.authenticationService.logged();
  }

  ngOnInit(): void {
    if (this.logged())
      this._bidService
        // .fetchBySeller(JSON.parse(this._cookieService.get("login"))['id'])
        .fetchBySeller(this.currentUser.id)
        .subscribe((bids: Bid[]) => this._myBids = bids);
    else
      this._router.navigate(['/home']);
  }

  get myBids(): Bid[] {
    return this._myBids;
  }

}

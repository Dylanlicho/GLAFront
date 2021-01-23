import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {CookieService} from 'ngx-cookie-service';
import {ParticipationService} from '../shared/services/participation.service';
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/interfaces/user";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];
  currentUser: User;

  private _bids: Bid[];

  constructor(private _participationService: ParticipationService, private _bidService: BidService, private _cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._bids = [];
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < today.getTime();
  }

  logged(): boolean {
    //return this._cookieService.check("login");
    return this.authenticationService.logged();
  }

  ngOnInit(): void {
    this._bidService
      .fetch().subscribe(
        (bids: Bid[]) => this._bids = bids
    );
  }

  get bids(): Bid[] {
    return this._bids;
  }

}

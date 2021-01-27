import { Component, OnInit } from '@angular/core';
import {User} from "../shared/interfaces/user";
import {Bid} from "../shared/interfaces/bid";
import {BidService} from "../shared/services/bid.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-search-auction',
  templateUrl: './search-auction.component.html',
  styleUrls: ['./search-auction.component.css']
})
export class SearchAuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];
  currentUser: User;

  private _myBids: Bid[];

  constructor(private _bidService: BidService, private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._myBids = [];
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < (new Date(today)).getTime();
  }

  logged(): boolean {
    return this.authenticationService.logged();
  }

  ngOnInit(): void {
    if (this.logged())
      this._bidService
        .fetchBySeller(this.currentUser.id)
        .subscribe((bids: Bid[]) => this._myBids = bids);
    else
      this._router.navigate(['/home']);
  }

  get myBids(): Bid[] {
    return this._myBids;
  }

  searchByName(nameArticle): void {
    this._bidService
      .fetchByName(nameArticle)
      .subscribe((bids: Bid[]) => this._myBids = bids);
  }

}

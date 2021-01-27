import { Component, OnInit } from '@angular/core';
import {User} from "../shared/interfaces/user";
import {Bid} from "../shared/interfaces/bid";
import {BidService} from "../shared/services/bid.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Participation} from "../shared/interfaces/participation";
import {merge} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";
import {ParticipationService} from "../shared/services/participation.service";

@Component({
  selector: 'app-search-auction',
  templateUrl: './search-auction.component.html',
  styleUrls: ['./search-auction.component.css']
})
export class SearchAuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];
  currentUser: User;

  private _myBids: Bid[];
  private _bestOffer: Participation;

  constructor(private _participationService: ParticipationService, private _bidService: BidService, private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._myBids = [] as Bid[];
    this._bestOffer = {} as Participation;
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < (new Date(today)).getTime();
  }

  logged(): boolean {
    return this.authenticationService.logged();
  }

  ngOnInit(): void {
    if (!this.logged()) {
      this._router.navigate(['/home']);
    }
  }

  get myBids(): Bid[] {
    return this._myBids;
  }

  get bestOffer(): Participation {
    return this._bestOffer;
  }


  searchByName(nameArticle): void {
    this._bidService
      .fetchByName(nameArticle)
      .subscribe((bids: Bid[]) => {
          this._myBids = bids;
          if (this._myBids == null){
            return;
          }
          this._participationService.fetchBest(this._myBids[0]['id']).subscribe((participation: Participation) => {
            if (participation != undefined) {
              this._bestOffer = participation;
            } else {
              this._bestOffer['price'] = this._myBids[0]['startPrice'];
              this._bestOffer['idUser'] = -1;
            }
          }); }
      );
  }

}

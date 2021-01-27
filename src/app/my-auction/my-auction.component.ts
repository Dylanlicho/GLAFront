import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/interfaces/user";
import {Participation} from "../shared/interfaces/participation";
import {ParticipationService} from "../shared/services/participation.service";

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info'];
  currentUser: User;

  private _myBids: Bid[];
  private _bestOffer: Participation[];

  constructor(private _participationService: ParticipationService, private _bidService: BidService, private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._myBids = [] as Bid[];
    this._bestOffer = [] as Participation[];
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
        .subscribe((bids: Bid[]) => {
          this._myBids = bids;
          console.log(this._myBids);
          for (let i = 0; i < this._myBids.length; i++) {
            this._participationService.fetchBest(this._myBids[i]['id']).subscribe((participation: Participation) => {
              if (participation != undefined) {
                this._bestOffer[i] = participation;
                console.log(this._bestOffer[i]);
              } else {
                this._bestOffer[i]['price'] = this._myBids[i]['startPrice'];
                this._bestOffer[i]['idUser'] = -1;

              }
            });
          }
        });
    else
      this._router.navigate(['/home']);
  }

  get myBids(): Bid[] {
    return this._myBids;
  }

  get bestOffer(): Participation[] {
    return this._bestOffer;
  }

}

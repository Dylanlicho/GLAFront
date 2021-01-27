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
          console.log(bids);
          for (let i = 0; i < bids.length; i++) {
            this._participationService.fetchBest(bids[i]['id'])
              .subscribe((participation: Participation) => {
                if (participation != undefined) {
                  this._bestOffer[i] = participation;
                }else{
                  let defaut = {} as Participation;
                  this._bestOffer[i] = defaut;
                  this._bestOffer[i]['price'] = this._myBids[i]['startPrice'];
                  this._bestOffer[i]['idUser'] = -1;
                }
                console.log(this._bestOffer[i]);
                console.log(i);
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

  fillParticipation(): void{
    for (let i = 0; i < this._myBids.length; i++) {
      this._participationService.fetchBest(this._myBids[i]['id'])
        .subscribe((participation: Participation) => {
        if (participation != undefined) {
          this._bestOffer[i] = participation;
        } else {
          this._bestOffer[i]['price'] = this._myBids[i]['startPrice'];
          this._bestOffer[i]['idUser'] = -1;
        }
        console.log(this._bestOffer["price"]);
      });
    }
  }

  private _addBestBidder() {
    for(let i = 0; i != this._myBids.length; i++) {
      this._participationService.fetchBest(this._myBids[i].id)
        .subscribe((tmp: Participation) => {
          if (tmp != undefined) {
            this._bestOffer[i] = tmp;
          } else {
            this._bestOffer[i]['price'] = this._myBids[i]['startPrice'];
            this._bestOffer[i]['idUser'] = -1;
          }
        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Promotion} from '../shared/interfaces/promotion';
import {PromotionService} from '../shared/services/promotion.service';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {User} from '../shared/interfaces/user';
import {AuthenticationService} from '../shared/services/authentication.service';
import {ParticipationService} from '../shared/services/participation.service';
import {Participation} from '../shared/interfaces/participation';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {

  private _bids: Bid[];
  private _displayedColumns: string[] = ['nom', 'description', 'endDate', 'bestPrice', 'winner', 'info'];
  private _currentUser: User;

  constructor(private readonly _bidService: BidService, private readonly _authenticationService: AuthenticationService,
              private readonly _participationService: ParticipationService) {
    this._authenticationService.currentUser.subscribe(x => this._currentUser = x);
  }

  ngOnInit(): void {
    this._bidService.fetchParticipationUser(this._currentUser.id).subscribe(
      (_: Bid[]) => {this._bids = _; this._addBestBidder(); return; },
    );
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < today.getTime();
  }

  get bids(): Bid[]{
    return this._bids;
  }

  get displayedColumns(): string[]{
    return this._displayedColumns;
  }

  private _addBestBidder() {
    for(let i = 0; i != this._bids.length; i++)
      this._participationService.fetchBest(this._bids[i].id)
        .subscribe((tmp: Participation) => {
          this._bids[i].won = false;
          this._bids[i].best = tmp.price;
            if (tmp.idUser == this._currentUser.id)
              this._bids[i].won = true;
          }
        );
  }

  logged(): boolean {
    return this._authenticationService.logged();
  }
}

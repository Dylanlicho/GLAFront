import { Component, OnInit } from '@angular/core';
import {Promotion} from '../shared/interfaces/promotion';
import {PromotionService} from '../shared/services/promotion.service';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';
import {User} from '../shared/interfaces/user';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {

  private _bids: Bid[];
  private _displayedColumns: string[] = ['nom', 'description', 'info'];
  private _currentUser: User;

  constructor(private readonly _bidService: BidService, private readonly _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(x => this._currentUser = x);
  }

  ngOnInit(): void {
    this._bidService.fetchParticipationUser(this._currentUser.id).subscribe(
      (_: Bid[]) => this._bids = _,
    );
  }

  get bids(): Bid[]{
    return this._bids;
  }

  get displayedColumns(): string[]{
    return this._displayedColumns;
  }
}

import { Component, OnInit } from '@angular/core';
import {Bid} from '../shared/interfaces/bid';
import {BidService} from '../shared/services/bid.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  private _bids: Bid[];
  displayedColumns: string[] = ['nom', 'prix', 'dateDepart', 'dateFin', 'info', 'modifier', 'supprimer'];

  constructor(private _bidService: BidService) {
    this._bids = [];
  }

  ngOnInit(): void {
    this._bidService
      .fetch().subscribe((bids: Bid[]) => this._bids = bids);
  }

  get bids(): Bid[] {
    return this._bids;
  }

}

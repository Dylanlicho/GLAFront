import { Component, OnInit } from '@angular/core';
import {PromotionService} from '../shared/services/promotion.service';
import {Promotion} from '../shared/interfaces/promotion';
import {Participation} from '../shared/interfaces/participation';
import {ParticipationService} from '../shared/services/participation.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  private _promotions: Promotion[];
  private _displayedColumns: string[] = ['nom', 'reduction', 'description', 'endDate', 'bestPrice', 'info'];
  constructor(private readonly _promotionService: PromotionService,
              private readonly _participationService: ParticipationService) { }

  ngOnInit(): void {
    this._promotionService.fetch().subscribe(
      (_: Promotion[]) => {this._promotions = _; this._addBestBidder(); return; });
  }

  get promotions(): Promotion[]{
    return this._promotions;
  }

  get displayedColumns(): string[]{
    return this._displayedColumns;
  }

  private _addBestBidder() {
    for(let i = 0; i != this._promotions.length; i++) {
      this._participationService.fetchBest(this._promotions[i].article.id)
        .subscribe((tmp: Participation | null) => {
            console.log("here");
            if (tmp && tmp.price)
              this._promotions[i].best = tmp.price;
            else
              this._promotions[i].best = this._promotions[i].article.startPrice;
          }
        );
    }
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < today.getTime();
  }
}

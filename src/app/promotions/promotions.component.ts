import { Component, OnInit } from '@angular/core';
import {PromotionService} from '../shared/services/promotion.service';
import {Promotion} from '../shared/interfaces/promotion';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  private _promotions: Promotion[];
  private _displayedColumns: string[] = ['nom', 'reduction', 'description', 'info'];
  constructor(private readonly _promotionService: PromotionService) { }

  ngOnInit(): void {
    this._promotionService.fetch().subscribe(
      (_: Promotion[]) => this._promotions = _,
    );
  }

  get promotions(): Promotion[]{
    return this._promotions;
  }

  get displayedColumns(): string[]{
    return this._displayedColumns;
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';
import {BidService} from '../shared/services/bid.service';
import {Bid} from '../shared/interfaces/bid';
import {User} from '../shared/interfaces/user';
import {UserService} from '../shared/services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Participation} from '../shared/interfaces/participation';
import {ParticipationService} from '../shared/services/participation.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  private _bid: Bid;
  private _seller: User;
  private _bestOffer: Participation;

  constructor(private _participationService: ParticipationService, private _route: ActivatedRoute, private _bidService: BidService, private _userService: UserService, private _cookieService: CookieService, private _router: Router) {
    this._bid = {} as Bid;
    this._seller = {} as User;
    this._bestOffer = {} as Participation;
  }

  get bid(): Bid {
    return this._bid;
  }

  get seller(): User {
    return this._seller;
  }

  get bestOffer(): Participation {
    return this._bestOffer;
  }

  get isBiddable(): boolean {
    //checks if the bid is open and if the user is not the seller
    let today = new Date();
    return today.getTime() > (new Date(this._bid.startDate)).getTime() &&
      today.getTime() < (new Date(this._bid.endDate)).getTime() &&
      !this.isOwner;
  }

  get isOwner(): boolean {
    //returns whether the user is the seller or not
    return this._cookieService.check("login") && JSON.parse(this._cookieService.get("login"))['id'] == this._seller.id;
  }

  get isEditable(): boolean {
    //returns whether the bid is editable or not
    //a bid is editable after it is ended
    let today = new Date();
    return (new Date(this._bid.endDate)).getTime() < today.getTime();
  }

  isExpired(date: Date): boolean {
    let today = new Date();
    return (new Date(date)).getTime() < today.getTime();
  }

  delete(): void {
    this._bidService.delete(this._bid['id'])
      .subscribe(
        () => this._router.navigate(['/auction']),
        (err) => console.log(err),
      );
  }

  place_bidding(price: number): void {
    let participation = {
      idUser: JSON.parse(this._cookieService.get("login"))['id'],
      idArticle: this._bid['id'],
      price: price
    } as Participation;

    this._participationService.create(participation)
      .subscribe(
        () => this._router.navigate(['auction']),
        (err) => console.log(err)
      );
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._bidService.fetchOne(params.id)),
      )
    )
      .subscribe(
        (bid: any) => {
          this._bid = bid;
          this._userService.fetchOne(bid['seller'])
            .subscribe((user: any) => this._seller = user);
          this._participationService.fetchBest(bid['id'])
            .subscribe((participation: any) => {
              if (participation != null)
                this._bestOffer = participation;
              else
                this._bestOffer['price'] = this._bid['startPrice'];
            });
        },
      );
  }

}

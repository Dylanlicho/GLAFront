import { Component, OnInit } from '@angular/core';
import {DeliveryService} from '../shared/services/delivery.service';
import {Delivery} from '../shared/interfaces/delivery';
import {User} from '../shared/interfaces/user';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './Delivery.component.html',
  styleUrls: ['./Delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  private _deliveries: Delivery[]
  private _currentUser: User;
  private _displayedColumns: string[] = ['date', 'nomArticle', 'address', 'status'];

  constructor(private readonly _deliveryService: DeliveryService,
              private readonly _authenticationService: AuthenticationService) {

    this._authenticationService.currentUser.subscribe(x => this._currentUser = x);
  }

  ngOnInit(): void {
    this._deliveryService.fetchById(this._currentUser.id).subscribe(
      (_: Delivery[]) => this._deliveries = _,
      () => null,
      ()=> console.log(this._deliveries)
    )
  }

  get displayedColumns(): String[]{
    return this._displayedColumns;
  }

  get deliveries(): Delivery[]{
    return this._deliveries;
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuctionComponent} from './auction/auction.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {BidComponent} from './bid/bid.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CreateBidComponent} from './create-bid/create-bid.component';
import {MyAuctionComponent} from './my-auction/my-auction.component';
import {AuthGuardComponent} from './authentication/auth-guard.component';
import {OrderComponent} from './order/order.component';
import {ParticipationComponent} from './participation/participation.component';
import {SearchAuctionComponent} from "./search-auction/search-auction.component";
import {DeliveryComponent} from './livraison/delivery.component';

const routes: Routes = [
  /*{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'bid/:id', component: BidComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createBid', component: CreateBidComponent },
  { path: 'myAuction', component: MyAuctionComponent }*/

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auction', component: AuctionComponent, canActivate: [AuthGuardComponent]},
  { path: 'bid/:id', component: BidComponent, canActivate: [AuthGuardComponent]},
  { path: 'promotions', component: PromotionsComponent, canActivate: [AuthGuardComponent] },
  { path: 'createBid', component: CreateBidComponent, canActivate: [AuthGuardComponent] },
  { path: 'myAuction', component: MyAuctionComponent, canActivate: [AuthGuardComponent] },
  { path: 'participation', component: ParticipationComponent, canActivate: [AuthGuardComponent] },
  { path: 'order/:id', component: OrderComponent, canActivate: [AuthGuardComponent] },
  { path: 'search', component: SearchAuctionComponent, canActivate: [AuthGuardComponent] },
  { path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuardComponent]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

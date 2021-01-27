import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuctionComponent } from './auction/auction.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { BidComponent } from './bid/bid.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {UserService} from './shared/services/user.service';
import {BidService} from './shared/services/bid.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { CreateBidComponent } from './create-bid/create-bid.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import {ParticipationService} from './shared/services/participation.service';
import {CategoryService} from './shared/services/category.service';
import { ErrorInterceptorComponent } from './authentication/error-interceptor.component';
import { JwtInterceptorComponent } from './authentication/jwt-interceptor.component';
import { OrderComponent } from './order/order.component';
import {DeliveryService} from './shared/services/delivery.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ParticipationComponent } from './participation/participation.component';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuctionComponent,
    PromotionsComponent,
    BidComponent,
    LoginComponent,
    SignupComponent,
    CreateBidComponent,
    MyAuctionComponent,
    OrderComponent,
    ParticipationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    UserService,
    BidService,
    ParticipationService,
    CategoryService,
    DatePipe,
    CookieService,
    DeliveryService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorComponent, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorComponent, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

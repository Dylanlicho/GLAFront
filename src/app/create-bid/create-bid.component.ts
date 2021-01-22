import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Bid} from '../shared/interfaces/bid';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BidService} from '../shared/services/bid.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Category} from '../shared/interfaces/category';
import {CategoryService} from '../shared/services/category.service';
import {OfCategoryService} from '../shared/services/of-category.service';
import {OfCategory} from '../shared/interfaces/of-category';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/interfaces/user";

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.css']
})
export class CreateBidComponent implements OnInit {

  private readonly _form: FormGroup;
  private _categories: Category[];
  currentUser: User;

  constructor(private _ofCategoryService: OfCategoryService, private _categoryService: CategoryService, private _router: Router, private _bidService: BidService, private _cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._form = this._buildForm();
    this._categories = [] as Category[];
  }

  get form(): FormGroup {
    return this._form;
  }

  get categories(): Category[] {
    return this._categories;
  }

  ngOnInit(): void {
    this._categoryService.fetch()
      .subscribe(
        (categories: Category[]) => this._categories = categories,
        (err: HttpErrorResponse) => console.log(err)
      )
  }

  submit(bid: Bid): void {
    //bid['seller'] = JSON.parse(this._cookieService.get("login"))['id'];
    bid['seller'] = this.currentUser.id;
    bid['price'] = bid['startPrice'];

    this._bidService.create(bid)
      .subscribe(
        (created : Bid) => {
          let ofCategory = {
            idArticle: created['id'],
            idCategory: bid['category']
          } as OfCategory

          console.log(ofCategory['idArticle']);
          this._ofCategoryService.create(ofCategory)
            .subscribe(
              () => this._router.navigate(['/auction']),
              (err: HttpErrorResponse) => console.log(err)
            )
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  cancel(): void {
    this._router.navigate(['/auction']);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      category: new FormControl(0, Validators.required),
      startPrice: new FormControl(.0, Validators.min(.0)),
      startDate: new FormControl(new Date(), Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      endDate: new FormControl(new Date(), Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      weight: new FormControl(.0, Validators.compose([
        Validators.required, Validators.min(.0)
      ])),
    });
  }

}

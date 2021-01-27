import {Bid} from './bid';

export interface Promotion {
  article: Bid;
  reduction: number;
}

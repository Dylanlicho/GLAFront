export interface Bid {
  id: number;
  name: string;
  seller: number;
  startPrice: number;
  price?: number;
  startDate: string;
  endDate: string;
  weight: number;
}

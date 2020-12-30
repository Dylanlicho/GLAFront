export interface Bid {
  id: number;
  name: string;
  description: string;
  seller: number;
  startPrice: number;
  startDate: Date;
  endDate: Date;
  weight: number;
}

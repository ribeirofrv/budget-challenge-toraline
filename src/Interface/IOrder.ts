import { IProductUnit, IProduct } from './IProduct';

export default interface IOrder {
  userId: number;
  products: IProductUnit[];
}

export interface IOrderBudget {
  userId: number;
  products: IProduct[];
}

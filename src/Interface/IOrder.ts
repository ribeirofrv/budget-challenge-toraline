import { IProductUnit } from './IProduct';

export default interface IOrder {
  userId: number;
  products: IProductUnit[];
}
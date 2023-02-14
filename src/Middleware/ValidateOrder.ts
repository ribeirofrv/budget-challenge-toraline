import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../Interface/IProduct';

export default class ValidateOrder {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
  ) {}

  public validate() {
    const order = this.request.body;
    const userId = parseInt(this.request.params.userId, 10);
    if (!userId) {
      return this.response.status(400).json({
        message: 'userId is required',
      });
    }
    const isValid = order.products.every((product: IProduct) => 'id' in product);
    if (!isValid) {
      return this.response.status(400).json({
        message: 'products is required',
      });
    }
    this.next();
  }
}

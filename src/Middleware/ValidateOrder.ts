import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../Interface/IProduct';

export default class ValidateOrder {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
  ) {}

  public validate() {
    const { products } = this.request.body;
    const userId = parseInt(this.request.params.userId, 10);
    if (!userId) {
      return this.response.status(400).json({
        message: 'userId is required',
      });
    }
    const isValid = products.every((product: IProduct) => product.id > 0);

    if (!isValid || !Array.isArray(products)) {
      return this.response.status(400).json({
        message: 'products is required',
      });
    }
    this.next();
  }
}

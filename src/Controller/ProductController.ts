import { Request, Response, NextFunction } from 'express';
import ExternalApi from '../Service/ExternalApi';

export default class ProductsController {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
    private serviceExtApi = new ExternalApi(),
  ) {}

  public async getProducts() {
    try {
      const products = await this.serviceExtApi.getProducts();
      return this.response.status(200).json(products);
    } catch (error) {
      this.next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import Budget from '../Service/Budget';
import IOrder from '../Interface/IOrder';

export default class BudgetController {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
    private service = new Budget(),
  ) {}

  public async getBudget() {
    try {
      const order = {
        userId: parseInt(this.request.params.userId, 10),
        products: this.request.body.products,
      } as IOrder;
      const budget = await this.service.getBudget(order);
      return this.response.status(200).json(budget);
    } catch (error) {
      this.next(error);
    }
  }
}

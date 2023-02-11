import { Request, Response, NextFunction } from 'express';
import ExternalApi from '../Service/ExternalApi';

export default class UsersController {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
    private serviceExtApi = new ExternalApi(),
  ) {}

  public async getUsers() {
    try {
      const users = await this.serviceExtApi.getUsers();
      return this.response.status(200).json(users);
    } catch (error) {
      this.next(error);
    }
  }
}

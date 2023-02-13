import { Request, Response, NextFunction } from 'express';
import HttpException from './HttpException';

export default class ErrorHandler {
  constructor(
    private request: Request,
    private response: Response,
    private next: NextFunction,
  ) {}

  public handleError(error: HttpException) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    return this.response.status(status).send(message);
  }
}

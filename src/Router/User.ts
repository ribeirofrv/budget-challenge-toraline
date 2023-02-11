import { Router } from 'express';
import UsersController from '../Controller/UserController';

const usersRouter = Router();

usersRouter.get('/', (req, res, next) =>
  new UsersController(req, res, next).getUsers());

export default usersRouter;

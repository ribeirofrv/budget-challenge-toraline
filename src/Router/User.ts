import { Router } from 'express';
import UsersController from '../Controller/UserController';
import BudgetController from '../Controller/BudgetController';
import ValidateOrder from '../Middleware/ValidateOrder';

const usersRouter = Router();

usersRouter.get('/', (req, res, next) =>
  new UsersController(req, res, next).getUsers());

usersRouter.post(
  '/:userId/budget',
  (req, res, next) => new ValidateOrder(req, res, next).validate(),
  (req, res, next) => new BudgetController(req, res, next).getBudget(),
);

export default usersRouter;

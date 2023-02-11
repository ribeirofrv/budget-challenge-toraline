import { Router } from 'express';
import ProductsController from '../Controller/ProductController';

const productsRouter = Router();

productsRouter.get('/', (req, res, next) =>
  new ProductsController(req, res, next).getProducts());

export default productsRouter;

import { Request, Response, NextFunction } from 'express';
import chai from 'chai';
import sinon from 'sinon';

const { expect } = chai;

import ProductsController from '../../../src/Controller/ProductController';
import ExternalApi from '../../../src/Service/ExternalApi';
import products from '../mock/products';
import { HttpException } from '../../../src/Error/HttpException';

describe('Product - Controller', () => {
  let request: Request;
  let response: Response;
  let next: sinon.SinonStub;
  let productsController: ProductsController;
  let externalApi: ExternalApi;

  beforeEach(() => {
    request = {} as Request;
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as unknown as Response;
    next = sinon.stub();
    externalApi = new ExternalApi();
    productsController = new ProductsController(request, response, next);
  });

  afterEach(() => sinon.restore());

  describe('get all Products', function () {
    it('should return a JSON response with the products', async function () {
      sinon.stub(ExternalApi.prototype, 'getProducts').resolves(products);
      await productsController.getProducts();
      const status = response.status as sinon.SinonStub;
      const json = response.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(products)).to.be.true;
    });

    it('should call next with the error if getting products fails', async function () {
      const error = new HttpException(500,'Something went wrong');
      sinon
        .stub(ExternalApi.prototype, 'getProducts')
        .rejects(error);
      await productsController.getProducts();
      const status = response.status as sinon.SinonStub;

      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(error)).to.be.true;
    });
  });
});

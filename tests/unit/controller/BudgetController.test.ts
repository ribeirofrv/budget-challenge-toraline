import { Request, Response } from 'express';
import chai from 'chai';
import sinon from 'sinon';

import BudgetController from '../../../src/Controller/BudgetController';
import Budget from '../../../src/Service/Budget';
import HttpException from '../../../src/Error/HttpException';

const { expect } = chai;

describe('Budget - Controller', function () {
  let request: Request;
  let response: Response;
  let next: sinon.SinonStub;
  let budgetController: BudgetController;
  let budget: Budget;

  beforeEach(() => {
    request = {} as Request;
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as unknown as Response;
    next = sinon.stub();
    budget = new Budget();
    budgetController = new BudgetController(request, response, next);
  });

  afterEach(() => sinon.restore());

  describe('get budget', function () {
    it('should return a JSON response with the budget', async function () {
      request.params = { userId: '1' };
      request.body = {
        products: [
          { id: 1, quantity: 2 },
          { id: 3, quantity: 4 },
        ],
      };
      const responseJson = {
        budget: '18540.00',
      }
      sinon.stub(Budget.prototype, 'getBudget').resolves(responseJson);
      await budgetController.getBudget();
      const status = response.status as sinon.SinonStub;
      const json = response.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(responseJson)).to.be.true;
    });

    // TODO: Fix this test
    xit('should call next with the error if getting budget fails', async function () {
      request.params = { userId: '1' };
      request.body = { products: [{ id: 0, quantity: 0 }] };
      const error = new HttpException(500, 'Something went wrong');
      sinon.stub(Budget.prototype, 'getBudget').rejects(error);
      await budgetController.getBudget();
      const status = response.status as sinon.SinonStub;

      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(error)).to.be.true;
      expect(status.calledWith(500)).to.be.true;
    });
  });
});

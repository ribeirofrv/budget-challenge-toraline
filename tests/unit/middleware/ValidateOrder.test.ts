import { Request, Response } from 'express';
import chai from 'chai';
import sinon from 'sinon';

import ValidateOrder from '../../../src/Middleware/ValidateOrder';

const { expect } = chai;

describe.only('ValidateOrder', function () {
  let request: Request;
  let response: Response;
  let next: sinon.SinonStub;
  let validateOrder: ValidateOrder;

  beforeEach(() => {
    request = {} as Request;
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as unknown as Response;
    next = sinon.stub();
    validateOrder = new ValidateOrder(request, response, next);
  });

  afterEach(() => sinon.restore());

  it('should return 400 status and message "userId is required" if userId is not provided', function () {
    const request = { body: {}, params: {} } as Request;
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    const next = sinon.stub();

    const validateOrder = new ValidateOrder(request, response, next);
    validateOrder.validate();

    const status = response.status as sinon.SinonStub;
    const json = response.json as sinon.SinonStub;

    expect(status.calledWith(400)).to.be.true;
    expect(json.calledWith({ message: 'userId is required' })).to.be.true;
  });

  it('should return 400 status and message "product is required" if product id is not provided', function () {
    const request = {
      body: { product: {} },
      params: { userId: '1' },
    } as unknown as Request;
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    const next = sinon.stub();

    const validateOrder = new ValidateOrder(request, response, next);
    validateOrder.validate();

    const status = response.status as sinon.SinonStub;
    const json = response.json as sinon.SinonStub;

    expect(status.calledWith(400)).to.be.true;
    expect(json.calledWith({ message: 'product is required' })).to.be.true;
  });
});

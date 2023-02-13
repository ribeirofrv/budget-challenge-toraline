import { Request, Response } from 'express';
import chai from 'chai';
import sinon from 'sinon';

const { expect } = chai;

import UserController from '../../../src/Controller/UserController';
import ExternalApi from '../../../src/Service/ExternalApi';
import users from '../mock/users';
import HttpException from '../../../src/Error/HttpException';

describe('User - Controller', function () {
  let request: Request;
  let response: Response;
  let next: sinon.SinonStub;
  let userController: UserController;
  let externalApi: ExternalApi;

  beforeEach(() => {
    request = {} as Request;
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as unknown as Response;
    next = sinon.stub();
    externalApi = new ExternalApi();
    userController = new UserController(request, response, next);
  });

  afterEach(() => sinon.restore());

  describe('get all users', function () {
    it('should return a JSON response with the users', async function () {
      sinon.stub(ExternalApi.prototype, 'getUsers').resolves(users);
      await userController.getUsers();
      const status = response.status as sinon.SinonStub;
      const json = response.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(users)).to.be.true;
    });

    it('should call next with the error if getting users fails', async function () {
      const error = new HttpException(500,'Something went wrong');
      sinon
        .stub(ExternalApi.prototype, 'getUsers')
        .rejects(error);
      await userController.getUsers();
      const status = response.status as sinon.SinonStub;

      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(error)).to.be.true;
    });
  });
});

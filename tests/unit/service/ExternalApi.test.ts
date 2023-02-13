import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import axios from 'axios';
import sinon from 'sinon';

import ExternalApi from '../../../src/Service/ExternalApi';
import users from '../mock/users';
import products from '../mock/products';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('ExternalApi - Service', function () {
  let sandbox: sinon.SinonSandbox;
  let externalApi: ExternalApi;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    externalApi = new ExternalApi();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get all users', function () {
    it('should get users data', async function () {
      sandbox.stub(axios, 'get').resolves({ data: users });

      const usersData = await externalApi.getUsers();
      expect(users).to.deep.equal(usersData);
    });

    it('should throw error', async function () {
      sandbox.stub(axios, 'get').rejects(new Error('error'));

      await expect(externalApi.getUsers()).to.be.rejectedWith(Error);
    });
  });

  describe('get all products',function () {
    it('should get products data', async function () {
      sandbox.stub(axios, 'get').resolves({ data: products });

      const productsData = await externalApi.getProducts();
      expect(products).to.deep.equal(productsData);
    });

    it('should throw error', async function () {
      sandbox.stub(axios, 'get').rejects(new Error('error'));

      await expect(externalApi.getProducts()).to.be.rejectedWith(Error);
    });
  });
});

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import Budget from '../../../src/Service/Budget';
import users from '../mock/users';
import products from '../mock/products';
import { orderBodys, orderResults } from '../mock/orders';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Budget - Service', function () {
  let sandbox: sinon.SinonSandbox;
  let budget: Budget;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    budget = new Budget();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get tax by user', function () {
    it('should return the tax of the user', async function () {
      const user = users[0];
      const getUsersStub = sandbox.stub(budget, 'getUsers').resolves(users);
      const result = await budget.getTaxByUserId(user.id);
      expect(getUsersStub.calledOnce).to.be.true;
      expect(result).to.be.equal(user.tax / 100);
    });

    it('should throw an error if the user is not found', async function () {
      const getUsersStub = sandbox.stub(budget, 'getUsers').resolves(users);
      const result = budget.getTaxByUserId(-1);
      await expect(result).to.be.rejectedWith('User not found');
      expect(getUsersStub.calledOnce).to.be.true;
    });
  });

  describe('get product price', function () {
    it('should return the price of the product', async function () {
      const productOrder = [products[0], products[1]];
      const getProductsStub = sandbox
        .stub(budget, 'getProducts')
        .resolves(products);
      const result = await budget.getProductPrice(productOrder as any);
      expect(getProductsStub.calledOnce).to.be.true;
      expect(result).to.be.equal(9380);
    });
  });

  describe('get budget', function () {
    it('should return the budget of the order with two products', async function () {
      const { userId, products } = orderResults.ofTwoProducts;
      const getTaxByUserIdStub = sandbox
        .stub(budget, 'getTaxByUserId')
        .resolves(79); // tax of user 1
      const getFeePerProductStub = sandbox
        .stub(budget, 'getFeePerProduct')
        .resolves({ userId, products });
      const getProductPriceStub = sandbox
        .stub(budget, 'getProductPrice')
        .resolves(9380);
      const result = await budget.getBudget(orderBodys.ofTwoProducts);
      expect(getTaxByUserIdStub.calledOnce).to.be.true;
      expect(getFeePerProductStub.calledOnce).to.be.true;
      expect(getProductPriceStub.calledOnce).to.be.true;
      expect(result).to.have.property('userId');
      expect(result).to.have.property('products');
      expect(result).to.have.property('finalPrice');
      expect(result).to.be.equals(orderResults.ofTwoProducts);
    });

    it('should return the budget of the order with one product', async function () {
      const { userId, products } = orderResults.ofOneProdcut;

      const getTaxByUserIdStub = sandbox
        .stub(budget, 'getTaxByUserId')
        .resolves(42); // tax of user 55
      const getFeePerProductStub = sandbox
        .stub(budget, 'getFeePerProduct')
        .resolves({ userId, products });
      const getProductPriceStub = sandbox
        .stub(budget, 'getProductPrice')
        .resolves(15072);

      const result = await budget.getBudget(orderBodys.ofOneProdcut);
      expect(getTaxByUserIdStub.calledOnce).to.be.true;
      expect(getProductPriceStub.calledOnce).to.be.true;
      expect(result).to.have.property('userId');
      expect(result).to.have.property('products');
      expect(result).to.have.property('finalPrice');
      expect(result).to.be.equals(orderResults.ofOneProdcut);
    });

    it('should return an error if the order has no products', async function () {
      const getTaxByUserIdStub = sandbox
        .stub(budget, 'getTaxByUserId')
        .resolves(145); // tax of user 78
      const getFeePerProductStub = sandbox
        .stub(budget, 'getFeePerProduct')
        .resolves({ userId: 78, products: [] });
      const getProductPriceStub = sandbox
        .stub(budget, 'getProductPrice')
        .resolves(0.0);
      
      expect(budget.getBudget(orderBodys.ofNoProducts)).to.be.rejectedWith(
        'Unable to get quote, something went'
      );
    });
  });
});

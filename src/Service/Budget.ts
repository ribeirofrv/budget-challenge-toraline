import IOrder from '../Interface/IOrder';
import IUser from '../Interface/IUser';
import { IProduct } from '../Interface/IProduct';
import ExternalApi from './ExternalApi';
import HttpException from '../Error/HttpException';

export default class Budget extends ExternalApi {
  async getBudget(order: IOrder) {
    const { userId, products } = order;
    const tax = this.getTaxByUserId(userId);
    const productPrice = this.getProductPrice(products);
    const budget = await Promise.all([tax, productPrice]);
    return budget[1] * (1 + budget[0]);
  }

  async getTaxByUserId(userId: number) {
    const getUsers = await this.getUsers();
    const findUser = getUsers.find((user: IUser) => user.id === userId);
    if (!findUser) throw new HttpException(404, 'User not found');
    const userTaxDecimal = findUser.tax / 100;
    return userTaxDecimal;
  }

  async getProductPrice(products: IProduct[]) {
    const getProducts = await this.getProducts();
    const productPrice = products.reduce((acc, curr) => {
      const currProduct = getProducts.find((product: IProduct) => product.id === curr.id);
      return acc + currProduct.price;
    }, 0);
    return productPrice;
  }
}

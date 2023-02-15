import { IOrderBudget } from '../Interface/IOrder';
import IUser from '../Interface/IUser';
import { IProduct } from '../Interface/IProduct';
import ExternalApi from './ExternalApi';
import HttpException from '../Error/HttpException';

export default class Budget extends ExternalApi {
  async getBudget(order: IOrderBudget) {
    const { userId, products } = order;
    const tax = this.getTaxByUserId(userId);
    const feePerProduct = this.getFeePerProduct(order);
    const totalPrice = this.getProductPrice(products);
    const budget = await Promise.all([tax, totalPrice, feePerProduct]);
    
    if (!products || !products.length) {
      throw new HttpException(400, 'Unable to get quote, something went');
    }
    const total = {
      ...budget[2], // userId, products
      finalPrice: parseFloat((budget[1] * (1 + budget[0] / 100)).toFixed(2)), // total price
    };
    return total;
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
      const currProduct = getProducts.find(
        (product: IProduct) => product.id === curr.id,
      );
      return acc + currProduct.price;
    }, 0);
    return productPrice;
  }

  async getFeePerProduct(order: IOrderBudget) {
    const tax = await this.getTaxByUserId(order.userId);
    const allProducts = await this.getProducts();
    const products = order.products.map((product) => {
      const findProduct = allProducts.find(
        (p: IProduct) => p.id === product.id,
      );
      const total = (findProduct.price * (1 + tax)).toFixed(2);
      return {
        name: findProduct.name,
        price: findProduct.price,
        tax: `${tax * 100}%`,
        total: parseFloat(total),
      };
    });
    return { userId: order.userId, products };
  }
}

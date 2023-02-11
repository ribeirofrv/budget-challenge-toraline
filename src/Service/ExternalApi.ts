import axios from 'axios';

export default class ExternalApi {
  private _baseUrl = 'https://mockend.com/juunegreiros/BE-test-api';

  async getUsers() {
    try {
      const response = await axios.get(`${this._baseUrl}/users`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const response = await axios.get(`${this._baseUrl}/products`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

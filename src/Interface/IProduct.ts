export interface IProduct {
  id: number;
  name?: string;
  price?: number;
}

export interface IProductUnit extends IProduct{
  quantity: number;
}
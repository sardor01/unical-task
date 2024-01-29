import type { ApiPagination } from './types';
import { httpClient } from './index';

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
  slug?: string;
}

export class CartApi {
  static getUserCart(userId: number) {
    return httpClient.get<{ carts: Cart[] } & ApiPagination>(`/carts/user/${userId}`);
  }
}

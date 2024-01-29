import type { ApiPagination } from './types';
import { httpClient } from './index';

export interface LocalCartItem {
  id: number;
  quantity: number;
}

export class LocalCartManager {
  private static storageKey = 'cart';

  static getLocalCart(): LocalCartItem[] {
    const cart = localStorage.getItem(this.storageKey);

    if (!cart) {
      return [];
    }

    try {
      return JSON.parse(cart);
    } catch (error) {
      return [];
    }
  }

  static setLocalCart(cart: LocalCartItem | LocalCartItem[], mergeQty = true) {
    const items = this.getLocalCart();

    const handleCartItem = (obj: LocalCartItem) => {
      const itemIndex = items.findIndex((i) => i.id === obj.id);
      if (itemIndex !== -1 && mergeQty) {
        if (obj.quantity === 0) {
          items.splice(itemIndex, 1);
        } else {
          items[itemIndex].quantity = obj.quantity;
        }
      } else if (itemIndex === -1) {
        items.push(obj);
      }
    };

    if (Array.isArray(cart)) {
      cart.forEach((cartItem) => handleCartItem(cartItem));
    } else {
      handleCartItem(cart);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  static removeLocalCart() {
    localStorage.removeItem(this.storageKey);
  }
}

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

  static updateCart(id: number, products: LocalCartItem[]) {
    return httpClient.put<Cart>(`/carts/${id}`, { merge: true, products });
  }
}

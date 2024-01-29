import { CartApi, LocalCartManager } from '~/api/cart';
import type { Cart, LocalCartItem } from '~/api/cart';
import { authState } from '~/stores/auth';
import { toKebabCase } from '~/utils';

interface CartState {
  getLoading: boolean;
  updateLoading: boolean;
  cart: Cart | null;
  cartLength: number;
}

export const cartState = reactive<CartState>({
  getLoading: false,
  updateLoading: false,
  cart: null,
  cartLength: 0,
});

const setValues = (item: Cart) => {
  cartState.cart = item;
  cartState.cart.products = cartState.cart.products.map((i) => ({
    ...i,
    slug: `${toKebabCase(i.title.replace(/[^a-zA-Z0-9- ]/g, '').trim())}-${i.id}`,
  }));
  LocalCartManager.setLocalCart(
    cartState.cart.products.map(({ id, quantity }) => ({ id, quantity })),
    false,
  );
  cartState.cartLength = LocalCartManager.getLocalCart().length;
};

export async function fetchUserCart() {
  const currentUserId = authState.currentUser?.id;
  if (!currentUserId) {
    return;
  }

  cartState.getLoading = true;
  try {
    const res = await CartApi.getUserCart(currentUserId);
    if (res.status === 200) {
      setValues(res.data.carts[0]);

      const products = res.data.carts[0].products;
      const diff = LocalCartManager.getLocalCart().filter((localItem) => {
        const productIndex = products.findIndex((i) => i.id === localItem.id);
        if (productIndex === -1) {
          return true;
        }
        return products[productIndex].quantity !== localItem.quantity;
      });

      if (diff.length) {
        updateCart(res.data.carts[0].id, diff);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    cartState.getLoading = false;
  }
}

export async function updateCart(id: number, products: LocalCartItem[]) {
  cartState.updateLoading = true;
  try {
    const res = await CartApi.updateCart(id, products);
    if (res.status === 200) {
      setValues(res.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    cartState.updateLoading = false;
  }
}

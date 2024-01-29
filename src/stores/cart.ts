import { type Cart, CartApi } from '~/api/cart';
import { authState } from '~/stores/auth';
import { toKebabCase } from '~/utils';

interface CartState {
  isLoading: boolean;
  cart: Cart | null;
}

export const cartState = reactive<CartState>({
  isLoading: false,
  cart: null,
});

export const fetchUserCart = async () => {
  const currentUserId = authState.currentUser?.id;
  if (!currentUserId) {
    return;
  }

  cartState.isLoading = true;
  try {
    const res = await CartApi.getUserCart(currentUserId);
    if (res.status === 200) {
      cartState.cart = res.data.carts[0];
      cartState.cart.products = cartState.cart.products.map((i) => ({
        ...i,
        slug: `${toKebabCase(i.title.replace(/[^a-zA-Z0-9- ]/g, '').trim())}-${i.id}`,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    cartState.isLoading = false;
  }
};

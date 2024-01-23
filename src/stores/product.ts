import { ProductApi } from '~/api/product';
import type { Pagination } from '~/api/types';
import type { Product, ProductListParams } from '~/api/product';

interface ProductState {
  isLoading: boolean;
  products: Product[];
  pagination: Pagination;
  product: Product | null;
  categories: string[];
}

export const productState = reactive<ProductState>({
  isLoading: false,
  products: [],
  pagination: {
    total: 0,
    skip: 0,
    limit: 0,
  },
  product: null,
  categories: [],
});

export const fetchProducts = async (params?: ProductListParams) => {
  productState.isLoading = true;
  try {
    const res = await ProductApi.getProducts(params);
    if (res.status === 200) {
      productState.products = res.data.products;
      productState.pagination.total = res.data.total;
      productState.pagination.skip = res.data.skip;
      productState.pagination.limit = res.data.limit;
    }
  } catch (error) {
    console.error(error);
  } finally {
    productState.isLoading = false;
  }
};

export const fetchProduct = async (id: number) => {
  productState.isLoading = true;
  try {
    const res = await ProductApi.getProduct(id);
    if (res.status === 200) {
      productState.product = res.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    productState.isLoading = false;
  }
};

export const fetchProductCategories = async () => {
  productState.isLoading = true;
  try {
    const res = await ProductApi.getProductCategories();
    if (res.status === 200) {
      productState.categories = res.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    productState.isLoading = false;
  }
};

import { ProductApi } from '~/api/product';
import type { ClientPagination } from '~/api/types';
import type { Product, ProductListParams } from '~/api/product';
import { toKebabCase } from '~/utils';

interface ProductState {
  isLoading: boolean;
  products: Product[];
  pagination: ClientPagination;
  product: Product | null;
  categories: string[];
}

export const productState = reactive<ProductState>({
  isLoading: false,
  products: [],
  pagination: {
    currentPage: 1,
    pageCount: 1,
    perPage: 10,
  },
  product: null,
  categories: [],
});

export const fetchProducts = async (params?: ProductListParams) => {
  productState.isLoading = true;
  try {
    const res = await ProductApi.getProducts(params);
    if (res.status === 200) {
      productState.products = res.data.products.map((i) => ({
        ...i,
        slug: `${toKebabCase(i.title.replace(/[^a-zA-Z0-9- ]/g, '').trim())}-${i.id}`,
      }));
      productState.pagination.currentPage = Math.ceil(res.data.skip / res.data.limit) + 1;
      productState.pagination.pageCount = Math.ceil(res.data.total / res.data.limit);
      productState.pagination.perPage = res.data.limit;
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
      productState.product.slug = `${toKebabCase(res.data.title.replace(/[^a-zA-Z0-9- ]/g, '').trim())}-${res.data.id}`;
    }
  } catch (error) {
    console.error(error);
  } finally {
    productState.isLoading = false;
  }
};

export const fetchProductCategories = async () => {
  try {
    const res = await ProductApi.getProductCategories();
    if (res.status === 200) {
      productState.categories = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetPagination = () => {
  productState.pagination.currentPage = 1;
  productState.pagination.pageCount = 1;
  productState.pagination.perPage = 10;
};

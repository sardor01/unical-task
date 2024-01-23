import type { Pagination } from './types';
import { httpClient } from './index';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListParams {
  limit?: number;
  skip?: number;
  category?: string;
}

export class ProductApi {
  static getProducts(params?: ProductListParams) {
    let url = '/products';
    if (params?.category) {
      url = `/products/categories/${params.category}`;
    }
    return httpClient.get<{ products: Product[] } & Pagination>(url, { params });
  }

  static getProduct(id: number) {
    return httpClient.get<Product>(`/products/${id}`);
  }

  static getProductCategories() {
    return httpClient.get<string[]>('/products/categories');
  }
}

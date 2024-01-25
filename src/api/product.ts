import type { ApiPagination } from './types';
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
  slug: string;
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
      url = `/products/category/${params.category}`;
      delete params.category;
    }
    return httpClient.get<{ products: Product[] } & ApiPagination>(url, { params });
  }

  static getProduct(id: number) {
    return httpClient.get<Product>(`/products/${id}`);
  }

  static getProductCategories() {
    return httpClient.get<string[]>('/products/categories');
  }
}

export interface ApiPagination {
  total: number;
  skip: number;
  limit: number;
}

export interface ClientPagination {
  currentPage: number;
  pageCount: number;
  perPage: number;
}

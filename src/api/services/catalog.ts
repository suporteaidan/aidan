import { apiRequest } from '../client';
import type { Product, Paginated } from '../contracts';
import { apiRoutes } from '../routes';

export const catalogApi = {
  search(query: string): Promise<Paginated<Product>> {
    return apiRequest<Paginated<Product>>(`${apiRoutes.products}?q=${encodeURIComponent(query)}`);
  },
};

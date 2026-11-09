import { apiRequest } from '../client';
import type { Paginated, Review } from '../contracts';
import { apiRoutes } from '../routes';

export const communityApi = {
  search(query: string): Promise<Paginated<Review>> {
    return apiRequest<Paginated<Review>>(`${apiRoutes.reviews}?q=${encodeURIComponent(query)}`);
  },
};

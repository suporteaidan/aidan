import { apiRequest } from '../client';
import type { Order } from '../contracts';
import { apiRoutes } from '../routes';

export const ordersApi = {
  list(): Promise<Order[]> {
    return apiRequest<Order[]>(apiRoutes.orders);
  },
};

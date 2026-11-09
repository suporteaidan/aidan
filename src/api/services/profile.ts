import { apiRequest } from '../client';
import type { Address, User } from '../contracts';
import { apiRoutes } from '../routes';

export const profileApi = {
  get(): Promise<User> {
    return apiRequest<User>(apiRoutes.me);
  },
  addresses(): Promise<Address[]> {
    return apiRequest<Address[]>(apiRoutes.addresses);
  },
};

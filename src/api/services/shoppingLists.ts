import { apiRequest } from '../client';
import type { ShoppingList } from '../contracts';
import { apiRoutes } from '../routes';

export const shoppingListsApi = {
  list(): Promise<ShoppingList[]> {
    return apiRequest<ShoppingList[]>(apiRoutes.shoppingLists);
  },
  detail(id: string): Promise<ShoppingList> {
    return apiRequest<ShoppingList>(`${apiRoutes.shoppingLists}/${encodeURIComponent(id)}`);
  },
  toggleItem(listId: string, itemId: string, checked: boolean): Promise<void> {
    return apiRequest<void>(`${apiRoutes.shoppingLists}/${encodeURIComponent(listId)}/items/${encodeURIComponent(itemId)}`, {
      method: 'PATCH', body: { checked },
    });
  },
};

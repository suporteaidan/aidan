/**
 * Contratos PROVISÓRIOS para orientar frontend e backend.
 * NÃO são uma descrição verificada do repositório Backend-Aidan.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  phone?: string | null;
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string; user: User };
export type RegisterRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
};
export type VerifyCodeRequest = { code: string; email: string };

export type Product = { id: string; name: string; unit?: string; price?: number };
export type ShoppingList = { id: string; name: string; items: ShoppingListItem[] };
export type ShoppingListItem = { id: string; productId: string; quantity: number; checked: boolean };
export type Order = { id: string; status: string; total: number; createdAt: string };
export type Review = { id: string; productId: string; rating: number; text: string; author: User };
export type Address = { id: string; street: string; number: string; city: string; state: string };

export type Paginated<T> = { data: T[]; page: number; total: number };

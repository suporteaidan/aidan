/**
 * Contratos do Backend-Aidan verificados em 2026-11-09 (branch main).
 * Fonte: app/schemas/auth.py, user.py, profile.py, nfe_import.py.
 * Modelos ainda não expostos por rotas ficam explicitamente PROVISÓRIOS.
 */
export type LoginRequest = { email: string; password: string };
export type TokenResponse = { access_token: string; token_type: string };
export type RegisterRequest = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  address?: string | null;
  phone?: string | null;
};
export type ProfileRead = {
  id: number;
  type: 'free' | 'premium';
  photo?: string | null;
  created_at: string;
  updated_at: string;
};
export type User = {
  id?: number | null;
  name: string;
  cpf: string;
  email: string;
  profile?: ProfileRead | null;
  address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};
export type NfeImportRequest = { qr_code_url: string };
export type NfeImportResponse = {
  id: number;
  nfe_key: string;
  nfe_date: string;
  market_id: number;
  user_id: number | null;
};

/** Propostas futuras: backend atual ainda NÃO expõe esses endpoints. */
export type VerifyCodeRequest = { code: string; email: string };
export type Product = { id: string; name: string; unit?: string; price?: number };
export type ShoppingList = { id: string; name: string; items: ShoppingListItem[] };
export type ShoppingListItem = { id: string; productId: string; quantity: number; checked: boolean };
export type Order = { id: string; status: string; total: number; createdAt: string };
export type Review = { id: string; productId: string; rating: number; text: string; author: User };
export type Address = { id: string; street: string; number: string; city: string; state: string };
export type Paginated<T> = { data: T[]; page: number; total: number };

/** Rotas existentes conferidas em Backend-Aidan (main, 2026-11-09). */
export const apiRoutes = {
  health: '/health',
  login: '/api/v1/auth/login',
  register: '/api/v1/users',
  importNfe: '/api/v1/nfes/import',
} as const;

/** Rotas ainda NÃO implementadas no backend, somente sugestões para o roadmap. */
export const proposedApiRoutes = {
  verifyCode: '/api/v1/auth/verify-code',
  me: '/api/v1/users/me',
  products: '/api/v1/products',
  shoppingLists: '/api/v1/shopping-lists',
  orders: '/api/v1/orders',
  reviews: '/api/v1/reviews',
  addresses: '/api/v1/addresses',
} as const;

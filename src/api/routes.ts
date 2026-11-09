/**
 * Rascunho de rotas; validar e modificar após inspeção do Backend-Aidan.
 * Em especial, /auth/* e /products NÃO foram confirmados no servidor.
 */
export const apiRoutes = {
  login: '/auth/login',
  register: '/auth/register',
  verifyCode: '/auth/verify-code',
  me: '/users/me',
  products: '/products',
  shoppingLists: '/shopping-lists',
  orders: '/orders',
  reviews: '/reviews',
  addresses: '/addresses',
} as const;

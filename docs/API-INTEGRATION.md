# Integração de API — contrato inicial (em aberto)

Backend informado: https://github.com/suporteaidan/Backend-Aidan

**Estado:** a estrutura deste backend ainda não pôde ser verificada. Os caminhos em
`src/api/routes.ts` e tipos em `src/api/contracts.ts` são rascunhos, NÃO endpoints existentes confirmados.

## Camada HTTP preparada

- `src/config/env.ts`: URL, timeout e alternância de mocks.
- `src/api/client.ts`: `fetch`, JSON, Bearer token, timeout, erro de rede e HTTP.
- `src/api/errors.ts`: `ApiError` para tratar erros nas telas.
- `src/auth/tokenStore.ts`: token somente em memória **temporariamente**.
- `src/api/services/`: auth, catálogo, listas, pedidos, comunidade e perfil.

## Passos antes de ativar a API

1. Conferir framework, endpoints, payloads, autenticação e exemplos de JSON do Backend-Aidan.
2. Corrigir contratos em `contracts.ts`, caminhos em `routes.ts` e tratamento de respostas paginadas.
3. Definir backend `dev`, `staging`, `production`, CORS para Web e HTTPS para produção.
4. Implementar autenticação real, expiração/refresh/logout de token, autorização e recuperação de senha.
5. Instalar a versão de `expo-secure-store` compatível com SDK 54 para armazenamento de tokens no Android.
6. Conectar formulários, lista, carrinho, mapa, comunidade e pedidos aos services com loading/erro/empty state.
7. Trocar imagens, emails e dados demo do usuário Dara por dados da sessão autenticada.
8. Realizar testes integrados e e2e antes de usar dados reais.

## Endpoint map — somente proposta

| Fluxo no app | Service | Endpoint sugerido (não confirmado) |
| --- | --- | --- |
| Login | `authApi.login` | `POST /auth/login` |
| Cadastro | `authApi.register` | `POST /auth/register` |
| Código | `authApi.verifyCode` | `POST /auth/verify-code` |
| Perfil | `profileApi.get` | `GET /users/me` |
| Produtos | `catalogApi.search` | `GET /products?q=...` |
| Listas | `shoppingListsApi` | `/shopping-lists` |
| Pedidos | `ordersApi.list` | `GET /orders` |
| Comunidade | `communityApi.search` | `GET /reviews?q=...` |
| Endereços | `profileApi.addresses` | `GET /addresses` |

**Google Login:** escolher uma conta mockada não é OAuth real. O botão da demo NÃO deve continuar assim em produção. Implementar Google OAuth/OIDC com validação no backend e sem colocar client secret no aplicativo.

## Modo mock x API

Arquivo `.env` (a partir de `.env.example`):

```
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_URL=
```

Quando backend e contratos estiverem confirmados:

```
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_URL=https://api.seudominio.com
```

**Importante:** mudar as variáveis não conecta automaticamente as telas. As telas do showcase ainda chamam dados mocks e navegação locais; a ligação com os services é a próxima etapa.

No Android físico, `localhost` aponta para o celular, não para o computador. Para teste local, use IP de rede acessível (com firewall/liberação adequada) ou túnel HTTPS confiável. `EXPO_PUBLIC_*` fica legível no APK; nunca use para segredos.

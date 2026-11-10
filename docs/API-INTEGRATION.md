# Backend-Aidan integration (verified 2026-11-09)

Backend source: https://github.com/suporteaidan/Backend-Aidan (`main`). FastAPI, Python 3.12+, PostgreSQL, async SQLAlchemy, Alembic, Poetry.

## Implemented endpoints

| Method | Route | Auth | Request | Response |
| --- | --- | --- | --- | --- |
| GET | `/health` | No | — | `{ "status": "ok" }` |
| POST | `/api/v1/users` | No | JSON `{name, cpf, email, password, address?, phone?}` | `201 UserRead` |
| POST | `/api/v1/auth/login` | No | `application/x-www-form-urlencoded`: `username=<email>&password=<password>` | `{access_token, token_type}` |
| POST | `/api/v1/nfes/import` | JWT Bearer | JSON `{qr_code_url}` | `201 {id,nfe_key,nfe_date,market_id,user_id}` |

The API only has the listed routes in its versioned router. The API backend must be deployed and reachable; the presence of code in GitHub is not proof of a deployed server.

## Frontend implementation

- `src/api/client.ts`: timeout, JSON/Form content types, Bearer token, useful API errors, clears invalid native session on 401.
- `src/api/services/auth.ts`: verified OAuth2 form and JSON signup.
- `src/auth/tokenStore.ts`: Expo SecureStore on native platforms; no web persistent storage; JWT expiry checks.
- `src/auth/AuthProvider.tsx`: state management, sign-in, signup and signout.
- `src/auth/AuthGate.tsx`: client navigation guard only; **not an authorization boundary**.
- `app/login.tsx`, `app/register.tsx`: real auth when `EXPO_PUBLIC_USE_MOCKS=false`; demo flow otherwise.
- `app/import-receipt.tsx`: paste NFC-e QR URL and send authenticated request. Camera scanning not yet implemented.

## Planned backend work

1. `GET /api/v1/users/me` and `PATCH /api/v1/users/me` to fetch and update server-side profile.
2. Email verification, password reset and account-recovery flow; no fictional 5-digit API.
3. Google OIDC verification on server, with secure native provider sign-in.
4. Refresh/revoke access tokens, rotation, and session security policies.
5. Shopping lists and items; catalog, markets and price comparisons.
6. Order and delivery workflows, histories and user reviews.
7. Maps/geolocation and permissions/consent; NFC-e items read endpoint.
8. Tests for HTTP contracts, 401/403/422, rate limits, CPF uniqueness and OAuth logic.

## Environment

On Android physically connected over Wi-Fi, API URL must be accessible from the phone. `localhost` points to the phone, not your Ubuntu laptop. Example:

```dotenv
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_URL=http://192.168.1.20:8000
```

Use your actual private network IP in development. In deployment use HTTPS and keep backend database, JWT signing secrets, OAuth client secrets and service keys **server-side only**. EAS build-time public env vars must be configured for each build profile.

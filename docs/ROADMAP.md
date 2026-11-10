# Aidan roadmap

## Completed in v14 Auth Foundation (2026-11-09)
- Expo SDK 54 versions aligned with project `aidan`.
- Existing splash, login, shopping, menu and welcome animations retained.
- Real email/password login and registration service connections.
- CPF validation, native encrypted token storage, restore/signout, client guard.
- NFC-e QR URL import using the existing backend endpoint.
- Android EAS identity preserved.

## Next: Backend and client integration
- Start FastAPI/PostgreSQL and validate HTTP responses from Android and Web.
- Add GET/PATCH user profile and persist profile form values.
- Add email verification and password recovery (backend + UI).
- Add OAuth/OIDC Google login with backend validation.
- Build product/catalog, shopping list, pricing and order endpoints and wire screens.
- Implement camera QR scanner and NFC-e purchase-item querying.
- Add test coverage, privacy/consent, runtime monitoring and production security.

## Release flow
- Work on `dev`; verify on Android devices; merge to `main` by PR.
- Build a fresh EAS APK when native modules change.

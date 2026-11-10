# Aidan — Mobile Application

Aidan is the official Android-first mobile client for the Aidan platform, developed with **React Native, Expo SDK 54, Expo Router 6, TypeScript, and EAS Build**. The UI originates from the `aidan-showcase` prototype and retains its animated splash screen, cart illustration, sliding menu, shopping and community layouts.

## Current integration status

**Implemented in this release:**

- Real email/password sign-in using `POST /api/v1/auth/login` (OAuth2 URL-encoded form).
- Real registration using `POST /api/v1/users` (name, CPF, email, password, optional phone).
- Client-side validation, loading states and visible API errors.
- JWT Bearer authorization in a centralized HTTP client, request timeouts and 401 session clearing.
- Session storage using **Expo SecureStore on Android/iOS**; the Web demo stores the session **in memory only**.
- Basic route redirects for guests, logout and session restoration on relaunch.
- NFC-e import by pasting a public QR URL via `POST /api/v1/nfes/import`.
- Distinct **mock mode** for the original presentation screens.

**Not available in Backend-Aidan yet:** Google OAuth/OIDC, email/code verification, password recovery, `/users/me`, refresh tokens, user profile edits, catalog/search API, shopping lists, orders, deliveries, community reviews, camera QR capture and real interactive maps. Those screens remain showcase-oriented; they are **not** production features yet. Backend authorization is required for all private API calls regardless of frontend navigation guards.

### Technology

- Node.js 22 LTS (`.nvmrc`)
- Expo `~54.0.37`, Expo Constants `~18.0.14`
- React 19.1.0 / React Native 0.81.5
- Expo Router ~6.0.24
- Expo SecureStore ~15.0.7 (native storage, **new binary required**)
- Python / FastAPI backend in [Backend-Aidan](https://github.com/suporteaidan/Backend-Aidan)

## Install

```bash
cd aidan
nvm use 22
npm install                 # important on first upgrade; updates package-lock.json
cp .env.example .env
npm run typecheck
npm run doctor
npm run web
```

Once the lockfile includes Expo SecureStore, the team can use `npm ci` for reproducible installs. **Commit the updated `package-lock.json`** along with `package.json`.

### Configure the backend

In `.env`, enable real API mode:

```dotenv
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_URL=http://192.168.1.20:8000
EXPO_PUBLIC_API_TIMEOUT_MS=12000
```

Replace the example LAN IP with the machine actually running FastAPI and ensure the phone can reach it. For Web on the same computer, use `http://localhost:8000` and allow the Expo Web origin in the backend CORS configuration. For production, **use HTTPS**, secure server-side authorization and a hosted API.

To check the API independently:

```bash
AIDAN_API_URL=http://localhost:8000 npm run api:health
```

`EXPO_PUBLIC_*` values are **publicly embedded in the app bundle**; never put secrets there.

### Login and registration in real mode

1. Enter the app, open Sign Up and enter a real name, CPF, email and password.
2. The frontend submits JSON to `POST /api/v1/users`.
3. Successful registration redirects to Login. There is **no fake email verification**.
4. Login submits `application/x-www-form-urlencoded` with `username=<email>&password=<password>` to `POST /api/v1/auth/login`.
5. The returned JWT is stored securely on native devices. The app restores valid sessions and clears expired/401 sessions.
6. Logout erases local credentials. The backend does not yet provide refresh or token revocation.

The demo Google account is intentionally **disabled in real mode** until server-side OIDC token validation is implemented.

### Demo mode

Keep `EXPO_PUBLIC_USE_MOCKS=true` to view the original Aidan flows offline. In mock mode, login and registration continue with the showcase flow, including Dara's demo account and the 5-digit example verification screen. These flows never call the real API.

## Android APK / EAS

This repository uses the independent Expo project **`@lucas0000miranda/aidan`** and Android package **`com.suporteaidan.aidan`**. The EAS project ID is configured in `app.json` as created during the setup. Do **not** relink the project to `aidan-showcase`.

```bash
eas whoami
eas project:info
npm run doctor
eas build -p android --profile preview --clear-cache
```

Adding Expo SecureStore changes native dependencies, so a **new Android APK is required**. An EAS build that started before these changes does not include them. Preview creates an installable APK; production uses the production EAS profile.

## Scripts

| Command | Description |
| --- | --- |
| `npm run web` | Start Expo Web |
| `npm start` | Start Expo / QR code for Android |
| `npm run typecheck` | TypeScript validation |
| `npm run doctor` | Expo dependency diagnostics |
| `npm run lint` | Expo lint |
| `npm run api:health` | Test a running backend's `/health` |
| `npm run build:apk` | EAS preview APK |
| `npm run build:prod` | EAS production build |

## Structure

```text
app/                  Expo Router screens and navigation
  index.tsx           Animated splash and session-based redirect
  login.tsx           Real/mock login
  register.tsx        Real/mock registration with CPF validation
  forgot-password.tsx Honest placeholder (backend endpoint required)
  import-receipt.tsx  Authenticated NFC-e URL import
  home.tsx            Main screen
  menu.tsx            Animated drawer and logout
src/
  api/                Typed contracts, routes, HTTP client, services
  auth/               AuthProvider, guard, native encrypted token session
  components/         Shared UI widgets
  config/             Environment configuration
  data/               Presentation mocks
assets/               App images and icons
scripts/              Backend health check
docs/                 Integration and development notes
.github/workflows/    Automated validation for main and dev
```

## Known limitations and next milestones

- No `/users/me` endpoint yet: after logging in, the app can display the email used to sign in but cannot fetch the full server profile. Profile editing remains a visual prototype.
- No password reset, code verification or Google sign-in on the server.
- No refresh token support: expired access tokens require a fresh login.
- NFC-e import returns receipt metadata, not the list of purchased products. A new backend read endpoint is needed.
- Most shopping, ordering, community and location screens remain local demonstrations.
- Native SecureStore persists sessions but **does not replace server-side authentication, authorization or token revocation**.
- Before production, implement API tests, HTTPS, request validation, consent flows for CPF and location, a published privacy policy, and real Google OAuth/OIDC.

See [API-INTEGRATION.md](docs/API-INTEGRATION.md), [UPGRADE-V14.md](docs/UPGRADE-V14.md) and [ROADMAP.md](docs/ROADMAP.md).

## Git workflow

`main` is the release branch and `dev` is the integration branch. Create `dev` from an updated `main`, make feature commits on `dev` and merge via pull request after validation. Do not force-push shared branches.

Do not commit `.env`, private keys, credentials, `node_modules`, Gradle outputs or APKs. `.gitignore` already covers these. `package-lock.json` must be committed after dependency installation.

## License

The inherited `LICENSE` is MIT. Before commercial release, confirm that this is the intended licensing model and that any personal image assets are authorized for distribution.

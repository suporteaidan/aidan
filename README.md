# Aidan — Mobile Application

Aidan is an Android application (with Expo Web support for development) built with **React Native + Expo + TypeScript + Expo Router**. This is the official development foundation, migrated from the `aidan-showcase` demo repository.

## Current Status

**Foundation ready; API not yet integrated.** The screens, animations, and visual flows have been preserved and still use mock data. This release adds environment configuration, an HTTP client, and preliminary integration modules; real authentication, backend integration, data persistence, and Google OAuth are yet to be developed.

- Screens: animated splash screen, login, demo Google account selection, sign-up, verification, location, welcome, home, menu, profile, settings, shopping list, price comparison, orders, community, and simulated maps.
- Animations: initial Aidan logo, shopping cart on the welcome screen, and smooth side menu.
- Demo interactions: editable forms, checkboxes, filters, and navigation.
- Technical foundation: `src/api` with `fetch`, timeout handling, error handling, and **provisional** interfaces.

**Note:** The Google button in the current version is only a simulation, not actual Google authentication. Dara's account is demo data and should not remain in the final product.

## Requirements

- Node.js 22 LTS (`.nvmrc` file).
- npm.
- Git and a GitHub account for publishing the code.
- An Expo account to generate Android builds (EAS).
- A physical Android device, an emulator, or a browser for development.

## Quick Start

```bash
cd aidan
nvm use             # if you use nvm; alternatively, use an installed Node.js 22 version
npm ci              # reproducible installation using package-lock.json
cp .env.example .env
npm run web         # or: npx expo start --clear --web
```

Test on Android:

```bash
npm start
```

Scan the QR code using an Expo Go version compatible with SDK 54, or use a development build. On a physical device, the server, port, and API must be reachable over the device's network.

### Environment Variables

```dotenv
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_API_TIMEOUT_MS=12000
EXPO_PUBLIC_API_HEALTH_PATH=/health
```

In mock mode, the UI continues to work with local data. Once the backend is ready, we will need to **adjust the routes and connect each screen to the services** — setting the URL alone does not complete the integration.

`EXPO_PUBLIC_*` variables are **public and bundled into the compiled app**. Do not store client secrets, passwords, or private keys in them.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Installs dependencies from the lockfile |
| `npm start` | Starts Expo |
| `npm run web` | Runs the app in a browser |
| `npm run android` | Starts the Android development flow |
| `npm run typecheck` | Checks TypeScript types |
| `npm run doctor` | Runs Expo diagnostics |
| `npm run lint` | Runs Expo ESLint checks |
| `npm run build:apk` | Generates a preview APK using EAS |
| `npm run build:prod` | Generates a production build using EAS |

## APK and EAS

This is a **new application**: the old showcase `projectId` was removed to prevent builds from being mixed up. The current app identity is defined in `app.json` (`slug: aidan`, `android.package: com.suporteaidan.aidan`). Confirm this identifier before publishing to the Play Store; changing the `package` after distribution prevents the Play Store from updating the same app.

```bash
npm install --global eas-cli
eas login
eas init                 # create/link the NEW Aidan project in Expo
eas build -p android --profile preview
```

`eas.json` configures the `preview` profile to generate an installable **APK** and the `production` profile for the standard distribution flow. Actual builds require Expo account credentials and configuration.

## Project Structure

```text
app/                     # Expo Router routes and screens
assets/                  # logos, photos, and illustrations
src/
  api/
    client.ts            # centralized HTTP client
    errors.ts            # ApiError
    contracts.ts         # provisional types, to be confirmed with the backend
    routes.ts            # provisional URLs/paths, to be confirmed
    services/            # auth, catalog, lists, orders, profile, and community
  auth/tokenStore.ts     # in-memory-only token storage (temporary)
  config/env.ts          # public API/mock configuration
  components/            # reusable components
  data/                  # current mocks
  theme/                 # theme
  hooks/                 # current hooks
docs/
  API-INTEGRATION.md     # integration guide and proposed endpoint map
  GITHUB-SSH.md          # GitHub publishing via SSH
  ROADMAP.md             # phases and next steps
.github/workflows/      # CI: npm ci + typecheck + Expo check
.env.example             # example file, without secrets
.gitignore
.nvmrc
package-lock.json        # should be version-controlled
```

## API / Backend-Aidan

Provided repository: https://github.com/suporteaidan/Backend-Aidan

The structure and endpoints of this backend **still need to be inspected**. Therefore, the contracts in `src/api/contracts.ts` and `src/api/routes.ts` are only a proposal. Do not assume `/auth/login` or any other route exists before verifying the server.

When implementing the API, we will map registration, login/refresh/logout, profiles and addresses, the catalog, shopping lists, market/price comparisons, orders, deliveries, ratings/community, and location. Authentication must use secure mechanisms for tokens, session expiration, and server-side authorization.

See [`docs/API-INTEGRATION.md`](docs/API-INTEGRATION.md).

## GitHub and SSH

See [`docs/GITHUB-SSH.md`](docs/GITHUB-SSH.md) for instructions on creating an Ed25519 key on your machine, registering the public key with GitHub, and making the first push.

**Do not commit** `node_modules`, the inherited `.git` directory from the showcase, private keys, `.env`, APK files, or compiled artifacts to the repository.

## License and Privacy

The original ZIP already included an MIT `LICENSE` file; it has been preserved **without changes**. Before making the repository public or commercial, decide whether this license fits the product's business model. Do not expose real personal data, API credentials, or personal images without authorization.

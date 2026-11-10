# Upgrade to Aidan v14 Auth Foundation

This update is based on the Aidan v14 mobile source plus the GitHub `main` package versions verified on November 9, 2026. The EAS project ID is the one created for `@lucas0000miranda/aidan` during the current setup.

## Important: existing Android build

If EAS is currently showing `Run gradlew`, let that build finish. The build already uses a snapshot of the code uploaded to EAS. A new build will be needed for the SecureStore native module.

## Safe application to your existing Git repository

1. Save or commit any local changes first. Do not replace `.git` or `.env`.
2. Switch to `dev` after creating it from an updated `main`.
3. From the **parent** directory, extract the patch archive, which has an `aidan/` prefix.
4. Run `npm install` once to update `package-lock.json` for `expo-secure-store`.
5. Run `npm run typecheck`, `npm run lint`, `npx expo-doctor` and `npm run web`.
6. Commit code, `package.json`, and the updated `package-lock.json` on `dev`.

Example:

```bash
cd ~/Projects/aidan
git status
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c dev              # only if dev does not exist yet
cd ~/Projects
unzip -o ~/Downloads/aidan-v14-auth-patch.zip -d ~/Projects
cd ~/Projects/aidan
npm install
npm run typecheck
npm run lint
npx expo-doctor
git status
git add .
git commit -m "feat: connect login registration and secure native sessions"
git push -u origin dev
```

For a second installation, use `git switch dev` instead of `git switch -c dev`. The patch archive does not include `.git`, `node_modules`, `.env`, or `package-lock.json`, so current local history and the aligned lockfile remain available until npm updates it.

## Web / Android testing

`EXPO_PUBLIC_USE_MOCKS=true` keeps the showcase demo. For real API calls set it to `false` and configure `EXPO_PUBLIC_API_URL` in local `.env`.

On Android, use an API hostname reachable from the phone, ideally HTTPS. A local HTTP backend can be blocked by Android cleartext policies, and a production build must not rely on the developer machine's LAN address.

Environment variables are embedded at build time. Your local ignored `.env` will **not necessarily be available to EAS remote builds**. Configure non-secret `EXPO_PUBLIC_USE_MOCKS` and `EXPO_PUBLIC_API_URL` for the EAS preview environment or specify them in the build profile before generating a real-API APK. For example, inside the `preview` profile in `eas.json`, add:

```json
"env": {
  "EXPO_PUBLIC_USE_MOCKS": "false",
  "EXPO_PUBLIC_API_URL": "https://your-real-api.example"
}
```

Replace the example with a real deployed URL and use HTTPS. Do not put secrets in `EXPO_PUBLIC_*`.

## API prerequisites

`Backend-Aidan` currently defines login, registration and NFC-e import. Run FastAPI and PostgreSQL, run Alembic migrations and expose the API to your device. The backend defaults to a local database URL; this mobile ZIP does not start the backend automatically.

On the backend host, development may use:

```bash
poetry install
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Keep this restricted to trusted networks; do not expose development JWT secrets or a dev database to the internet.

## New binary

```bash
eas project:info
eas build -p android --profile preview --clear-cache
```

The previous APK does not have the new native secure-storage module.

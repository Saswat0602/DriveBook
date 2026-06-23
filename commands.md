# MotoLedger Commands Cheat Sheet

## Development
- **Start server:** `npx expo start`
- **Start with clear cache:** `npx expo start -c` *(Use if Metro acts weird or after package updates)*
- **Preview Production Build:** `npx expo start --no-dev --minify`

## Android Run
- **Emulator / Connected Device:** `npx expo run:android` *(Requires emulator running or USB Debugging enabled)*

## Package Management
- **Install Expo package:** `npx expo install <package-name>` *(Always use this instead of npm install for Expo packages)*
- **Clean reinstall:** `rm -rf node_modules package-lock.json && npm install`

## Code Quality
- **Lint:** `npm run lint` *(Fix: `npm run lint --fix`)*
- **Type Check:** `npx tsc --noEmit` *(Must pass before commits)*
- **Format Code:** `npx prettier . --write`

## Expo Application Services (EAS) Setup
- **Install CLI:** `npm install -g eas-cli`
- **Login:** `eas login`
- **Configure:** `eas build:configure` *(Creates `eas.json`)*

## Builds
- **Android Preview Build:** `eas build --platform android --profile preview`
- **Android Play Store Build (AAB):** `eas build --platform android --profile production` *(Output: `app-release.aab`)*
- **Local APK Build:** `eas build --platform android --local` *(Requires Android SDK)*

## App Configuration
- **App Icon:** `assets/icon.png` *(1024x1024)*
- **Splash Screen:** `assets/splash.png` *(1242x2436)*
- **Version Updates (`app.json`):**
  - Android Version Code: `expo.android.versionCode` *(Increase every release)*
  - App Version: `expo.version` *(e.g., `1.0.0`)*

## Play Store Submission
1. Build AAB: `eas build --platform android --profile production`
2. Open [Google Play Console](https://play.google.com/console)
3. Create App: `MotoLedger`
4. Upload `app-release.aab`
5. Complete: Description, Screenshots, Privacy Policy, App Icon, Feature Graphic
6. Submit for review.

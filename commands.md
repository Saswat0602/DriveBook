
# Start Development Server

```bash
npx expo start
```

---

# Start Expo With Clear Cache

```bash
npx expo start -c
```

Use this whenever:

* Metro acts weird
* Hot reload breaks
* Package updates cause issues

---

# Run On Android Emulator

Start emulator first.

Then:

```bash
npx expo run:android
```

---

# Run On Connected Android Device

Enable:

```text
Developer Options
USB Debugging
```

Check device:

```bash
adb devices
```

Run:

```bash
npx expo run:android
```

---

# Run Expo Go

Start:

```bash
npx expo start
```

Scan QR Code.

---

# Install New Package

Example:

```bash
npx expo install expo-sqlite
```

Always use:

```bash
npx expo install
```

instead of:

```bash
npm install
```

for Expo packages.

---

# Lint

Run:

```bash
npm run lint
```

Fix:

```bash
npm run lint --fix
```

---

# Type Check

Run:

```bash
npx tsc --noEmit
```

Must pass before commits.

---

# Format Code

Run:

```bash
npx prettier . --write
```

---

# Clean Node Modules

Delete:

```bash
rm -rf node_modules
rm package-lock.json
```

Install again:

```bash
npm install
```

---

# Reset Metro Cache

```bash
npx expo start --clear
```

---

# Generate Android Debug Build

```bash
npx expo run:android
```

Creates native android project.

---

# Install EAS

```bash
npm install -g eas-cli
```

Verify:

```bash
eas --version
```

---

# Login To Expo

```bash
eas login
```

---

# Configure EAS

Run:

```bash
eas build:configure
```

Creates:

```text
eas.json
```

---

# Build Android APK

Preview Build:

```bash
eas build \
--platform android \
--profile preview
```

---

# Build Android AAB

Play Store Build:

```bash
eas build \
--platform android \
--profile production
```

Output:

```text
app-release.aab
```

Upload this to Play Store.

---

# Example eas.json

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

# Generate Local APK

Requires Android SDK.

```bash
eas build \
--platform android \
--local
```

---

# Preview Production Build

```bash
npx expo start --no-dev --minify
```

---

# Create App Icon

Location:

```text
assets/icon.png
```

Size:

```text
1024x1024
```

---

# Create Splash Screen

Location:

```text
assets/splash.png
```

Recommended:

```text
1242x2436
```

---

# Android Version Update

Update:

```json
{
  "expo": {
    "android": {
      "versionCode": 1
    }
  }
}
```

Increase every release.

---

# App Version Update

Update:

```json
{
  "expo": {
    "version": "1.0.0"
  }
}
```

Examples:

```text
1.0.0
1.0.1
1.1.0
2.0.0
```

---

# Build Checklist

Before every build:

```text
✓ TypeScript passes

✓ ESLint passes

✓ No console.logs

✓ No crashes

✓ Dark mode works

✓ Notifications work

✓ Backup works

✓ Restore works

✓ Offline works

✓ App icon configured

✓ Splash screen configured

✓ Version updated

✓ VersionCode updated
```

---

# Production Build Command

Final Play Store Build:

```bash
eas build --platform android --profile production
```

---

# Submit To Play Store

Open:

https://play.google.com/console

Create:

```text
MotoLedger
```

Upload:

```text
app-release.aab
```

Complete:

* App Description
* Screenshots
* Privacy Policy
* App Icon
* Feature Graphic

Submit for review.

---

# Daily Development Commands

Start Project

```bash
npx expo start
```

Clear Cache

```bash
npx expo start -c
```

Lint

```bash
npm run lint
```

Type Check

```bash
npx tsc --noEmit
```

Android Run

```bash
npx expo run:android
```

Production Build

```bash
eas build --platform android --profile production
```

These are the only commands needed for 95% of development work.

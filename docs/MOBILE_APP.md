# Mobile App (React Native) — #381

This document outlines the architecture and implementation plan for a native iOS and Android app using React Native.

## Overview

The mobile app is a separate project and should live in its own repository (`stellar-tipjar-mobile`). It shares business logic and API contracts with this web app but has its own navigation, styling, and native module setup.

## Repository Structure

```
stellar-tipjar-mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── CreatorProfileScreen.tsx
│   │   └── TipScreen.tsx
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   ├── components/
│   ├── hooks/
│   ├── services/
│   │   └── api.ts          # Shared API contract with web app
│   └── utils/
├── ios/
├── android/
├── app.json
└── package.json
```

## Setup

```bash
npx @react-native-community/cli init StellarTipJar --template react-native-template-typescript
cd StellarTipJar
```

Core dependencies:

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @notifee/react-native          # Push notifications
npm install react-native-biometrics        # Biometric auth
npm install react-native-keychain          # Secure storage
npm install @react-native-async-storage/async-storage
```

## Navigation

```tsx
// src/navigation/RootNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens/HomeScreen";
import { ExploreScreen } from "@/screens/ExploreScreen";
import { CreatorProfileScreen } from "@/screens/CreatorProfileScreen";
import { TipScreen } from "@/screens/TipScreen";

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  CreatorProfile: { username: string };
  Tip: { username: string; defaultAsset?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen
          name="CreatorProfile"
          component={CreatorProfileScreen}
          options={({ route }) => ({ title: `@${route.params.username}` })}
        />
        <Stack.Screen name="Tip" component={TipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Deep Link Handling

Configure deep links to match the web app's URL scheme:

```tsx
// src/navigation/RootNavigator.tsx
const linking = {
  prefixes: ["stellartipjar://", "https://stellartipjar.app"],
  config: {
    screens: {
      CreatorProfile: "creator/:username",
      Tip: "tip/:username",
      Explore: "explore",
    },
  },
};

// Pass to NavigationContainer:
<NavigationContainer linking={linking}>
```

## Push Notifications

```tsx
// src/services/notifications.ts
import notifee, { AndroidImportance } from "@notifee/react-native";

export async function requestPermission() {
  await notifee.requestPermission();
}

export async function showTipNotification(sender: string, amount: string) {
  const channelId = await notifee.createChannel({
    id: "tips",
    name: "Tip Notifications",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: "New Tip Received! ⭐",
    body: `${sender} sent you ${amount} XLM`,
    android: { channelId, pressAction: { id: "default" } },
  });
}
```

For remote push notifications, integrate with FCM (Android) and APNs (iOS) via your backend.

## Biometric Authentication

```tsx
// src/services/biometrics.ts
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

export async function authenticateWithBiometrics(): Promise<boolean> {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();
  if (!available) return false;

  const { success } = await rnBiometrics.simplePrompt({
    promptMessage: `Confirm with ${biometryType}`,
    cancelButtonText: "Use PIN",
  });

  return success;
}
```

Require biometric confirmation before submitting a tip:

```tsx
const confirmed = await authenticateWithBiometrics();
if (!confirmed) return;
await submitTip(payload);
```

## Shared API Layer

The `src/services/api.ts` in this mobile repo should mirror the contracts from the web app's `src/services/api.ts`. Extract shared types into a separate `@stellar-tipjar/api-types` package if both repos grow in parallel.

```ts
// src/services/api.ts
const API_BASE = process.env.API_URL ?? "https://api.stellartipjar.app";

export async function getCreatorProfile(username: string) {
  const res = await fetch(`${API_BASE}/creators/${username}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function createTipIntent(payload: {
  username: string;
  amount: string;
  assetCode: string;
}) {
  const res = await fetch(`${API_BASE}/tips/intents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}
```

## App Store Releases

### iOS

1. Open `ios/StellarTipJar.xcworkspace` in Xcode
2. Set bundle ID: `com.stellartipjar.app`
3. Configure signing with your Apple Developer account
4. Archive → Distribute App → App Store Connect
5. Submit for review via App Store Connect

### Android

```bash
# Generate release keystore (one-time)
keytool -genkey -v -keystore stellar-tipjar.keystore \
  -alias stellar-tipjar -keyalg RSA -keysize 2048 -validity 10000

# Build release APK / AAB
cd android
./gradlew bundleRelease
```

Upload the `.aab` to Google Play Console.

### `app.json`

```json
{
  "name": "StellarTipJar",
  "displayName": "Stellar Tip Jar",
  "version": "1.0.0",
  "ios": {
    "bundleIdentifier": "com.stellartipjar.app",
    "buildNumber": "1"
  },
  "android": {
    "package": "com.stellartipjar.app",
    "versionCode": 1
  }
}
```

## Security Checklist

- Store wallet keys in `react-native-keychain` (Keychain on iOS, Keystore on Android) — never in AsyncStorage
- Require biometric confirmation for tip submission
- Certificate pinning for API requests in production
- Obfuscate release builds (ProGuard on Android, Bitcode on iOS)
- Follow [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)

## Related

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [React Navigation docs](https://reactnavigation.org)
- [Notifee docs](https://notifee.app)
- Deep linking config in this web repo: `src/lib/deeplink/handler.ts`
- PWA alternative: see `docs/PWA.md` — the existing PWA provides installable mobile-like behavior without a separate native app
